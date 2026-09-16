import { AppState } from '../state.js';
import { openBacktestModal } from './backtesting.js';
import { buildBacktestAnalytics, filterBacktestTrades, formatMetric } from '../backtesting/analytics.js';

let equityChart;
let sessionChart;
let rDistributionChart;
let dayChart;
let monthChart;

const filters = {
  account: 'All',
  dateFrom: '',
  dateTo: '',
  pair: 'All',
  session: 'All',
  strategy: 'All',
  setup: 'All',
  result: 'All',
  search: ''
};

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>'"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));
}

function options(values, selected) {
  return ['All', ...values].filter((value, index, list) => list.indexOf(value) === index).map(value => `<option value="${escapeHtml(value)}" ${value === selected ? 'selected' : ''}>${escapeHtml(value)}</option>`).join('');
}

function tableRows(rows, columns) {
  if (!rows.length) return `<tr><td colspan="${columns.length}" class="bt-empty-cell">No matching data</td></tr>`;
  return rows.map(row => `<tr>${columns.map(column => `<td>${typeof column === 'function' ? column(row) : formatGroupCell(row, column)}</td>`).join('')}</tr>`).join('');
}

function metricCard(label, value, sub = '') {
  return `<div class="metric-card"><div class="metric-card-label">${label}</div><div class="metric-card-value">${value}</div><div class="metric-card-sub">${sub}</div></div>`;
}

export function renderBacktestingDashboard(container) {
  const rawTrades = AppState.backtestTrades;
  const allTrades = filterBacktestTrades(rawTrades);
  const available = key => [...new Set(allTrades.map(trade => trade[key]).filter(value => value && value !== 'Unknown'))].sort();
  const selectedTrades = filterBacktestTrades(rawTrades, filters);
  const analytics = buildBacktestAnalytics(selectedTrades);
  injectDashboardStyles();

  container.innerHTML = `
    <div class="bt-dashboard">
      <div class="bt-dashboard-heading">
        <div>
          <div class="eyebrow">Historical analysis</div>
          <h1>Backtesting Dashboard</h1>
          <p>Analyze your historical trading performance and identify the conditions where your strategy performs best.</p>
        </div>
        <div class="bt-heading-actions">
          <button class="btn btn-secondary" id="manage-backtest-trades-btn">Backtest Trades</button>
          <button class="btn btn-primary" id="new-backtest-dashboard-btn">+ New Backtest Trade</button>
        </div>
      </div>

      <div class="card bt-filter-card">
        <div class="bt-filter-grid">
          <label>Account<select id="bt-filter-account" class="form-control">${options(available('account'), filters.account)}</select></label>
          <label>From<input id="bt-filter-date-from" class="form-control" type="date" value="${escapeHtml(filters.dateFrom)}"></label>
          <label>To<input id="bt-filter-date-to" class="form-control" type="date" value="${escapeHtml(filters.dateTo)}"></label>
          <label>Pair<select id="bt-filter-pair" class="form-control">${options(available('pair'), filters.pair)}</select></label>
          <label>Session<select id="bt-filter-session" class="form-control">${options(available('session'), filters.session)}</select></label>
          <label>Strategy<select id="bt-filter-strategy" class="form-control">${options(available('strategy'), filters.strategy)}</select></label>
          <label>Setup<select id="bt-filter-setup" class="form-control">${options(available('setup'), filters.setup)}</select></label>
          <label>Result<select id="bt-filter-result" class="form-control">${options(['Win', 'Loss', 'Break Even'], filters.result)}</select></label>
          <button class="btn btn-secondary bt-reset-button" id="bt-reset-filters-btn">Reset Filters</button>
        </div>
      </div>

      ${analytics.totalTrades ? renderAnalytics(analytics) : renderEmptyState()}
    </div>
  `;

  bindFilters(container, rawTrades);
  if (analytics.totalTrades) renderCharts(analytics);
}

function renderEmptyState() {
  return `<div class="card bt-empty-state"><div class="bt-empty-icon">∅</div><h2>No Backtesting Data Yet</h2><p>Start recording backtest trades to see your performance analytics.</p><button class="btn btn-primary" id="empty-new-backtest-btn">+ New Backtest Trade</button></div>`;
}

