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

  const standardItems = ['Order Flow', 'KL', 'TS', 'SMT / 2SMT', '5M #'];
  for (const checklist of checklists) {
    if (checklist.name !== 'Standard Confirmation') continue;
    const existingItems = Array.isArray(checklist.items) ? checklist.items : [];
    const missingItems = standardItems.filter(item => !existingItems.includes(item));
    if (missingItems.length) {
      checklist.items = [...existingItems, ...missingItems];
      await updateStoreData('Checklists', checklist);
    }
  }

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
      { name: 'Standard Confirmation', items: ['HTF Trend Aligned', 'Liquidity Swept', 'MSS on LTF', 'OB Tapped', 'Risk defined', 'Order Flow', 'KL', 'TS', 'SMT / 2SMT', '5M #'] },
      { name: 'Conservative Confirmation', items: ['HTF Trend Aligned', 'Liquidity Swept', 'MSS on LTF', 'OB Tapped', 'Risk defined', 'Session open volatility settled', 'RR greater than 1:3'] }
    ];
    for (const list of presetChecklists) {
      list.userEmail = 'alex.forex@master.com';
      await addStoreData('Checklists', list);
    }
  }

  // Helper to generate realistic historical trades spanning 5 years (2022 to 2026)
  function generateMockTrades(userEmail, isBacktest) {
    const accountSizes = {
      'Challenge': 100000,
      'Funded': 50000,
      'Your Broker': 10000
    };
    const sessions = ['Asian', 'London', 'New York', 'NY Close'];
    const pairs = ['EURUSD', 'GBPUSD', 'XAUUSD', 'BTCUSD', 'USDJPY', 'AUDUSD', 'USDCAD'];
    const directions = ['Buy', 'Sell'];
    const results = ['Win', 'Loss', 'Break Even'];
    const strategies = ['SMC Order Block', 'Liquidity Grab & Reversal', 'Support & Resistance Bounce'];
    const timeframes = ['M5', 'M15', 'M30', 'H1', 'H4'];

    const trades = [];
    const years = [2022, 2023, 2024, 2025, 2026];
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    years.forEach(year => {
      // Determine how many months to generate for this year
      const maxMonth = year === currentYear ? currentMonth : 11;
      for (let month = 0; month <= maxMonth; month++) {
        // Generate 2 to 3 trades per month to have enough sample size but keep IndexedDB insertion fast
        const numTrades = Math.floor(Math.random() * 2) + 2; // 2 or 3 trades
        for (let t = 0; t < numTrades; t++) {
          const day = Math.floor(Math.random() * 28) + 1;
          const monthStr = String(month + 1).padStart(2, '0');
          const dayStr = String(day).padStart(2, '0');
          const dateStr = `${year}-${monthStr}-${dayStr}`;

          // Skip if generated date is in the future
          if (new Date(dateStr) > currentDate) continue;

          // Select Account Type with weight
          const rAcc = Math.random();
          let accountType = 'Challenge';
          if (rAcc < 0.45) accountType = 'Challenge';
          else if (rAcc < 0.9) accountType = 'Funded';
          else accountType = 'Your Broker';

          const accountSize = accountSizes[accountType];

          // Select Session with weight
          const rSess = Math.random();
          let session = 'London';
          if (rSess < 0.15) session = 'Asian';
          else if (rSess < 0.55) session = 'London';
          else if (rSess < 0.9) session = 'New York';
          else session = 'NY Close';

          // Select Result with weight
          const rRes = Math.random();
          let result = 'Win';
          if (rRes < 0.58) result = 'Win';
          else if (rRes < 0.93) result = 'Loss';
          else result = 'Break Even';

          const pair = pairs[Math.floor(Math.random() * pairs.length)];
          const direction = directions[Math.floor(Math.random() * directions.length)];
          const strategy = strategies[Math.floor(Math.random() * strategies.length)];
          const timeframe = timeframes[Math.floor(Math.random() * timeframes.length)];

          const riskPercent = Math.random() < 0.7 ? 1.0 : (Math.random() < 0.5 ? 0.5 : 1.5);
          const targetRR = parseFloat((Math.random() * 2.5 + 2).toFixed(2)); // 2.0 to 4.5

          let actualRR = 0;
          let plVal = 0;
          if (result === 'Win') {
            actualRR = targetRR;
            plVal = parseFloat((accountSize * (riskPercent / 100) * targetRR).toFixed(2));
          } else if (result === 'Loss') {
            actualRR = -1.0;
            plVal = parseFloat((-accountSize * (riskPercent / 100)).toFixed(2));
          } else {
            actualRR = 0;
            plVal = 0.0;
          }

          const dayOfWeek = new Date(dateStr).toLocaleDateString('en-US', { weekday: 'long' });

          if (isBacktest) {
            trades.push({
              user_id: userEmail,
              date: dateStr,
              session,
              pair,
              direction,
              strategy,
              timeframe,
              risk_percent: riskPercent,
              target_rr: targetRR,
              actual_rr: actualRR,
              result,
              lesson_learned: `Historical backtest trade for ${strategy} showing ${result}.`,
              notes: 'Aggregated historical statistics entry.',
              before_image: createMockChartSVG(true, result === 'Win', pair, direction),
              after_image: createMockChartSVG(false, result === 'Win', pair, direction),
              accountType,
              pl_money: plVal,
              immutable: true,
              created_at: new Date(dateStr).toISOString(),
              updated_at: new Date(dateStr).toISOString()
            });
          } else {
            trades.push({
              userEmail,
              date: dateStr,
              day: dayOfWeek,
              session,
              pair,
              type: direction,
              entryPrice: parseFloat((Math.random() * 100 + 1).toFixed(4)),
              stopLoss: parseFloat((Math.random() * 100 + 1).toFixed(4)),
              takeProfit: parseFloat((Math.random() * 100 + 1).toFixed(4)),
              riskPercent,
              rr: targetRR,
              result,
              strategy,
              setup: `${timeframe} structural setup`,
              checklist: ['HTF Trend Aligned', 'OB Tapped', 'Risk defined'],
              emotion: 'Disciplined',
              mistakes: 'None',
              lessonLearned: `Historical live trade for ${strategy} showing ${result}.`,
              notes: 'Aggregated historical live statistics entry.',
              beforeScreenshot: createMockChartSVG(true, result === 'Win', pair, direction),
              afterScreenshot: createMockChartSVG(false, result === 'Win', pair, direction),
              accountType,
              plMoney: plVal,
              immutable: true
            });
          }
        }
      }
    });

    return trades;
  }

  // Trade records are user-entered. Never fabricate live or backtest history during startup.
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
