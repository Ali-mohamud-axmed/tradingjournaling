const RESULT_ALIASES = {
  win: 'Win',
  won: 'Win',
  profit: 'Win',
  loss: 'Loss',
  lost: 'Loss',
  lose: 'Loss',
  'break even': 'Break Even',
  breakeven: 'Break Even',
  be: 'Break Even',
  scratch: 'Break Even'
};

const CLOSED_STATUSES = new Set(['closed', 'complete', 'completed', 'settled', '']);
const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

function finiteNumber(value) {
  if (value === null || value === undefined || value === '') return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function firstFinite(...values) {
  for (const value of values) {
    const number = finiteNumber(value);
    if (number !== null) return number;
  }
  return null;
}

function text(value, fallback = 'Unknown') {
  return value === null || value === undefined || String(value).trim() === '' ? fallback : String(value).trim();
}

export function normalizeResult(value) {
  const normalized = String(value || '').trim().toLowerCase();
  return RESULT_ALIASES[normalized] || null;
}

export function normalizeBacktestTrade(trade) {
  if (!trade || typeof trade !== 'object') return null;

  const result = normalizeResult(trade.result ?? trade.outcome ?? trade.status_result);
  const status = String(trade.status ?? '').trim().toLowerCase();
  if (!result || (status && !CLOSED_STATUSES.has(status))) return null;

  const targetRR = firstFinite(trade.target_rr, trade.targetRR, trade.planned_rr, trade.rr);
  const realizedR = firstFinite(
    trade.realized_r,
    trade.realizedR,
    trade.r_result,
    trade.rResult,
    trade.actual_rr,
    trade.actualRR,
    trade.result_r,
    trade.resultR,
    result === 'Win' ? targetRR : result === 'Loss' ? -1 : 0
  );
  if (realizedR === null) return null;

  const rawDate = trade.date ?? trade.trade_date ?? trade.created_at;
  const timestamp = rawDate ? new Date(rawDate).getTime() : NaN;
  if (!Number.isFinite(timestamp)) return null;

  return {
    raw: trade,
    id: trade.id,
    date: String(rawDate),
    timestamp,
    pair: text(trade.pair),
    session: text(trade.session),
    account: text(trade.accountType ?? trade.account_type ?? trade.account),
    strategy: text(trade.strategy),
    setup: text(trade.setup ?? trade.timeframe),
    direction: text(trade.direction ?? trade.type),
    result,
    realizedR,
    targetRR,
    riskPercent: firstFinite(trade.risk_percent, trade.riskPercent),
    notes: trade.notes ?? trade.lesson_learned ?? ''
  };
}

export function getClosedBacktestTrades(trades = []) {
  return trades.map(normalizeBacktestTrade).filter(Boolean).sort((a, b) => a.timestamp - b.timestamp || String(a.id).localeCompare(String(b.id)));
}

export function filterBacktestTrades(trades, filters = {}) {
  const normalized = getClosedBacktestTrades(trades);
  const dateFrom = filters.dateFrom ? new Date(`${filters.dateFrom}T00:00:00`).getTime() : -Infinity;
  const dateTo = filters.dateTo ? new Date(`${filters.dateTo}T23:59:59.999`).getTime() : Infinity;
  const matches = (filter, value) => !filter || filter === 'All' || filter === value;

  return normalized.filter(trade => (
    trade.timestamp >= dateFrom &&
    trade.timestamp <= dateTo &&
    matches(filters.account, trade.account) &&
    matches(filters.pair, trade.pair) &&
    matches(filters.session, trade.session) &&
    matches(filters.strategy, trade.strategy) &&
    matches(filters.setup, trade.setup) &&
    matches(filters.result, trade.result) &&
    (!filters.search || JSON.stringify(trade.raw).toLowerCase().includes(String(filters.search).toLowerCase()))
  ));
}

function emptyGroup(label) {
  return { label, trades: 0, wins: 0, losses: 0, breakEven: 0, winRate: 0, lossRate: 0, totalR: 0, avgR: 0, profitFactor: 0, avgRR: 0, maxDrawdown: 0 };
}

export function groupBacktestTrades(trades, keyOrFunction) {
  const groups = new Map();
  const getKey = typeof keyOrFunction === 'function' ? keyOrFunction : trade => trade[keyOrFunction];
  trades.forEach(trade => {
    const label = text(getKey(trade));
    if (!groups.has(label)) groups.set(label, emptyGroup(label));
    const group = groups.get(label);
    group.trades += 1;
    if (trade.result === 'Win') group.wins += 1;
    if (trade.result === 'Loss') group.losses += 1;
    if (trade.result === 'Break Even') group.breakEven += 1;
    group.totalR += trade.realizedR;
    group.avgRR += trade.targetRR || 0;
  });
  return [...groups.values()].map(finalizeGroup);
}

function finalizeGroup(group) {
  const decided = group.wins + group.losses;
  const grossWin = group.totalR > 0 ? 0 : 0;
  const winR = group._winR || 0;
  const lossR = group._lossR || 0;
  return {
    ...group,
    winRate: decided ? (group.wins / decided) * 100 : 0,
    lossRate: decided ? (group.losses / decided) * 100 : 0,
    avgR: group.trades ? group.totalR / group.trades : 0,
    avgRR: group.trades ? group.avgRR / group.trades : 0,
    profitFactor: lossR > 0 ? winR / lossR : winR > 0 ? Infinity : 0,
    _grossWin: grossWin
  };
}

function enrichGroups(groups, trades, keyOrFunction) {
  const getKey = typeof keyOrFunction === 'function' ? keyOrFunction : trade => trade[keyOrFunction];
  const totals = new Map();
  trades.forEach(trade => {
    const label = text(getKey(trade));
    if (!totals.has(label)) totals.set(label, { winR: 0, lossR: 0 });
    if (trade.result === 'Win') totals.get(label).winR += Math.max(0, trade.realizedR);
    if (trade.result === 'Loss') totals.get(label).lossR += Math.abs(Math.min(0, trade.realizedR));
  });
  return groups.map(group => {
    const total = totals.get(group.label) || { winR: 0, lossR: 0 };
    return { ...group, profitFactor: total.lossR ? total.winR / total.lossR : total.winR ? Infinity : 0 };
  });
}

export function buildBacktestAnalytics(trades = []) {
  const closedTrades = Array.isArray(trades) ? trades : [];
  const wins = closedTrades.filter(trade => trade.result === 'Win');
  const losses = closedTrades.filter(trade => trade.result === 'Loss');
  const breakEven = closedTrades.filter(trade => trade.result === 'Break Even');
  const decided = wins.length + losses.length;
  let cumulativeR = 0;
  let peak = 0;
  let maxDrawdown = 0;
  let drawdownSum = 0;
  let drawdownPeriods = 0;
  let activeDrawdown = null;
  let longestDrawdown = 0;
  let winStreak = 0;
  let lossStreak = 0;
  let currentWinStreak = 0;
  let currentLossStreak = 0;
  const equity = [{ tradeNumber: 0, date: null, resultR: 0, cumulativeR: 0, drawdown: 0 }];

  closedTrades.forEach((trade, index) => {
    cumulativeR += trade.realizedR;
    peak = Math.max(peak, cumulativeR);
    const drawdown = peak - cumulativeR;
    maxDrawdown = Math.max(maxDrawdown, drawdown);
    if (drawdown > 0) {
      drawdownSum += drawdown;
      if (!activeDrawdown) {
        activeDrawdown = { start: index, length: 0 };
        drawdownPeriods += 1;
      }
      activeDrawdown.length += 1;
      longestDrawdown = Math.max(longestDrawdown, activeDrawdown.length);
    } else {
      activeDrawdown = null;
    }
    if (trade.result === 'Win') {
      currentWinStreak += 1;
      currentLossStreak = 0;
      winStreak = Math.max(winStreak, currentWinStreak);
    } else if (trade.result === 'Loss') {
      currentLossStreak += 1;
      currentWinStreak = 0;
      lossStreak = Math.max(lossStreak, currentLossStreak);
    } else {
      currentWinStreak = 0;
      currentLossStreak = 0;
    }
    equity.push({ tradeNumber: index + 1, date: trade.date, resultR: trade.realizedR, cumulativeR, drawdown });
  });

  const grossWinR = wins.reduce((sum, trade) => sum + Math.max(0, trade.realizedR), 0);
  const grossLossR = losses.reduce((sum, trade) => sum + Math.abs(Math.min(0, trade.realizedR)), 0);
  const averageWinR = wins.length ? grossWinR / wins.length : 0;
  const averageLossR = losses.length ? grossLossR / losses.length : 0;
  const groups = key => enrichGroups(groupBacktestTrades(closedTrades, key), closedTrades, key);
  const pairPerformance = groups('pair');
  const sessionPerformance = groups('session');
  const best = values => values.filter(value => value.trades > 0).sort((a, b) => b.totalR - a.totalR || b.avgR - a.avgR || b.trades - a.trades)[0]?.label || 'Insufficient Data';

  return {
    trades: closedTrades,
    totalTrades: closedTrades.length,
    wins: wins.length,
    losses: losses.length,
    breakEven: breakEven.length,
    winRate: decided ? (wins.length / decided) * 100 : 0,
    lossRate: decided ? (losses.length / decided) * 100 : 0,
    breakEvenRate: closedTrades.length ? (breakEven.length / closedTrades.length) * 100 : 0,
    averageRR: closedTrades.length ? closedTrades.reduce((sum, trade) => sum + (trade.targetRR || 0), 0) / closedTrades.length : 0,
    averageRisk: closedTrades.filter(trade => trade.riskPercent !== null).reduce((sum, trade) => sum + trade.riskPercent, 0) / (closedTrades.filter(trade => trade.riskPercent !== null).length || 1),
    grossWinR,
    grossLossR,
    profitFactor: grossLossR ? grossWinR / grossLossR : grossWinR ? Infinity : 0,
    realizedR: cumulativeR,
    expectancy: (decided ? wins.length / decided : 0) * averageWinR - (decided ? losses.length / decided : 0) * averageLossR,
    maxDrawdown,
    averageDrawdown: drawdownPeriods ? drawdownSum / closedTrades.length : 0,
    longestDrawdown,
    drawdownPeriods,
    winStreak,
    lossStreak,
    currentWinStreak,
    currentLossStreak,
    bestPair: best(pairPerformance),
    bestSession: best(sessionPerformance),
    equity,
    pairPerformance,
    sessionPerformance,
    strategyPerformance: groups('strategy'),
    setupPerformance: groups('setup'),
    dayPerformance: groups(trade => {
      const day = new Date(`${trade.date}T00:00:00`).toLocaleDateString('en-US', { weekday: 'long' });
      return WEEKDAYS.includes(day) ? day : day;
    }),
    monthlyPerformance: groups(trade => trade.date.slice(0, 7)),
    outcomeDistribution: [
      { label: 'Winning trades', count: wins.length },
      { label: 'Losing trades', count: losses.length },
      { label: 'Break-even trades', count: breakEven.length }
    ]
  };
}

export function formatMetric(value, digits = 2) {
  return Number.isFinite(value) ? value.toFixed(digits) : 'N/A';
}