function renderAnalytics(analytics) {
  const bestPair = analytics.bestPair === 'Insufficient Data' ? 'Insufficient Data' : analytics.bestPair;
  const bestSession = analytics.bestSession === 'Insufficient Data' ? 'Insufficient Data' : analytics.bestSession;
  const sessionRows = analytics.sessionPerformance.sort((a, b) => b.totalR - a.totalR);
  const pairRows = analytics.pairPerformance.sort((a, b) => b.totalR - a.totalR);
  const dayRows = analytics.dayPerformance;
  const monthRows = analytics.monthlyPerformance.sort((a, b) => a.label.localeCompare(b.label));
  const distribution = analytics.outcomeDistribution;
  const outcomeTotal = distribution.reduce((sum, item) => sum + item.count, 0);

  return `
    <div class="metrics-grid bt-primary-metrics">
      ${metricCard('Total Backtest Trades', analytics.totalTrades, 'Closed trades with valid R')}
      ${metricCard('Win Rate', `${formatMetric(analytics.winRate, 1)}%`, 'Target: >50%')}
      ${metricCard('Average Risk Reward', `${formatMetric(analytics.averageRR)}:1`, 'Planned ratio')}
      ${metricCard('Profit Factor', formatMetric(analytics.profitFactor), 'Gross win / gross loss')}
      ${metricCard('Realized R-Multiple', `${analytics.realizedR >= 0 ? '+' : ''}${formatMetric(analytics.realizedR)}R`, 'Cumulative result')}
      ${metricCard('Max Drawdown', `${formatMetric(analytics.maxDrawdown)}R`, 'Peak to trough')}
    </div>
    <div class="metrics-grid bt-secondary-metrics">
      ${metricCard('Win Streak', analytics.winStreak, `Current: ${analytics.currentWinStreak}`)}
      ${metricCard('Loss Streak', analytics.lossStreak, `Current: ${analytics.currentLossStreak}`)}
      ${metricCard('Average Risk', `${formatMetric(analytics.averageRisk)}%`, 'Recorded risk')}
      ${metricCard('Best Pair', escapeHtml(bestPair), 'Highest total R')}
      ${metricCard('Best Session', escapeHtml(bestSession), 'Highest total R')}
      ${metricCard('Loss Rate', `${formatMetric(analytics.lossRate, 1)}%`, 'Excludes break-even')}
      ${metricCard('Break-even Rate', `${formatMetric(analytics.breakEvenRate, 1)}%`, 'All closed trades')}
      ${metricCard('Expectancy', `${analytics.expectancy >= 0 ? '+' : ''}${formatMetric(analytics.expectancy)}R`, 'Per closed trade')}
    </div>
    <div class="bt-chart-grid">
      <div class="card bt-chart-card bt-chart-wide"><div class="card-header"><div class="card-title">Equity Growth Curve (R-Multiple cumulative)</div></div><div class="bt-chart-wrap"><canvas id="bt-equity-chart"></canvas></div></div>
      <div class="card bt-chart-card"><div class="card-header"><div class="card-title">Session & Performance Distribution</div></div><div class="bt-chart-wrap"><canvas id="bt-session-chart"></canvas></div></div>
      <div class="card bt-chart-card"><div class="card-header"><div class="card-title">R-Multiple Distribution</div></div><div class="bt-chart-wrap"><canvas id="bt-r-distribution-chart"></canvas></div></div>
      <div class="card bt-chart-card"><div class="card-header"><div class="card-title">Drawdown Analysis</div></div><div class="bt-chart-wrap"><canvas id="bt-drawdown-chart"></canvas></div><div class="bt-chart-summary">Max ${formatMetric(analytics.maxDrawdown)}R · Average ${formatMetric(analytics.averageDrawdown)}R · ${analytics.drawdownPeriods} periods · Longest ${analytics.longestDrawdown} trades</div></div>
      <div class="card bt-chart-card"><div class="card-header"><div class="card-title">Performance by Day</div></div><div class="bt-chart-wrap"><canvas id="bt-day-chart"></canvas></div></div>
      <div class="card bt-chart-card"><div class="card-header"><div class="card-title">Monthly Total R</div></div><div class="bt-chart-wrap"><canvas id="bt-month-chart"></canvas></div></div>
    </div>
    <div class="bt-section-grid">
      <section class="card bt-table-card"><div class="card-header"><div class="card-title">Session Performance</div></div><div class="table-container"><table class="table"><thead><tr><th>Session</th><th>Trades</th><th>Wins</th><th>Losses</th><th>BE</th><th>Win Rate</th><th>Total R</th><th>Avg R</th><th>PF</th></tr></thead><tbody>${tableRows(sessionRows, ['label', 'trades', 'wins', 'losses', 'breakEven', 'winRate', 'totalR', 'avgR', 'profitFactor'])}</tbody></table></div></section>
      <section class="card bt-table-card"><div class="card-header"><div class="card-title">Pair Performance</div></div><div class="table-container"><table class="table"><thead><tr><th>Pair</th><th>Trades</th><th>Wins</th><th>Losses</th><th>BE</th><th>Win Rate</th><th>Avg R</th><th>Total R</th><th>PF</th></tr></thead><tbody>${tableRows(pairRows, ['label', 'trades', 'wins', 'losses', 'breakEven', 'winRate', 'avgR', 'totalR', 'profitFactor'])}</tbody></table></div></section>
      <section class="card bt-table-card"><div class="card-header"><div class="card-title">Performance by Day</div></div><div class="table-container"><table class="table"><thead><tr><th>Day</th><th>Trades</th><th>Wins</th><th>Losses</th><th>BE</th><th>Win Rate</th><th>Total R</th><th>Avg R</th></tr></thead><tbody>${tableRows(dayRows, ['label', 'trades', 'wins', 'losses', 'breakEven', 'winRate', 'totalR', 'avgR'])}</tbody></table></div></section>
      <section class="card bt-table-card"><div class="card-header"><div class="card-title">Monthly Performance</div></div><div class="table-container"><table class="table"><thead><tr><th>Month</th><th>Trades</th><th>Wins</th><th>Losses</th><th>BE</th><th>Win Rate</th><th>Total R</th><th>Avg R</th></tr></thead><tbody>${tableRows(monthRows, ['label', 'trades', 'wins', 'losses', 'breakEven', 'winRate', 'totalR', 'avgR'])}</tbody></table></div></section>
    </div>
    <div class="card bt-outcome-card"><div class="card-header"><div class="card-title">Trade Outcome Distribution</div></div><div class="bt-outcomes">${distribution.map(item => `<div><strong>${item.count}</strong><span>${item.label}</span><small>${outcomeTotal ? formatMetric(item.count / outcomeTotal * 100, 1) : '0.0'}%</small></div>`).join('')}</div></div>
    <div class="bt-section-grid">
      <section class="card bt-table-card"><div class="card-header"><div class="card-title">Strategy Performance</div></div><div class="table-container"><table class="table"><thead><tr><th>Strategy</th><th>Trades</th><th>Win Rate</th><th>Avg R:R</th><th>Total R</th><th>PF</th></tr></thead><tbody>${tableRows(analytics.strategyPerformance, ['label', 'trades', 'winRate', 'avgRR', 'totalR', 'profitFactor'])}</tbody></table></div></section>
      <section class="card bt-table-card"><div class="card-header"><div class="card-title">Setup Performance</div></div><div class="table-container"><table class="table"><thead><tr><th>Setup</th><th>Trades</th><th>Wins</th><th>Losses</th><th>BE</th><th>Win Rate</th><th>Total R</th><th>Avg R</th></tr></thead><tbody>${tableRows(analytics.setupPerformance, ['label', 'trades', 'wins', 'losses', 'breakEven', 'winRate', 'totalR', 'avgR'])}</tbody></table></div></section>
    </div>
  `;
}

