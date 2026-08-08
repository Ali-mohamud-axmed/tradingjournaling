import { AppState } from '../state.js';
import { openTradeModal } from '../main.js';
import { openBacktestModal } from './backtesting.js';

// Global variable to keep track of chart instances to prevent canvas reuse errors
let equityChartInstance = null;
let sessionChartInstance = null;

export function renderDashboard(container) {
  const activeTab = AppState.activeDashboardTab; // 'live' or 'backtest'
  const trades = activeTab === 'live' ? AppState.tradingTrades : AppState.backtestTrades;

  // 1. Calculate metrics dynamically
  const metrics = calculateMetrics(trades);

  // 2. Render Page Frame
  container.innerHTML = `
    <!-- Dashboard Header Nav Tabs -->
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 28px; flex-wrap: wrap; gap: 16px;">
      <div style="display: flex; gap: 8px; background: var(--bg-secondary); padding: 4px; border-radius: var(--border-radius-md); border: 1px solid var(--border-color);">
        <button class="btn ${activeTab === 'live' ? 'btn-primary' : 'btn-secondary'}" id="tab-live-btn" style="padding: 8px 16px; font-size: 13px;">Live Trading</button>
        <button class="btn ${activeTab === 'backtest' ? 'btn-primary' : 'btn-secondary'}" id="tab-backtest-btn" style="padding: 8px 16px; font-size: 13px;">Backtesting</button>
      </div>
      <div style="display:flex; align-items:center; gap:12px; flex-wrap:wrap;">
        <span style="font-size: 12px; color: var(--text-muted); font-weight: 600;">Data Status: <span style="color: var(--color-win)">● Sync Complete</span></span>
        <span style="font-size: 12px; padding: 6px 10px; border-radius: 999px; background: var(--bg-secondary); border: 1px solid var(--border-color); color: var(--text-primary); font-weight: 700;">Account: ${AppState.selectedAccount || 'All'}</span>
      </div>
    </div>

    <!-- Metrics Grid -->
    <div class="metrics-grid">
      <div class="metric-card">
        <div class="metric-card-label">${activeTab === 'live' ? 'Total Trades' : 'Total Backtests'}</div>
        <div class="metric-card-value">${metrics.total}</div>
        <div class="metric-card-sub">Active Journal</div>
      </div>
      <div class="metric-card">
        <div class="metric-card-label">Win Rate</div>
        <div class="metric-card-value" style="color: var(--color-win);">${metrics.winRate}%</div>
        <div class="metric-card-sub">Target: &gt;50%</div>
      </div>
      <div class="metric-card">
        <div class="metric-card-label">Avg. Risk Reward</div>
        <div class="metric-card-value">${metrics.avgRR}:1</div>
        <div class="metric-card-sub">Ratio per trade</div>
      </div>
      <div class="metric-card">
        <div class="metric-card-label">Profit Factor</div>
        <div class="metric-card-value" style="color: ${metrics.profitFactor >= 1.5 ? 'var(--color-win)' : 'var(--text-primary)'}">${metrics.profitFactor}</div>
        <div class="metric-card-sub">Gross Win / Loss</div>
      </div>
      <div class="metric-card">
        <div class="metric-card-label">Realized R-Multiple</div>
        <div class="metric-card-value" style="color: ${metrics.netR >= 0 ? 'var(--color-win)' : 'var(--color-loss)'}">${metrics.netR > 0 ? '+' : ''}${metrics.netR} R</div>
        <div class="metric-card-sub">Growth return</div>
      </div>
      <div class="metric-card">
        <div class="metric-card-label">Max Drawdown</div>
        <div class="metric-card-value" style="color: var(--color-loss);">${metrics.maxDrawdown}%</div>
        <div class="metric-card-sub">Peak to trough decline</div>
      </div>
    </div>

    <!-- Secondary Metrics row -->
    <div class="metrics-grid" style="grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); margin-bottom: 32px;">
      <div class="metric-card" style="min-height: 90px; padding: 16px;">
        <div class="metric-card-label" style="font-size: 10px;">Win Streak</div>
        <div class="metric-card-value" style="font-size: 20px; color: var(--color-win);">${metrics.winStreak} Wins</div>
      </div>
      <div class="metric-card" style="min-height: 90px; padding: 16px;">
        <div class="metric-card-label" style="font-size: 10px;">Loss Streak</div>
        <div class="metric-card-value" style="font-size: 20px; color: var(--color-loss);">${metrics.lossStreak} Losses</div>
      </div>
      <div class="metric-card" style="min-height: 90px; padding: 16px;">
        <div class="metric-card-label" style="font-size: 10px;">Avg. Risk</div>
        <div class="metric-card-value" style="font-size: 20px; color: var(--text-primary);">${metrics.avgRisk}%</div>
      </div>
      <div class="metric-card" style="min-height: 90px; padding: 16px;">
        <div class="metric-card-label" style="font-size: 10px;">Best Pair</div>
        <div class="metric-card-value" style="font-size: 20px; color: var(--accent-secondary);">${metrics.bestPair}</div>
      </div>
      <div class="metric-card" style="min-height: 90px; padding: 16px;">
        <div class="metric-card-label" style="font-size: 10px;">Best Session</div>
        <div class="metric-card-value" style="font-size: 20px; color: var(--accent-color);">${metrics.bestSession}</div>
      </div>
      <div class="metric-card" style="min-height: 90px; padding: 16px;">
        <div class="metric-card-label" style="font-size: 10px;">Loss Rate</div>
        <div class="metric-card-value" style="font-size: 20px; color: var(--color-loss);">${metrics.lossRate}%</div>
      </div>
      <div class="metric-card" style="min-height: 90px; padding: 16px;">
        <div class="metric-card-label" style="font-size: 10px;">Break Even Rate</div>
        <div class="metric-card-value" style="font-size: 20px; color: var(--color-be);">${metrics.beRate}%</div>
      </div>
    </div>

    <!-- Charts Area -->
    <div class="charts-grid">
      <div class="card chart-panel">
        <div class="card-header">
          <div class="card-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            Equity Growth Curve (R-multiple cumulative)
          </div>
        </div>
        <div class="chart-container">
          <canvas id="equityCurveChart"></canvas>
        </div>
      </div>
      <div class="card chart-panel">
        <div class="card-header">
          <div class="card-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            Session & Performance Distribution
          </div>
        </div>
        <div class="chart-container">
          <canvas id="sessionDistChart"></canvas>
        </div>
      </div>
    </div>

    <!-- Recent Trades Table -->
    <div class="card">
      <div class="card-header">
        <div class="card-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><list x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
          Recent Activity Logs
        </div>
        <button class="btn btn-secondary" id="view-all-journal-btn" style="padding: 6px 12px; font-size: 12px;">Go to Journal</button>
      </div>
      <div class="table-container">
        <table class="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Pair</th>
              <th>Type</th>
              <th>Session</th>
              <th>Result</th>
              <th>R-Realized</th>
              <th>Strategy</th>
              <th>Setup</th>
            </tr>
          </thead>
          <tbody id="recent-trades-body">
            <!-- Populated by script -->
          </tbody>
        </table>
      </div>
    </div>
  `;

  // 3. Bind dashboard-specific event listeners
  document.getElementById('tab-live-btn').addEventListener('click', () => {
    AppState.setDashboardTab('live');
  });
  document.getElementById('tab-backtest-btn').addEventListener('click', () => {
    AppState.setView('backtesting');
  });
  document.getElementById('view-all-journal-btn').addEventListener('click', () => {
    AppState.setView(activeTab === 'live' ? 'journal' : 'backtesting');
  });

  // Populate recent trades table
  const recentTable = document.getElementById('recent-trades-body');
  const recentTrades = [...trades].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

  if (recentTrades.length === 0) {
    recentTable.innerHTML = `<tr><td colspan="8" style="text-align: center; padding: 24px; color: var(--text-muted);">No trades logged yet. Click 'New Trade' to get started!</td></tr>`;
  } else {
    recentTable.innerHTML = recentTrades.map(t => {
      const isBacktest = activeTab === 'backtest';
      const rBadge = t.result === 'Win' ? 'badge-win' : (t.result === 'Loss' ? 'badge-loss' : 'badge-be');
      const direction = isBacktest ? t.direction : t.type;
      const typeBadge = direction === 'Buy' ? 'badge-buy' : 'badge-sell';
      const targetRR = isBacktest ? (t.target_rr || 0) : (t.rr || 0);
      const rMultiple = isBacktest 
        ? (t.actual_rr !== undefined ? t.actual_rr.toFixed(2) : (t.result === 'Win' ? targetRR : (t.result === 'Loss' ? -1.0 : 0.0)))
        : (t.result === 'Win' ? t.rr : (t.result === 'Loss' ? -1.00 : 0.00));
      const rMultipleText = t.result === 'Win' ? `+${rMultiple}` : rMultiple;
      const setup = isBacktest ? (t.timeframe || 'N/A') : (t.setup || 'N/A');
      return `
        <tr style="cursor: pointer;" class="recent-trade-row" data-id="${t.id}">
          <td>${t.date}</td>
          <td style="font-weight: 700;">${t.pair}</td>
          <td><span class="badge ${typeBadge}">${direction}</span></td>
          <td><span class="badge badge-session ${t.session.toLowerCase().replace(' ', '')}">${t.session}</span></td>
          <td><span class="badge ${rBadge}">${t.result}</span></td>
          <td style="font-weight: 600; color: ${t.result === 'Win' ? 'var(--color-win)' : (t.result === 'Loss' ? 'var(--color-loss)' : 'var(--color-be)')}">${rMultipleText}R</td>
          <td>${t.strategy || 'N/A'}</td>
          <td style="color: var(--text-muted); font-size: 13px;">${setup}</td>
        </tr>
      `;
    }).join('');

    // Table click rows triggers edit modal
    document.querySelectorAll('.recent-trade-row').forEach(row => {
      row.addEventListener('click', () => {
        const id = row.dataset.id;
        const trade = trades.find(t => t.id === Number(id));
        if (trade) {
          if (activeTab === 'backtest') {
            openBacktestModal(trade);
          } else {
            openTradeModal(trade, activeTab);
          }
        }
      });
    });
  }

  // 4. Render Chart.js charts
  renderCharts(trades, metrics.equityData);
}

