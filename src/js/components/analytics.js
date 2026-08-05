import { AppState } from '../state.js';

let chartInstances = {};

export function renderAnalytics(container) {
  const activeTab = AppState.activeDashboardTab; // shares active view state ('live' / 'backtest')
  const trades = activeTab === 'live' ? AppState.tradingTrades : AppState.backtestTrades;

  container.innerHTML = `
    <!-- Tab Controls -->
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 28px; flex-wrap: wrap; gap: 16px;">
      <div style="display: flex; gap: 8px; background: var(--bg-secondary); padding: 4px; border-radius: var(--border-radius-md); border: 1px solid var(--border-color);">
        <button class="btn ${activeTab === 'live' ? 'btn-primary' : 'btn-secondary'}" id="analy-tab-live" style="padding: 8px 16px; font-size: 13px;">Live Trading Analytics</button>
        <button class="btn ${activeTab === 'backtest' ? 'btn-primary' : 'btn-secondary'}" id="analy-tab-backtest" style="padding: 8px 16px; font-size: 13px;">Backtesting Analytics</button>
      </div>
      <div>
        <span style="font-size: 13px; color: var(--text-muted); font-weight: 500;">Period: <strong style="color:var(--text-primary);">All-Time</strong></span>
      </div>
    </div>

    <!-- Analytics Charts Grid -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(450px, 1fr)); gap: 24px;">
      
      <!-- 1. Equity Curve & Drawdown -->
      <div class="card chart-panel" style="grid-column: span 2;">
        <div class="card-header">
          <div class="card-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            Equity Curve & Realized Drawdown (R-multiple)
          </div>
        </div>
        <div class="chart-container" style="min-height: 320px;">
          <canvas id="analy-equity-chart"></canvas>
        </div>
      </div>

      <!-- 2. Win Rate Distribution -->
      <div class="card chart-panel">
        <div class="card-header">
          <div class="card-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/></svg>
            Outcome Distribution
          </div>
        </div>
        <div class="chart-container">
          <canvas id="analy-winrate-chart"></canvas>
        </div>
      </div>

      <!-- 3. Session Success Rate -->
      <div class="card chart-panel">
        <div class="card-header">
          <div class="card-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            Session Performance (Average R realization)
          </div>
        </div>
        <div class="chart-container">
          <canvas id="analy-session-chart"></canvas>
        </div>
      </div>

      <!-- 4. Pair Profitability -->
      <div class="card chart-panel">
        <div class="card-header">
          <div class="card-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            Pair Profitability (Net R Realized)
          </div>
        </div>
        <div class="chart-container">
          <canvas id="analy-pair-chart"></canvas>
        </div>
      </div>

      <!-- 5. Strategy Success Rate -->
      <div class="card chart-panel">
        <div class="card-header">
          <div class="card-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
            Strategy Win Rates & Volume
          </div>
        </div>
        <div class="chart-container">
          <canvas id="analy-strategy-chart"></canvas>
        </div>
      </div>

      <!-- 6. Monthly Growth -->
      <div class="card chart-panel">
        <div class="card-header">
          <div class="card-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="9" x2="15" y2="15"/><line x1="15" y1="9" x2="9" y2="15"/></svg>
            Monthly Growth Progress (R Total)
          </div>
        </div>
        <div class="chart-container">
          <canvas id="analy-monthly-chart"></canvas>
        </div>
      </div>

      <!-- 7. Risk-to-Reward Distribution -->
      <div class="card chart-panel">
        <div class="card-header">
          <div class="card-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
            Target Risk-to-Reward Scatter Plot
          </div>
        </div>
        <div class="chart-container">
          <canvas id="analy-rr-chart"></canvas>
        </div>
      </div>

    </div>
  `;

  // Bind tab buttons
  document.getElementById('analy-tab-live').addEventListener('click', () => {
    AppState.setDashboardTab('live');
  });
  document.getElementById('analy-tab-backtest').addEventListener('click', () => {
    AppState.setDashboardTab('backtest');
  });

  // Calculate and Render Charts
  setTimeout(() => renderAnalyticsCharts(trades), 50);
}