function formatGroupCell(row, key) {
  if (key === 'label') return escapeHtml(row.label);
  if (key === 'winRate') return `${formatMetric(row.winRate, 1)}%`;
  if (key === 'profitFactor') return formatMetric(row.profitFactor);
  if (key === 'totalR') return `${row.totalR >= 0 ? '+' : ''}${formatMetric(row.totalR)}R`;
  return formatMetric(row[key]);
}

function bindFilters(container, rawTrades) {
  const filterMap = { account: 'bt-filter-account', dateFrom: 'bt-filter-date-from', dateTo: 'bt-filter-date-to', pair: 'bt-filter-pair', session: 'bt-filter-session', strategy: 'bt-filter-strategy', setup: 'bt-filter-setup', result: 'bt-filter-result' };
  Object.entries(filterMap).forEach(([key, id]) => document.getElementById(id)?.addEventListener('change', event => {
    filters[key] = event.target.value;
    renderBacktestingDashboard(container);
  }));
  document.getElementById('bt-reset-filters-btn')?.addEventListener('click', () => {
    Object.keys(filters).forEach(key => { filters[key] = key === 'search' ? '' : key === 'dateFrom' || key === 'dateTo' ? '' : 'All'; });
    renderBacktestingDashboard(container);
  });
  document.getElementById('manage-backtest-trades-btn')?.addEventListener('click', () => AppState.setView('backtest-trades'));
  document.getElementById('new-backtest-dashboard-btn')?.addEventListener('click', () => openBacktestModal());
  document.getElementById('empty-new-backtest-btn')?.addEventListener('click', () => openBacktestModal());
  window.dispatchEvent(new CustomEvent('backtestDashboardRendered', { detail: { rawTrades } }));
}

