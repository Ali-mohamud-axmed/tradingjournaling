// State manager for TradeMaster
import { getStoreData, populateMockDataIfEmpty } from './db.js';

export const AppState = {
  user: null, // Holds user profile when authenticated
  activeView: 'dashboard', // Current view / route
  tradingTrades: [], // Live trading logs cached
  backtestTrades: [], // Backtesting logs cached
  strategies: [], // Custom strategies
  checklists: [], // Custom checklists
  activeDashboardTab: 'live', // 'live' or 'backtest' in dashboard view
  selectedAccount: 'All', // Default portfolio account filter for reports/dashboard
  listeners: [], // UI listeners for updates
  language: 'en', // 'en' or 'so'

  // Initialize and load databases
  async init() {
    // 1. Load language
    this.language = localStorage.getItem('trademaster-lang') || 'en';

    // 2. Initialise theme
    const savedTheme = localStorage.getItem('trademaster-theme') || 'dark';
    document.body.className = savedTheme === 'light' ? 'light-theme' : '';

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

    // Do not block refresh/F5 on first-run maintenance or legacy checklist migration.
    populateMockDataIfEmpty()
      .then(() => this.refreshCache())
      .catch(error => console.error('Background database maintenance failed:', error));
  },

  // Refresh cached lists from DB
  async refreshCache() {
    try {
      const [allLive, allBack, allStrats, allChecks] = await Promise.all([
        getStoreData('TradingJournal'),
        getStoreData('BacktestingJournal'),
        getStoreData('Strategies'),
        getStoreData('Checklists')
      ]);

      const normalizeEntries = (entries = []) => entries;

      if (this.user) {
        if (this.user.role === 'admin') {
          this.tradingTrades = normalizeEntries(allLive);
          this.backtestTrades = normalizeEntries(allBack);
          this.strategies = allStrats;
          this.checklists = allChecks;
        } else {
          this.tradingTrades = normalizeEntries(allLive.filter(t => t.userEmail === this.user.email));
          this.backtestTrades = normalizeEntries(allBack.filter(t => t.user_id === this.user.email));
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
    if (typeof window !== 'undefined' && window.history && window.location.pathname !== `/${viewName}`) {
      window.history.pushState({ view: viewName }, '', `/${viewName}`);
    }
    this.notifyListeners();
  },

  setDashboardTab(tabName) {
    this.activeDashboardTab = tabName;
    this.notifyListeners();
  },

  setSelectedAccount(account) {
    this.selectedAccount = account || 'All';
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
        { name: 'Standard Confirmation', items: ['HTF Trend Aligned', 'Liquidity Swept', 'MSS on LTF', 'OB Tapped', 'Risk defined', 'Order Flow', 'KL', 'TS', 'SMT / 2SMT', '5M #'], userEmail: email }
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

export async function applyAccountTradeChange(previousTrade, nextTrade) {
  if (!AppState.user) return;

  const accountField = account => ({
    Challenge: 'challengeSize',
    Funded: 'fundedSize',
    'Your Broker': 'brokerSize'
  }[account]);
  const customAccounts = Array.isArray(AppState.user.portfolioAccounts) ? AppState.user.portfolioAccounts : [];
  const accountOf = trade => trade?.accountType || trade?.account_type || trade?.account || 'Challenge';
  const plOf = trade => {
    const value = Number(trade?.plMoney ?? trade?.pl_money ?? 0);
    if (!Number.isFinite(value)) return 0;
    const result = String(trade?.result || '').toLowerCase();
    if (result === 'loss' || result === 'lost') return -Math.abs(value);
    if (result === 'win' || result === 'won') return Math.abs(value);
    return value;
  };
  const changes = new Map();
  const customChanges = new Map();
  const addChange = (trade, amount) => {
    const account = accountOf(trade);
    const field = accountField(account);
    if (field) changes.set(field, (changes.get(field) || 0) + amount);
    else {
      const custom = customAccounts.find(item => item.name === account);
      if (custom) customChanges.set(custom.id, (customChanges.get(custom.id) || 0) + amount);
    }
  };

  if (previousTrade) addChange(previousTrade, -plOf(previousTrade));
  if (nextTrade) addChange(nextTrade, plOf(nextTrade));
  if (!changes.size && !customChanges.size) return;

  const profileChanges = {};
  const defaultCapital = { challengeSize: 100000, fundedSize: 50000, brokerSize: 10000 };
  changes.forEach((amount, field) => {
    const current = Number(AppState.user[field] ?? defaultCapital[field]);
    profileChanges[field] = Number((current + amount).toFixed(2));
  });
  if (customChanges.size) {
    profileChanges.portfolioAccounts = customAccounts.map(account => customChanges.has(account.id)
      ? { ...account, balance: Number((Number(account.balance || 0) + customChanges.get(account.id)).toFixed(2)) }
      : account);
  }
  await AppState.updateProfile(profileChanges);
}

export function getPortfolioAccounts() {
  const user = AppState.user || {};
  return [
    { name: 'Challenge', field: 'challengeSize', accent: 'var(--accent-color)', note: 'Evaluation account' },
    { name: 'Funded', field: 'fundedSize', accent: 'var(--color-win)', note: 'Funded trading account' },
    { name: 'Your Broker', field: 'brokerSize', accent: 'var(--accent-secondary)', note: 'Personal broker account' },
    ...(Array.isArray(user.portfolioAccounts) ? user.portfolioAccounts.map((account, index) => ({
      ...account,
      field: null,
      accent: account.accent || ['#a78bfa', '#f59e0b', '#ec4899'][index % 3],
      note: account.note || 'Custom trading account'
    })) : [])
  ];
}
