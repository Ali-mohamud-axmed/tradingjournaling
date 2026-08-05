// State manager for TradeMaster
import { getStoreData, populateMockDataIfEmpty, initializeDatabaseMode } from './db.js';

export const AppState = {
  user: null, // Holds user profile when authenticated
  activeView: 'dashboard', // Current view / route
  tradingTrades: [], // Live trading logs cached
  backtestTrades: [], // Backtesting logs cached
  strategies: [], // Custom strategies
  checklists: [], // Custom checklists
  activeDashboardTab: 'live', // 'live' or 'backtest' in dashboard view
  listeners: [], // UI listeners for updates
  language: 'en', // 'en' or 'so'

  // Initialize and load databases
  async init() {
    // 1. Load language
    this.language = localStorage.getItem('trademaster-lang') || 'en';

    // 2. Initialise theme
    const savedTheme = localStorage.getItem('trademaster-theme') || 'dark';
    document.body.className = savedTheme === 'light' ? 'light-theme' : '';

    // 3. Determine whether Supabase is available or use local DB fallback
    try {
      const mode = await initializeDatabaseMode();
      if (mode.mode === 'local') {
        console.warn('Database mode:', mode.mode, 'using local IndexedDB fallback.');
      }
    } catch (e) {
      console.error('Failed to initialize database mode:', e);
    }

    // 4. Pre-populate default DB items
    try {
      await populateMockDataIfEmpty();
    } catch (e) {
      console.error('Failed to populate databases:', e);
    }

    // 4. Load auth session
    const savedUser = localStorage.getItem('trademaster-user') || sessionStorage.getItem('trademaster-user');
    if (savedUser) {
      const sessionUser = JSON.parse(savedUser);
      // Fetch latest profile from DB to verify if suspended or role changed
      try {
        const { getUser } = await import('./db.js');
        const dbUser = await getUser(sessionUser.email);
        if (dbUser && dbUser.status === 'active') {
          this.user = dbUser;
          if (localStorage.getItem('trademaster-user')) {
            localStorage.setItem('trademaster-user', JSON.stringify(this.user));
          } else {
            sessionStorage.setItem('trademaster-user', JSON.stringify(this.user));
          }
        } else {
          // Suspended or deleted, log out
          this.user = null;
          localStorage.removeItem('trademaster-user');
          sessionStorage.removeItem('trademaster-user');
        }
      } catch (err) {
        this.user = sessionUser;
      }
    } else {
      this.user = null;
    }

    await this.refreshCache();
  },

  // Refresh cached lists from DB
  async refreshCache() {
    try {
      const allLive = await getStoreData('TradingJournal');
      const allBack = await getStoreData('BacktestingJournal');
      const allStrats = await getStoreData('Strategies');
      const allChecks = await getStoreData('Checklists');

      if (this.user) {
        if (this.user.role === 'admin') {
          this.tradingTrades = allLive;
          this.backtestTrades = allBack;
          this.strategies = allStrats;
          this.checklists = allChecks;
        } else {
          this.tradingTrades = allLive.filter(t => t.userEmail === this.user.email);
          this.backtestTrades = allBack.filter(t => t.user_id === this.user.email);
          this.strategies = allStrats.filter(s => s.userEmail === this.user.email);
          this.checklists = allChecks.filter(c => c.userEmail === this.user.email);
        }
      } else {
        this.tradingTrades = [];
        this.backtestTrades = [];
        this.strategies = [];
        this.checklists = [];
      }
      this.notifyListeners();
    } catch (err) {
      console.error('Failed to refresh data cache:', err);
    }
  },

  // Navigation controller
  setView(viewName) {
    this.activeView = viewName;
    this.notifyListeners();
  },

  setDashboardTab(tabName) {
    this.activeDashboardTab = tabName;
    this.notifyListeners();
  },

  setLanguage(lang) {
    this.language = lang;
    localStorage.setItem('trademaster-lang', lang);
    this.notifyListeners();
  },

  // Auth operations
  async login(email, password, rememberMe = false) {
    const { getUser } = await import('./db.js');
    const userObj = await getUser(email);
    if (!userObj) {
      throw new Error('invalidCredentials');
    }
    if (userObj.password !== password) {
      throw new Error('invalidCredentials');
    }
    if (userObj.status === 'suspended') {
      throw new Error('suspendedError');
    }
    this.user = userObj;
    if (rememberMe) {
      localStorage.setItem('trademaster-user', JSON.stringify(this.user));
      sessionStorage.removeItem('trademaster-user');
    } else {
      sessionStorage.setItem('trademaster-user', JSON.stringify(this.user));
      localStorage.removeItem('trademaster-user');
    }
    await this.refreshCache();
    this.notifyListeners();
    return this.user;
  },

  async register(username, email, password, fullName = '') {
    const { getUser, registerUser, addStoreData } = await import('./db.js');
    const existing = await getUser(email);
    if (existing) {
      throw new Error('emailExists');
    }

    const newUser = {
      username,
      fullName,
      email,
      password,
      role: 'user',
      status: 'active',
      registeredAt: new Date().toISOString().split('T')[0],
      avatar: username.slice(0, 2).toUpperCase(),
      currency: 'USD',
      riskDefault: 1.0,
      notifications: true
    };

    await registerUser(newUser);

    // Seed default strategies/checklists for new user
    try {
      const defaultStrats = [
        { name: 'SMC Order Block', description: 'Trading refined order blocks on 15m/5m timeframe aligning with HTF order flow.', userEmail: email },
        { name: 'Liquidity Grab & Reversal', description: 'Fading structural high/low grabs at New York/London session opens.', userEmail: email },
        { name: 'Support & Resistance Bounce', description: 'Reversing off major daily/weekly supply & demand zones.', userEmail: email }
      ];
      for (const s of defaultStrats) {
        await addStoreData('Strategies', s);
      }
      const defaultChecks = [
        { name: 'Standard Confirmation', items: ['HTF Trend Aligned', 'Liquidity Swept', 'MSS on LTF', 'OB Tapped', 'Risk defined'], userEmail: email }
      ];
      for (const c of defaultChecks) {
        await addStoreData('Checklists', c);
      }
    } catch (e) {
      console.error('Failed to seed user templates:', e);
    }

    this.user = newUser;
    sessionStorage.setItem('trademaster-user', JSON.stringify(this.user));
    await this.refreshCache();
    this.notifyListeners();
    return this.user;
  },

  logout() {
    this.user = null;
    localStorage.removeItem('trademaster-user');
    sessionStorage.removeItem('trademaster-user');
    this.setView('auth');
    this.notifyListeners();
  },

  async updateProfile(profileData) {
    const { updateUser } = await import('./db.js');
    this.user = { ...this.user, ...profileData };
    await updateUser(this.user);
    if (localStorage.getItem('trademaster-user')) {
      localStorage.setItem('trademaster-user', JSON.stringify(this.user));
    } else {
      sessionStorage.setItem('trademaster-user', JSON.stringify(this.user));
    }
    this.notifyListeners();
  },

  // State change publisher
  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  },

  notifyListeners() {
    this.listeners.forEach(callback => callback(this));
  }
};