function renderCharts(analytics) {
  if (typeof Chart === 'undefined') return;
  [equityChart, sessionChart, rDistributionChart, dayChart, monthChart].forEach(chart => chart?.destroy());
  const dark = !document.body.classList.contains('light-theme');
  const textColor = dark ? '#94a3b8' : '#475569';
  const gridColor = dark ? 'rgba(255,255,255,.08)' : 'rgba(0,0,0,.08)';
  const common = { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: textColor } } }, scales: { x: { ticks: { color: textColor }, grid: { color: gridColor } }, y: { ticks: { color: textColor }, grid: { color: gridColor } } } };
  const equityContext = document.getElementById('bt-equity-chart')?.getContext('2d');
  const sessionContext = document.getElementById('bt-session-chart')?.getContext('2d');
  const distributionContext = document.getElementById('bt-r-distribution-chart')?.getContext('2d');
  const drawdownCanvas = document.getElementById('bt-drawdown-chart');
  const drawdownContext = drawdownCanvas?.getContext('2d');
  if (equityContext) equityChart = new Chart(equityContext, { type: 'line', data: { labels: analytics.equity.slice(1).map(point => point.date || `Trade ${point.tradeNumber}`), datasets: [{ label: 'Cumulative R', data: analytics.equity.slice(1).map(point => point.cumulativeR), borderColor: '#3b82f6', backgroundColor: 'rgba(59,130,246,.18)', fill: true, tension: .3, pointRadius: 2 }] }, options: { ...common, plugins: { ...common.plugins, tooltip: { callbacks: { label: context => `Result: ${formatMetric(analytics.equity[context.dataIndex + 1].resultR)}R · Cumulative: ${formatMetric(context.raw)}R` } } } } });
  if (sessionContext) sessionChart = new Chart(sessionContext, { type: 'doughnut', data: { labels: analytics.sessionPerformance.map(row => row.label), datasets: [{ data: analytics.sessionPerformance.map(row => row.trades), backgroundColor: ['#3b82f6', '#22c55e', '#f59e0b', '#ec4899', '#8b5cf6'], borderWidth: 0 }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { color: textColor } } }, cutout: '68%' } });
  if (distributionContext) {
    const buckets = new Map();
    analytics.trades.forEach(trade => { const key = Math.round(trade.realizedR); buckets.set(key, (buckets.get(key) || 0) + 1); });
    const labels = [...buckets.keys()].sort((a, b) => a - b).map(value => `${value > 0 ? '+' : ''}${value}R`);
    rDistributionChart = new Chart(distributionContext, { type: 'bar', data: { labels, datasets: [{ label: 'Trades', data: [...buckets.keys()].sort((a, b) => a - b).map(key => buckets.get(key)), backgroundColor: '#8b5cf6' }] }, options: common });
  }
  if (drawdownContext) new Chart(drawdownContext, { type: 'line', data: { labels: analytics.equity.slice(1).map(point => point.tradeNumber), datasets: [{ label: 'Drawdown R', data: analytics.equity.slice(1).map(point => -point.drawdown), borderColor: '#ef4444', backgroundColor: 'rgba(239,68,68,.16)', fill: true, tension: .25, pointRadius: 1 }] }, options: common });
  const dayContext = document.getElementById('bt-day-chart')?.getContext('2d');
  const monthContext = document.getElementById('bt-month-chart')?.getContext('2d');
  if (dayContext) dayChart = new Chart(dayContext, { type: 'bar', data: { labels: analytics.dayPerformance.map(row => row.label), datasets: [{ label: 'Total R', data: analytics.dayPerformance.map(row => row.totalR), backgroundColor: '#22c55e' }] }, options: common });
  if (monthContext) monthChart = new Chart(monthContext, { type: 'bar', data: { labels: analytics.monthlyPerformance.map(row => row.label), datasets: [{ label: 'Total R', data: analytics.monthlyPerformance.map(row => row.totalR), backgroundColor: '#3b82f6' }] }, options: common });
}