function renderAnalyticsCharts(trades) {
  // Clear any existing chart instances to avoid redraw issues
  Object.keys(chartInstances).forEach(key => {
    if (chartInstances[key]) chartInstances[key].destroy();
  });

  if (trades.length === 0) return;

  const isLight = document.body.classList.contains('light-theme');
  const gridColor = isLight ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)';
  const textColor = isLight ? '#475569' : '#94a3b8';

  // Sort trades chronologically
  const sorted = [...trades].sort((a, b) => new Date(a.date) - new Date(b.date));

  // 1. Equity & Drawdown Chart (Line)
  const equityPoints = [0];
  const drawdownPoints = [0];
  let runningR = 0;
  let peak = 0;

  sorted.forEach(t => {
    const rVal = t.result === 'Win' ? t.rr : (t.result === 'Loss' ? -1 : 0);
    runningR += rVal;
    equityPoints.push(runningR);

    if (runningR > peak) peak = runningR;
    const draw = peak - runningR;
    drawdownPoints.push(-draw); // render drawdown as negative curve
  });

  const equityCtx = document.getElementById('analy-equity-chart')?.getContext('2d');
  if (equityCtx) {
    chartInstances.equity = new Chart(equityCtx, {
      type: 'line',
      data: {
        labels: equityPoints.map((_, i) => `T${i}`),
        datasets: [
          {
            label: 'Cumulative Realized R',
            data: equityPoints,
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.08)',
            borderWidth: 3,
            fill: true,
            tension: 0.25
          },
          {
            label: 'Drawdown curve (R)',
            data: drawdownPoints,
            borderColor: '#ef4444',
            backgroundColor: 'rgba(239, 68, 68, 0.05)',
            borderWidth: 1.5,
            fill: true,
            tension: 0.25
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { grid: { color: gridColor }, ticks: { color: textColor } },
          y: { grid: { color: gridColor }, ticks: { color: textColor } }
        },
        plugins: {
          legend: { labels: { color: textColor } }
        }
      }
    });
  }

  // 2. Outcome Distribution (Doughnut)
  const outcomes = { Win: 0, Loss: 0, BE: 0 };
  trades.forEach(t => {
    if (t.result === 'Win') outcomes.Win++;
    else if (t.result === 'Loss') outcomes.Loss++;
    else outcomes.BE++;
  });

  const winrateCtx = document.getElementById('analy-winrate-chart')?.getContext('2d');
  if (winrateCtx) {
    chartInstances.winrate = new Chart(winrateCtx, {
      type: 'doughnut',
      data: {
        labels: ['Win', 'Loss', 'Break Even'],
        datasets: [{
          data: [outcomes.Win, outcomes.Loss, outcomes.BE],
          backgroundColor: ['#10b981', '#ef4444', '#f59e0b'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { color: textColor } }
        }
      }
    });
  }

  // 3. Session Performance (Bar)
  const sessions = { Asia: { r: 0, count: 0 }, London: { r: 0, count: 0 }, 'New York': { r: 0, count: 0 } };
  trades.forEach(t => {
    const rVal = t.result === 'Win' ? t.rr : (t.result === 'Loss' ? -1 : 0);
    if (sessions[t.session]) {
      sessions[t.session].r += rVal;
      sessions[t.session].count++;
    }
  });

  const avgSessionR = Object.keys(sessions).map(k => sessions[k].count > 0 ? (sessions[k].r / sessions[k].count).toFixed(2) : 0);

  const sessionCtx = document.getElementById('analy-session-chart')?.getContext('2d');
  if (sessionCtx) {
    chartInstances.session = new Chart(sessionCtx, {
      type: 'bar',
      data: {
        labels: ['Asia', 'London', 'New York'],
        datasets: [{
          label: 'Avg R Realized',
          data: avgSessionR,
          backgroundColor: ['rgba(139, 92, 246, 0.7)', 'rgba(59, 130, 246, 0.7)', 'rgba(236, 72, 153, 0.7)'],
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { grid: { color: gridColor }, ticks: { color: textColor } },
          y: { grid: { color: gridColor }, ticks: { color: textColor } }
        },
        plugins: { legend: { display: false } }
      }
    });
  }

  // 4. Pair Profitability (Horizontal Bar)
  const pairRMap = {};
  trades.forEach(t => {
    const rVal = t.result === 'Win' ? t.rr : (t.result === 'Loss' ? -1 : 0);
    pairRMap[t.pair] = (pairRMap[t.pair] || 0) + rVal;
  });

  const pairLabels = Object.keys(pairRMap);
  const pairData = Object.values(pairRMap);

  const pairCtx = document.getElementById('analy-pair-chart')?.getContext('2d');
  if (pairCtx) {
    chartInstances.pair = new Chart(pairCtx, {
      type: 'bar',
      data: {
        labels: pairLabels,
        datasets: [{
          label: 'Net R-multiple',
          data: pairData,
          backgroundColor: pairData.map(v => v >= 0 ? 'rgba(16, 185, 129, 0.7)' : 'rgba(239, 68, 68, 0.7)'),
          borderRadius: 6
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { grid: { color: gridColor }, ticks: { color: textColor } },
          y: { grid: { color: gridColor }, ticks: { color: textColor } }
        },
        plugins: { legend: { display: false } }
      }
    });
  }

  // 5. Strategy Success Rates (Bar)
  const strategyMap = {};
  trades.forEach(t => {
    if (!t.strategy) return;
    if (!strategyMap[t.strategy]) {
      strategyMap[t.strategy] = { win: 0, loss: 0, be: 0, total: 0 };
    }
    strategyMap[t.strategy].total++;
    if (t.result === 'Win') strategyMap[t.strategy].win++;
    else if (t.result === 'Loss') strategyMap[t.strategy].loss++;
    else strategyMap[t.strategy].be++;
  });

  const stratLabels = Object.keys(strategyMap);
  const stratWinRates = stratLabels.map(k => ((strategyMap[k].win / strategyMap[k].total) * 100).toFixed(1));

  const strategyCtx = document.getElementById('analy-strategy-chart')?.getContext('2d');
  if (strategyCtx) {
    chartInstances.strategy = new Chart(strategyCtx, {
      type: 'bar',
      data: {
        labels: stratLabels,
        datasets: [{
          label: 'Win Rate %',
          data: stratWinRates,
          backgroundColor: 'rgba(16, 185, 129, 0.75)',
          borderColor: '#10b981',
          borderWidth: 1,
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { grid: { color: gridColor }, ticks: { color: textColor } },
          y: { min: 0, max: 100, grid: { color: gridColor }, ticks: { color: textColor } }
        },
        plugins: { legend: { display: false } }
      }
    });
  }

  // 6. Monthly Growth Progress (Line)
  const monthlyRMap = {};
  trades.forEach(t => {
    // Get year-month: YYYY-MM
    const ym = t.date.substring(0, 7);
    const rVal = t.result === 'Win' ? t.rr : (t.result === 'Loss' ? -1 : 0);
    monthlyRMap[ym] = (monthlyRMap[ym] || 0) + rVal;
  });

  const monthLabels = Object.keys(monthlyRMap).sort();
  const monthData = monthLabels.map(l => monthlyRMap[l]);

  const monthlyCtx = document.getElementById('analy-monthly-chart')?.getContext('2d');
  if (monthlyCtx) {
    chartInstances.monthly = new Chart(monthlyCtx, {
      type: 'line',
      data: {
        labels: monthLabels,
        datasets: [{
          label: 'Growth (R)',
          data: monthData,
          borderColor: '#0ea5e9',
          backgroundColor: 'rgba(14, 165, 233, 0.1)',
          fill: true,
          tension: 0.2,
          borderWidth: 3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { grid: { color: gridColor }, ticks: { color: textColor } },
          y: { grid: { color: gridColor }, ticks: { color: textColor } }
        },
        plugins: { legend: { display: false } }
      }
    });
  }

  // 7. RR Distribution Scatter Plot
  const scatterData = trades.map(t => ({
    x: t.riskPercent,
    y: t.rr
  }));

  const rrCtx = document.getElementById('analy-rr-chart')?.getContext('2d');
  if (rrCtx) {
    chartInstances.rr = new Chart(rrCtx, {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Target R:R / Risk %',
          data: scatterData,
          backgroundColor: '#3b82f6',
          pointRadius: 6,
          pointHoverRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { title: { display: true, text: 'Risk %', color: textColor }, grid: { color: gridColor }, ticks: { color: textColor } },
          y: { title: { display: true, text: 'Target RR', color: textColor }, grid: { color: gridColor }, ticks: { color: textColor } }
        },
        plugins: {
          legend: { display: false }
        }
      }
    });
  }
}