// Analytics calculations
function calculateMetrics(trades) {
  const total = trades.length;
  if (total === 0) {
    return {
      total: 0, winRate: 0, lossRate: 0, beRate: 0, avgRR: '0.00', profitFactor: '0.00', netR: '0.00', maxDrawdown: 0, winStreak: 0, lossStreak: 0, bestPair: 'N/A', bestSession: 'N/A', avgRisk: '0.00', equityData: []
    };
  }

  // Normalize trades to support both TradingJournal (camelCase) and BacktestingJournal (snake_case)
  const normTrades = trades.map(t => {
    const isBacktest = t.target_rr !== undefined || t.actual_rr !== undefined;
    const targetRR = isBacktest ? (t.target_rr || 0) : (t.rr || 0);
    const actualRR = isBacktest 
      ? (t.actual_rr !== undefined ? t.actual_rr : (t.result === 'Win' ? targetRR : (t.result === 'Loss' ? -1 : 0))) 
      : (t.result === 'Win' ? targetRR : (t.result === 'Loss' ? -1 : 0));
    const riskPercent = isBacktest ? (t.risk_percent || 0) : (t.riskPercent || 0);
    const direction = isBacktest ? (t.direction || '') : (t.type || '');
    return {
      ...t,
      targetRR,
      actualRR,
      riskPercent,
      direction
    };
  });

  const wins = normTrades.filter(t => t.result === 'Win');
  const losses = normTrades.filter(t => t.result === 'Loss');
  const be = normTrades.filter(t => t.result === 'Break Even');

  const winRate = ((wins.length / total) * 100).toFixed(1);
  const lossRate = ((losses.length / total) * 100).toFixed(1);
  const beRate = ((be.length / total) * 100).toFixed(1);

  const avgRR = (normTrades.reduce((acc, curr) => acc + curr.targetRR, 0) / total).toFixed(2);
  const avgRisk = (normTrades.reduce((acc, curr) => acc + curr.riskPercent, 0) / total).toFixed(2);

  // Compute net R-multiple: Wins add realized R:R; losses subtract 1R; break evens are 0R.
  let netR = 0;
  let equityData = [0]; // starts at 0 balance
  let peak = 0;
  let maxDrawdown = 0;

  // Sort trades chronologically to build equity curve correctly
  const sortedTrades = [...normTrades].sort((a, b) => new Date(a.date) - new Date(b.date));

  sortedTrades.forEach(t => {
    netR += t.actualRR;
    equityData.push(netR);

    // Drawdown calculation
    if (netR > peak) peak = netR;
    const draw = peak - netR;
    if (draw > maxDrawdown) maxDrawdown = draw;
  });

  // Calculate profit factor
  const grossWin = wins.reduce((acc, curr) => acc + curr.actualRR, 0);
  const grossLoss = losses.reduce((acc, curr) => acc + Math.abs(curr.actualRR), 0);
  const profitFactor = grossLoss > 0 ? (grossWin / grossLoss).toFixed(2) : grossWin.toFixed(2);

  // Streaks calculation
  let winStreak = 0;
  let currentWinStreak = 0;
  let lossStreak = 0;
  let currentLossStreak = 0;

  sortedTrades.forEach(t => {
    if (t.result === 'Win') {
      currentWinStreak++;
      currentLossStreak = 0;
      if (currentWinStreak > winStreak) winStreak = currentWinStreak;
    } else if (t.result === 'Loss') {
      currentLossStreak++;
      currentWinStreak = 0;
      if (currentLossStreak > lossStreak) lossStreak = currentLossStreak;
    } else {
      currentWinStreak = 0;
      currentLossStreak = 0;
    }
  });

  // Best pair search
  const pairRMap = {};
  normTrades.forEach(t => {
    pairRMap[t.pair] = (pairRMap[t.pair] || 0) + t.actualRR;
  });
  let bestPair = 'N/A';
  let maxPairR = -Infinity;
  Object.keys(pairRMap).forEach(pair => {
    if (pairRMap[pair] > maxPairR) {
      maxPairR = pairRMap[pair];
      bestPair = pair;
    }
  });

  // Best session search
  const sessionRMap = {};
  normTrades.forEach(t => {
    sessionRMap[t.session] = (sessionRMap[t.session] || 0) + t.actualRR;
  });
  let bestSession = 'N/A';
  let maxSessionR = -Infinity;
  Object.keys(sessionRMap).forEach(sess => {
    if (sessionRMap[sess] > maxSessionR) {
      maxSessionR = sessionRMap[sess];
      bestSession = sess;
    }
  });

  return {
    total,
    winRate,
    lossRate,
    beRate,
    avgRR,
    profitFactor,
    netR: netR.toFixed(2),
    maxDrawdown: maxDrawdown.toFixed(1),
    winStreak,
    lossStreak,
    bestPair,
    bestSession,
    avgRisk,
    equityData
  };
}

