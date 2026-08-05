// Database layer: supports Supabase as primary storage and IndexedDB as fallback.
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
let useSupabase = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY && !SUPABASE_ANON_KEY.includes('your-anon-key='));
export let supabase = useSupabase ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

const DB_NAME = 'TradeMasterDB';
const DB_VERSION = 2;

let dbInstance = null;

// Helper to construct mock SVG charts as base64 images
function createMockChartSVG(isBefore, isWin, pair, direction) {
  const primaryColor = isWin ? '#10b981' : '#ef4444';
  const textTitle = `${pair} - ${direction} ${isBefore ? '(Setup)' : '(Outcome)'}`;
  const gridLines = Array.from({ length: 8 }, (_, i) => `<line x1="0" y1="${i * 25}" x2="300" y2="${i * 25}" stroke="#222b36" stroke-width="1"/>`).join('');
  
  // Create beautiful candle sticks
  const candles = [
    { x: 40, open: 120, close: 100, high: 90, low: 130 },
    { x: 70, open: 100, close: 80, high: 75, low: 110 },
    { x: 100, open: 80, close: 110, high: 70, low: 120 },
    { x: 130, open: 110, close: 95, high: 90, low: 125 },
    { x: 160, open: 95, close: 60, high: 50, low: 105 }, // Entry point around here
    { x: 190, open: 60, close: isBefore ? 65 : (isWin ? 40 : 110), high: isBefore ? 55 : (isWin ? 30 : 120), low: isBefore ? 75 : (isWin ? 50 : 100) },
    { x: 220, open: isBefore ? 65 : (isWin ? 40 : 110), close: isBefore ? 70 : (isWin ? 20 : 130), high: isBefore ? 60 : (isWin ? 10 : 140), low: isBefore ? 80 : (isWin ? 30 : 120) }
  ];

  const candleSVGs = candles.map(c => {
    const isGreen = c.close < c.open;
    const color = isGreen ? '#10b981' : '#ef4444';
    const top = Math.min(c.open, c.close);
    const height = Math.abs(c.open - c.close);
    return `
      <line x1="${c.x}" y1="${c.high}" x2="${c.x}" y2="${c.low}" stroke="${color}" stroke-width="1.5"/>
      <rect x="${c.x - 6}" y="${top}" width="12" height="${height}" fill="${color}" rx="1"/>
    `;
  }).join('');

  // Target areas for trade
  const targetArea = direction === 'Buy' 
    ? `<rect x="154" y="20" width="120" height="40" fill="#10b981" fill-opacity="0.1" stroke="#10b981" stroke-width="1" stroke-dasharray="2"/>
       <rect x="154" y="60" width="120" height="30" fill="#ef4444" fill-opacity="0.1" stroke="#ef4444" stroke-width="1" stroke-dasharray="2"/>`
    : `<rect x="154" y="60" width="120" height="40" fill="#ef4444" fill-opacity="0.1" stroke="#ef4444" stroke-width="1" stroke-dasharray="2"/>
       <rect x="154" y="20" width="120" height="30" fill="#10b981" fill-opacity="0.1" stroke="#10b981" stroke-width="1" stroke-dasharray="2"/>`;

  const entryMarker = `
    <circle cx="160" cy="60" r="4" fill="#3b82f6"/>
    <text x="170" y="55" fill="#3b82f6" font-size="9" font-family="sans-serif" font-weight="bold">ENTRY</text>
  `;

  const resultLine = !isBefore 
    ? `<path d="M 160 60 Q 200 ${isWin ? 20 : 120} 240 ${isWin ? 25 : 125}" fill="none" stroke="${primaryColor}" stroke-width="2" stroke-dasharray="4"/>
       <circle cx="240" cy="${isWin ? 25 : 125}" r="5" fill="${primaryColor}"/>`
    : '';

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200" width="100%" height="100%">
      <rect width="100%" height="100%" fill="#0f131a"/>
      ${gridLines}
      ${targetArea}
      ${candleSVGs}
      ${entryMarker}
      ${resultLine}
      <text x="12" y="24" fill="#94a3b8" font-size="11" font-family="sans-serif" font-weight="bold">${textTitle}</text>
      <text x="245" y="185" fill="#64748b" font-size="9" font-family="sans-serif">TradeMaster</text>
    </svg>
  `;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg.trim());
}

export function initDB() {
  return new Promise((resolve, reject) => {
    if (dbInstance) {
      resolve(dbInstance);
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
      console.error('Database error:', event.target.error);
      reject(event.target.error);
    };

    request.onsuccess = (event) => {
      dbInstance = event.target.result;
      resolve(dbInstance);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      
      if (!db.objectStoreNames.contains('TradingJournal')) {
        db.createObjectStore('TradingJournal', { keyPath: 'id', autoIncrement: true });
      }
      
      if (!db.objectStoreNames.contains('BacktestingJournal')) {
        db.createObjectStore('BacktestingJournal', { keyPath: 'id', autoIncrement: true });
      }
      
      if (!db.objectStoreNames.contains('Strategies')) {
        db.createObjectStore('Strategies', { keyPath: 'id', autoIncrement: true });
      }

      if (!db.objectStoreNames.contains('Checklists')) {
        db.createObjectStore('Checklists', { keyPath: 'id', autoIncrement: true });
      }

      if (!db.objectStoreNames.contains('Users')) {
        db.createObjectStore('Users', { keyPath: 'email' });
      }
    };
  });
}

function ensureSupabase() {
  if (!useSupabase || !supabase) {
    throw new Error('Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
  }
  return supabase;
}

function isSupabaseConfigured() {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY && supabase);
}

async function runLocalFallback(action) {
  try {
    return await action();
  } catch (error) {
    console.warn('Local DB fallback active:', error);
    return action();
  }
}

export async function testSupabaseConnection() {
  const supabaseClient = ensureSupabase();
  const { data, error } = await supabaseClient.from('Users').select('email').limit(1).maybeSingle();
  if (error) {
    throw new Error(error.message || 'Supabase connection test failed.');
  }
  return {
    success: true,
    connected: true,
    sample: data || null
  };
}

export async function initializeDatabaseMode() {
  if (!useSupabase) {
    return { mode: 'local' };
  }
  try {
    await testSupabaseConnection();
    return { mode: 'supabase' };
  } catch (error) {
    console.warn('Supabase unavailable at startup, switching to local DB:', error.message || error);
    useSupabase = false;
    supabase = null;
    return { mode: 'local', error };
  }
}

// Database helper functions
export async function getStoreData(storeName) {
  if (isSupabaseConfigured()) {
    try {
      const supabase = ensureSupabase();
      let query = supabase.from(storeName).select('*');
      if (storeName !== 'Users') {
        query = query.order('id', { ascending: true });
      }
      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.warn('Supabase read failed, disabling Supabase and falling back to local DB:', error.message || error);
      useSupabase = false;
      supabase = null;
    }
  }

  return initDB().then((db) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.getAll();
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  });
}

export async function addStoreData(storeName, data) {
  if (isSupabaseConfigured()) {
    try {
      const supabase = ensureSupabase();
      const payload = Array.isArray(data) ? data : [data];
      const { data: inserted, error } = await supabase.from(storeName).insert(payload).select();
      if (error) throw error;
      return Array.isArray(data) ? inserted : inserted?.[0] || null;
    } catch (error) {
      console.warn('Supabase insert failed, disabling Supabase and falling back to local DB:', error.message || error);
      useSupabase = false;
      supabase = null;
    }
  }

  return initDB().then((db) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.add(data);
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  });
}

export async function updateStoreData(storeName, data) {
  if (isSupabaseConfigured()) {
    try {
      const supabase = ensureSupabase();
      const keyField = storeName === 'Users' ? 'email' : 'id';
      if (data[keyField] === undefined || data[keyField] === null) {
        throw new Error(`Missing primary key field ${keyField} for ${storeName} update.`);
      }
      const { data: updated, error } = await supabase
        .from(storeName)
        .update(data)
        .eq(keyField, data[keyField])
        .select();
      if (error) throw error;
      return Array.isArray(updated) ? updated[0] : updated;
    } catch (error) {
      console.warn('Supabase update failed, disabling Supabase and falling back to local DB:', error.message || error);
      useSupabase = false;
      supabase = null;
    }
  }

  return initDB().then((db) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.put(data);
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  });
}

export async function deleteStoreData(storeName, id) {
  if (isSupabaseConfigured()) {
    try {
      const supabase = ensureSupabase();
      const keyField = storeName === 'Users' ? 'email' : 'id';
      const query = supabase.from(storeName).delete().eq(keyField, id);
      const { error } = await query;
      if (error) throw error;
      return true;
    } catch (error) {
      console.warn('Supabase delete failed, disabling Supabase and falling back to local DB:', error.message || error);
      useSupabase = false;
      supabase = null;
    }
  }

  return initDB().then((db) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const key = isNaN(id) || typeof id === 'string' ? id : Number(id);
      const request = store.delete(key);
      
      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(request.error);
    });
  });
}

// User-specific database helper functions
export function registerUser(user) {
  return addStoreData('Users', user);
}

export async function getUser(email) {
  if (isSupabaseConfigured()) {
    try {
      const supabase = ensureSupabase();
      const { data, error } = await supabase.from('Users').select('*').eq('email', email).maybeSingle();
      if (error) throw error;
      if (data) return data;
    } catch (error) {
      console.warn('Supabase getUser failed, disabling Supabase and falling back to local DB:', error.message || error);
      useSupabase = false;
      supabase = null;
    }
  }

  return initDB().then((db) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction('Users', 'readonly');
      const store = transaction.objectStore('Users');
      const request = store.get(email);
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  });
}

export function getAllUsers() {
  return getStoreData('Users');
}

export function updateUser(user) {
  return updateStoreData('Users', user);
}

// Preset Mock Data populator
export async function populateMockDataIfEmpty() {
  const users = await getStoreData('Users');
  
  // Seed Users and ensure at least one admin exists
  const adminExists = users.some((u) => u.role === 'admin');
  if (users.length === 0 || !adminExists) {
    const presetUsers = [];

    if (!adminExists) {
      presetUsers.push({
        username: 'AdminMaster',
        email: 'admin@trademaster.com',
        password: 'admin123',
        role: 'admin',
        status: 'active',
        registeredAt: new Date().toISOString().split('T')[0],
        avatar: 'AM',
        currency: 'USD',
        riskDefault: 1.0,
        notifications: true
      });
    }

    if (users.length === 0) {
      presetUsers.push(
        {
          username: 'AlexTrader',
          email: 'alex.forex@master.com',
          password: 'password123',
          role: 'user',
          status: 'active',
          registeredAt: new Date().toISOString().split('T')[0],
          avatar: 'AT',
          currency: 'USD',
          riskDefault: 1.0,
          notifications: true
        },
        {
          username: 'HassanFX',
          email: 'hassan.trade@journal.com',
          password: 'hassan123',
          role: 'user',
          status: 'active',
          registeredAt: new Date().toISOString().split('T')[0],
          avatar: 'HF',
          currency: 'USD',
          riskDefault: 1.0,
          notifications: true
        }
      );
    }

    for (const u of presetUsers) {
      const exists = await getUser(u.email);
      if (!exists) {
        await addStoreData('Users', u);
      }
    }
  }

  const liveTrades = await getStoreData('TradingJournal');
  const backtestTrades = await getStoreData('BacktestingJournal');
  const strategies = await getStoreData('Strategies');
  const checklists = await getStoreData('Checklists');

  // Load basic configurations
  if (strategies.length === 0) {
    const presetStrategies = [
      { name: 'SMC Order Block', description: 'Trading refined order blocks on 15m/5m timeframe aligning with HTF order flow.' },
      { name: 'Liquidity Grab & Reversal', description: 'Fading structural high/low grabs at New York/London session opens.' },
      { name: 'Support & Resistance Bounce', description: 'Reversing off major daily/weekly supply & demand zones.' }
    ];
    for (const strat of presetStrategies) {
      strat.userEmail = 'alex.forex@master.com';
      await addStoreData('Strategies', strat);
    }
  }

  if (checklists.length === 0) {
    const presetChecklists = [
      { name: 'Standard Confirmation', items: ['HTF Trend Aligned', 'Liquidity Swept', 'MSS on LTF', 'OB Tapped', 'Risk defined'] },
      { name: 'Conservative Confirmation', items: ['HTF Trend Aligned', 'Liquidity Swept', 'MSS on LTF', 'OB Tapped', 'Risk defined', 'Session open volatility settled', 'RR greater than 1:3'] }
    ];
    for (const list of presetChecklists) {
      list.userEmail = 'alex.forex@master.com';
      await addStoreData('Checklists', list);
    }
  }

  // Populate Live Trades
  if (liveTrades.length === 0) {
    const mockLive = [
      {
        date: '2026-07-01',
        day: 'Wednesday',
        session: 'London',
        pair: 'EURUSD',
        type: 'Buy',
        entryPrice: 1.08500,
        stopLoss: 1.08400,
        takeProfit: 1.08800,
        riskPercent: 1.0,
        rr: 3.0,
        result: 'Win',
        strategy: 'SMC Order Block',
        setup: '15m Bullish OB Tap',
        checklist: ['HTF Trend Aligned', 'OB Tapped', 'Risk defined'],
        emotion: 'Disciplined',
        mistakes: 'None',
        lessonLearned: 'Patience pays off. Waited for the tap.',
        notes: 'Price tapped the 15m OB right at London open and rallied.',
        beforeScreenshot: createMockChartSVG(true, true, 'EURUSD', 'Buy'),
        afterScreenshot: createMockChartSVG(false, true, 'EURUSD', 'Buy')
      },
      {
        date: '2026-07-02',
        day: 'Thursday',
        session: 'New York',
        pair: 'GBPUSD',
        type: 'Sell',
        entryPrice: 1.26800,
        stopLoss: 1.27100,
        takeProfit: 1.25900,
        riskPercent: 1.5,
        rr: 3.0,
        result: 'Loss',
        strategy: 'Liquidity Grab & Reversal',
        setup: 'NY Session High Sweep',
        checklist: ['Liquidity Swept', 'Risk defined'],
        emotion: 'Anxious',
        mistakes: 'FOMO',
        lessonLearned: 'Do not chase if entry is missed. Wait for pullback.',
        notes: 'Felt like I was missing the drop, entered late, stopped out before reversal.',
        beforeScreenshot: createMockChartSVG(true, false, 'GBPUSD', 'Sell'),
        afterScreenshot: createMockChartSVG(false, false, 'GBPUSD', 'Sell')
      },
      {
        date: '2026-07-03',
        day: 'Friday',
        session: 'Asia',
        pair: 'USDJPY',
        type: 'Buy',
        entryPrice: 155.500,
        stopLoss: 155.200,
        takeProfit: 156.100,
        riskPercent: 0.5,
        rr: 2.0,
        result: 'Break Even',
        strategy: 'Support & Resistance Bounce',
        setup: '155.50 Support test',
        checklist: ['HTF Trend Aligned', 'Risk defined'],
        emotion: 'Disciplined',
        mistakes: 'None',
        lessonLearned: 'Moved stop loss to entry correctly as target 1 hit.',
        notes: 'Rallied to +1R then reversed back to entry.',
        beforeScreenshot: createMockChartSVG(true, true, 'USDJPY', 'Buy'),
        afterScreenshot: createMockChartSVG(false, false, 'USDJPY', 'Buy')
      },
      {
        date: '2026-07-06',
        day: 'Monday',
        session: 'London',
        pair: 'XAUUSD',
        type: 'Sell',
        entryPrice: 2320.00,
        stopLoss: 2325.00,
        takeProfit: 2300.00,
        riskPercent: 1.0,
        rr: 4.0,
        result: 'Win',
        strategy: 'SMC Order Block',
        setup: '4H Supply Zone Reject',
        checklist: ['HTF Trend Aligned', 'OB Tapped', 'Risk defined'],
        emotion: 'Disciplined',
        mistakes: 'None',
        lessonLearned: 'Trust higher timeframe structural bias.',
        notes: 'Beautiful clean rejection off 4H supply.',
        beforeScreenshot: createMockChartSVG(true, true, 'XAUUSD', 'Sell'),
        afterScreenshot: createMockChartSVG(false, true, 'XAUUSD', 'Sell')
      },
      {
        date: '2026-07-07',
        day: 'Tuesday',
        session: 'New York',
        pair: 'EURUSD',
        type: 'Sell',
        entryPrice: 1.09200,
        stopLoss: 1.09400,
        takeProfit: 1.08600,
        riskPercent: 1.0,
        rr: 3.0,
        result: 'Win',
        strategy: 'Liquidity Grab & Reversal',
        setup: 'NY Session High Sweep',
        checklist: ['Liquidity Swept', 'MSS on LTF', 'Risk defined'],
        emotion: 'Disciplined',
        mistakes: 'None',
        lessonLearned: 'Sweeping daily highs leads to strong intraday reversals.',
        notes: 'Excellent high grab confirmation.',
        beforeScreenshot: createMockChartSVG(true, true, 'EURUSD', 'Sell'),
        afterScreenshot: createMockChartSVG(false, true, 'EURUSD', 'Sell')
      },
      {
        date: '2026-07-07',
        day: 'Tuesday',
        session: 'London',
        pair: 'GBPUSD',
        type: 'Buy',
        entryPrice: 1.27200,
        stopLoss: 1.27000,
        takeProfit: 1.27800,
        riskPercent: 1.0,
        rr: 3.0,
        result: 'Loss',
        strategy: 'SMC Order Block',
        setup: '1H demand zone block',
        checklist: ['OB Tapped', 'Risk defined'],
        emotion: 'Greedy',
        mistakes: 'Over-leveraged',
        lessonLearned: 'Check major news calendars before entering near London sessions.',
        notes: 'Tapped demand but UK CPI data spiked and stopped me out immediately.',
        beforeScreenshot: createMockChartSVG(true, false, 'GBPUSD', 'Buy'),
        afterScreenshot: createMockChartSVG(false, false, 'GBPUSD', 'Buy')
      }
    ];

    for (const trade of mockLive) {
      trade.userEmail = 'alex.forex@master.com';
      await addStoreData('TradingJournal', trade);
    }
  }

  // Populate Backtesting Trades
  if (backtestTrades.length === 0) {
    const mockBacktesting = [
      {
        user_id: 'alex.forex@master.com',
        date: '2026-06-01',
        session: 'New York',
        pair: 'EURUSD',
        strategy: 'SMC Order Block',
        timeframe: '15m',
        direction: 'Buy',
        entry_price: 1.07800,
        stop_loss: 1.07600,
        take_profit: 1.08400,
        risk_percent: 1.0,
        target_rr: 3.0,
        actual_rr: 3.0,
        result: 'Win',
        lesson_learned: 'Classic bullish structural continuation block.',
        notes: 'Perfect mitigation, quick run to target.',
        before_image: createMockChartSVG(true, true, 'EURUSD', 'Buy'),
        after_image: createMockChartSVG(false, true, 'EURUSD', 'Buy'),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        user_id: 'alex.forex@master.com',
        date: '2026-06-03',
        session: 'London',
        pair: 'GBPUSD',
        strategy: 'SMC Order Block',
        timeframe: '15m',
        direction: 'Buy',
        entry_price: 1.25400,
        stop_loss: 1.25200,
        take_profit: 1.26000,
        risk_percent: 1.0,
        target_rr: 3.0,
        actual_rr: 3.0,
        result: 'Win',
        lesson_learned: 'Dip was fast, order execution filled nicely.',
        notes: 'High probability SMC setup.',
        before_image: createMockChartSVG(true, true, 'GBPUSD', 'Buy'),
        after_image: createMockChartSVG(false, true, 'GBPUSD', 'Buy'),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        user_id: 'alex.forex@master.com',
        date: '2026-06-05',
        session: 'New York',
        pair: 'GBPUSD',
        strategy: 'Liquidity Grab & Reversal',
        timeframe: '1H',
        direction: 'Sell',
        entry_price: 1.26200,
        stop_loss: 1.26400,
        take_profit: 1.25600,
        risk_percent: 1.0,
        target_rr: 3.0,
        actual_rr: -1.0,
        result: 'Loss',
        lesson_learned: 'Sometimes sweeps turn into full structural breaks.',
        notes: 'Structure failed, price continued trading higher into daily resistance.',
        before_image: createMockChartSVG(true, false, 'GBPUSD', 'Sell'),
        after_image: createMockChartSVG(false, false, 'GBPUSD', 'Sell'),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        user_id: 'alex.forex@master.com',
        date: '2026-06-09',
        session: 'London',
        pair: 'EURUSD',
        strategy: 'SMC Order Block',
        timeframe: '15m',
        direction: 'Sell',
        entry_price: 1.08200,
        stop_loss: 1.08350,
        take_profit: 1.07600,
        risk_percent: 1.0,
        target_rr: 4.0,
        actual_rr: 4.0,
        result: 'Win',
        lesson_learned: 'R:R is maximized when using HTF boundaries with LTF triggers.',
        notes: 'Very clean delivery of orders.',
        before_image: createMockChartSVG(true, true, 'EURUSD', 'Sell'),
        after_image: createMockChartSVG(false, true, 'EURUSD', 'Sell'),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        user_id: 'alex.forex@master.com',
        date: '2026-06-12',
        session: 'Asia',
        pair: 'USDJPY',
        strategy: 'Support & Resistance Bounce',
        timeframe: '4H',
        direction: 'Buy',
        entry_price: 154.200,
        stop_loss: 154.000,
        take_profit: 154.800,
        risk_percent: 1.0,
        target_rr: 3.0,
        actual_rr: -1.0,
        result: 'Loss',
        lesson_learned: 'Support holds work best when accompanied by volume divergence.',
        notes: 'Price broke straight through the support level without halting.',
        before_image: createMockChartSVG(true, false, 'USDJPY', 'Buy'),
        after_image: createMockChartSVG(false, false, 'USDJPY', 'Buy'),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        user_id: 'alex.forex@master.com',
        date: '2026-06-15',
        session: 'New York',
        pair: 'XAUUSD',
        strategy: 'Liquidity Grab & Reversal',
        timeframe: '15m',
        direction: 'Sell',
        entry_price: 2350.00,
        stop_loss: 2355.00,
        take_profit: 2335.00,
        risk_percent: 1.0,
        target_rr: 3.0,
        actual_rr: 3.0,
        result: 'Win',
        lesson_learned: 'Gold NYC reversal is one of the most reliable trade setups.',
        notes: 'Classic gold sweep. NY volume expedited the drop.',
        before_image: createMockChartSVG(true, true, 'XAUUSD', 'Sell'),
        after_image: createMockChartSVG(false, true, 'XAUUSD', 'Sell'),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        user_id: 'alex.forex@master.com',
        date: '2026-06-18',
        session: 'London',
        pair: 'EURUSD',
        strategy: 'Support & Resistance Bounce',
        timeframe: '30m',
        direction: 'Buy',
        entry_price: 1.07400,
        stop_loss: 1.07200,
        take_profit: 1.08000,
        risk_percent: 1.0,
        target_rr: 3.0,
        actual_rr: 3.0,
        result: 'Win',
        lesson_learned: 'High reward zone entry.',
        notes: 'Classic double bottom verification.',
        before_image: createMockChartSVG(true, true, 'EURUSD', 'Buy'),
        after_image: createMockChartSVG(false, true, 'EURUSD', 'Buy'),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        user_id: 'alex.forex@master.com',
        date: '2026-06-22',
        session: 'New York',
        pair: 'GBPUSD',
        strategy: 'SMC Order Block',
        timeframe: '15m',
        direction: 'Sell',
        entry_price: 1.25800,
        stop_loss: 1.26000,
        take_profit: 1.25200,
        risk_percent: 1.0,
        target_rr: 3.0,
        actual_rr: 0.0,
        result: 'Break Even',
        lesson_learned: 'Securing BE at 1R is crucial in range-bound market conditions.',
        notes: 'Price reached +1.5R then reversed aggressively.',
        before_image: createMockChartSVG(true, true, 'GBPUSD', 'Sell'),
        after_image: createMockChartSVG(false, false, 'GBPUSD', 'Sell'),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        user_id: 'alex.forex@master.com',
        date: '2026-06-25',
        session: 'London',
        pair: 'EURUSD',
        strategy: 'Liquidity Grab & Reversal',
        timeframe: '5m',
        direction: 'Sell',
        entry_price: 1.08900,
        stop_loss: 1.09100,
        take_profit: 1.08300,
        risk_percent: 1.0,
        target_rr: 3.0,
        actual_rr: -1.0,
        result: 'Loss',
        lesson_learned: 'Asia session grabs are lower probability if London starts trending.',
        notes: 'Stopped out quickly. Trend was too strong.',
        before_image: createMockChartSVG(true, false, 'EURUSD', 'Sell'),
        after_image: createMockChartSVG(false, false, 'EURUSD', 'Sell'),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        user_id: 'alex.forex@master.com',
        date: '2026-06-29',
        session: 'New York',
        pair: 'XAUUSD',
        strategy: 'SMC Order Block',
        timeframe: '1H',
        direction: 'Buy',
        entry_price: 2315.00,
        stop_loss: 2310.00,
        take_profit: 2335.00,
        risk_percent: 1.0,
        target_rr: 4.0,
        actual_rr: 4.0,
        result: 'Win',
        lesson_learned: 'High-conviction setups warrant maximum position sizing (1%).',
        notes: 'Tapped and launched immediately. Incredible trade.',
        before_image: createMockChartSVG(true, true, 'XAUUSD', 'Buy'),
        after_image: createMockChartSVG(false, true, 'XAUUSD', 'Buy'),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];

    for (const trade of mockBacktesting) {
      await addStoreData('BacktestingJournal', trade);
    }
  }
}

export async function clearDatabase() {
  if (isSupabaseConfigured()) {
    try {
      const supabase = ensureSupabase();
      const tables = ['TradingJournal', 'BacktestingJournal', 'Strategies', 'Checklists', 'Users'];
      for (const table of tables) {
        const deleteQuery = supabase.from(table).delete();
        if (table === 'Users') {
          deleteQuery.not('email', 'is', null);
        } else {
          deleteQuery.not('id', 'is', null);
        }
        const { error } = await deleteQuery;
        if (error) {
          throw error;
        }
      }
      return true;
    } catch (error) {
      console.warn('Supabase clearDatabase failed, disabling Supabase and falling back to local DB:', error.message || error);
      useSupabase = false;
      supabase = null;
    }
  }
  return initDB().then((db) => {
    return new Promise((resolve, reject) => {
      const stores = ['TradingJournal', 'BacktestingJournal', 'Strategies', 'Checklists', 'Users'];
      const transaction = db.transaction(stores, 'readwrite');
      stores.forEach((storeName) => {
        if (db.objectStoreNames.contains(storeName)) {
          transaction.objectStore(storeName).clear();
        }
      });
      
      transaction.oncomplete = () => resolve(true);
      transaction.onerror = () => reject(transaction.error);
    });
  });
}