function injectDashboardStyles() {
  if (document.getElementById('backtesting-dashboard-styles')) return;
  const style = document.createElement('style');
  style.id = 'backtesting-dashboard-styles';
  style.textContent = `.bt-dashboard{display:flex;flex-direction:column;gap:24px}.bt-dashboard-heading{display:flex;justify-content:space-between;align-items:flex-end;gap:20px}.bt-dashboard-heading h1{margin:4px 0 8px;font-size:28px}.bt-dashboard-heading p{margin:0;color:var(--text-secondary);max-width:720px}.eyebrow{color:var(--accent-color);font-size:11px;font-weight:800;letter-spacing:.12em;text-transform:uppercase}.bt-heading-actions{display:flex;gap:10px;flex-wrap:wrap}.bt-filter-card{padding:18px}.bt-filter-grid{display:grid;grid-template-columns:repeat(4,minmax(120px,1fr));gap:14px;align-items:end}.bt-filter-grid label{display:flex;flex-direction:column;gap:6px;color:var(--text-muted);font-size:11px;font-weight:700;text-transform:uppercase}.bt-reset-button{height:38px}.bt-primary-metrics,.bt-secondary-metrics{margin-bottom:0}.bt-secondary-metrics .metric-card{min-height:90px;padding:16px}.bt-chart-grid{display:grid;grid-template-columns:2fr 1fr;gap:20px}.bt-chart-wide{grid-row:span 2}.bt-chart-card{min-height:320px;display:flex;flex-direction:column}.bt-chart-wrap{position:relative;min-height:250px;flex:1;padding:8px 12px 18px}.bt-chart-summary{padding:0 18px 16px;color:var(--text-muted);font-size:12px}.bt-section-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px}.bt-table-card{min-width:0}.bt-table-card .table-container{overflow-x:auto}.bt-empty-state{text-align:center;padding:72px 24px}.bt-empty-state h2{margin:10px 0 8px}.bt-empty-state p{color:var(--text-secondary);margin:0 0 22px}.bt-empty-icon{font-size:40px;color:var(--text-muted)}.bt-empty-cell{text-align:center;padding:24px!important;color:var(--text-muted)}.bt-outcomes{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;padding:20px}.bt-outcomes div{border:1px solid var(--border-color);border-radius:var(--border-radius-md);padding:16px;display:flex;flex-direction:column;gap:5px}.bt-outcomes strong{font-size:26px}.bt-outcomes span{color:var(--text-secondary)}.bt-outcomes small{color:var(--text-muted)}@media(max-width:1000px){.bt-dashboard-heading{align-items:flex-start;flex-direction:column}.bt-filter-grid{grid-template-columns:repeat(2,minmax(140px,1fr))}.bt-chart-grid{grid-template-columns:1fr}.bt-chart-wide{grid-row:auto}.bt-section-grid{grid-template-columns:1fr}}@media(max-width:600px){.bt-filter-grid,.bt-outcomes{grid-template-columns:1fr}.bt-dashboard-heading h1{font-size:24px}.bt-heading-actions{width:100%}.bt-heading-actions .btn{flex:1}.bt-chart-card{min-height:280px}}`;
  document.head.appendChild(style);
}