// Chart rendering
function renderCharts(trades, equityData) {
  const equityCtx = document.getElementById('equityCurveChart')?.getContext('2d');
  const sessionCtx = document.getElementById('sessionDistChart')?.getContext('2d');

  if (!equityCtx || !sessionCtx) return;

  // Clean old charts if they exist
  if (equityChartInstance) equityChartInstance.destroy();
  if (sessionChartInstance) sessionChartInstance.destroy();

  // Color tokens based on active theme
  const isLight = document.body.classList.contains('light-theme');
  const gridColor = isLight ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)';
  const textColor = isLight ? '#475569' : '#94a3b8';

  // 1. Equity Curve Chart
  const labels = equityData.map((_, index) => `T${index}`);
  
  // Create gradient fill for equity chart
  const gradient = equityCtx.createLinearGradient(0, 0, 0, 300);
  gradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)');
  gradient.addColorStop(1, 'rgba(59, 130, 246, 0.0)');

  equityChartInstance = new Chart(equityCtx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Cumulative R',
        data: equityData,
        borderColor: '#3b82f6',
        borderWidth: 3,
        pointBackgroundColor: '#3b82f6',
        pointHoverRadius: 6,
        fill: true,
        backgroundColor: gradient,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: {
          grid: { color: gridColor },
          ticks: { color: textColor, font: { family: 'Plus Jakarta Sans' } }
        },
        y: {
          grid: { color: gridColor },
          ticks: { color: textColor, font: { family: 'Plus Jakarta Sans' } }
        }
      }
    }
  });

  // 2. Session and Strategy distribution (Doughnut)
  const sessionCounts = { Asia: 0, London: 0, 'New York': 0 };
  trades.forEach(t => {
    if (sessionCounts[t.session] !== undefined) {
      sessionCounts[t.session]++;
    }
  });

  sessionChartInstance = new Chart(sessionCtx, {
    type: 'doughnut',
    data: {
      labels: ['Asia', 'London', 'New York'],
      datasets: [{
        data: [sessionCounts.Asia, sessionCounts.London, sessionCounts['New York']],
        backgroundColor: ['#8b5cf6', '#3b82f6', '#ec4899'],
        borderWidth: 0,
        hoverOffset: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: textColor,
            font: { family: 'Plus Jakarta Sans', size: 12 },
            padding: 16
          }
        }
      },
      cutout: '70%'
    }
  });
}
