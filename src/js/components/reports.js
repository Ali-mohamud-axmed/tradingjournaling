import { AppState } from '../state.js';

let reportType = 'monthly'; // 'daily', 'weekly', 'monthly', 'yearly'
let activeReportSource = 'live'; // 'live', 'backtest'
let selectedReportYear = 'all';
let selectedReportSession = 'all';
let selectedReportPurgeTime = 'all';

function normalizeReportSession(session) {
  const value = String(session || '').trim().toLowerCase();
  if (value === 'asian') return 'Asia';
  if (value === 'new york' || value === 'newyork') return 'New York';
  if (value === 'london') return 'London';
  if (value === 'asia') return 'Asia';
  return session || 'Other';
}

function normalizeReportPurgeTime(value) {
  const normalized = String(value || '').trim();
  if (!normalized) return '';
  const lowered = normalized.toLowerCase();
  if (lowered === '8:00 am' || lowered === '8am' || lowered === '8 am') return '8:00 AM';
  if (lowered === '8:00 pm' || lowered === '8pm' || lowered === '8 pm') return '8:00 PM';
  if (lowered === '9:00 pm' || lowered === '9pm' || lowered === '9 pm') return '9:00 PM';
  return normalized;
}

export function getBestPurgeTime(trades = []) {
  const groups = new Map();

  trades.forEach(trade => {
    const purgeTime = normalizeReportPurgeTime(trade.purgeTime ?? trade.purge_time);
    if (!purgeTime) return;

    if (!groups.has(purgeTime)) {
      groups.set(purgeTime, { totalR: 0, wins: 0, trades: 0 });
    }

    const bucket = groups.get(purgeTime);
    const rrValue = Number(trade.rr ?? trade.target_rr ?? trade.actual_rr ?? 0) || 0;
    const realizedR = trade.result === 'Win' ? rrValue : (trade.result === 'Loss' ? -1 : 0);

    bucket.totalR += realizedR;
    bucket.trades += 1;
    if (trade.result === 'Win') bucket.wins += 1;
  });

  if (!groups.size) return 'N/A';

  return [...groups.entries()].sort((a, b) => {
    const totalDiff = b[1].totalR - a[1].totalR;
    if (totalDiff !== 0) return totalDiff;
    const winRateA = a[1].trades ? (a[1].wins / a[1].trades) * 100 : 0;
    const winRateB = b[1].trades ? (b[1].wins / b[1].trades) * 100 : 0;
    return winRateB - winRateA;
  })[0][0];
}

export function renderReports(container) {
  const trades = activeReportSource === 'live' ? AppState.tradingTrades : AppState.backtestTrades;

  // Filter trades based on reportType
  const reportYears = [...new Set(trades.map(trade => new Date(trade.date).getFullYear()).filter(Number.isFinite))].sort((a, b) => b - a);
  const reportSessions = [...new Set(trades.map(trade => normalizeReportSession(trade.session)))].sort();
  const reportPurgeTimes = [...new Set(trades.map(trade => normalizeReportPurgeTime(trade.purgeTime ?? trade.purge_time)).filter(Boolean))].sort((a, b) => {
    const rank = ['8:00 AM', '8:00 PM', '9:00 PM'];
    return (rank.indexOf(a) === -1 ? 99 : rank.indexOf(a)) - (rank.indexOf(b) === -1 ? 99 : rank.indexOf(b));
  });
  if (selectedReportYear !== 'all' && !reportYears.includes(Number(selectedReportYear))) selectedReportYear = 'all';
  if (selectedReportSession !== 'all' && !reportSessions.includes(selectedReportSession)) selectedReportSession = 'all';
  if (selectedReportPurgeTime !== 'all' && !reportPurgeTimes.includes(selectedReportPurgeTime)) selectedReportPurgeTime = 'all';
  const filtered = filterTradesByPeriod(trades, reportType, selectedReportYear, selectedReportSession, selectedReportPurgeTime);
  const metrics = calculatePeriodMetrics(filtered);
  const dateRangeLabel = getPeriodRangeLabel(reportType, selectedReportYear);

  container.innerHTML = `
    <div class="reports-layout">
      
      <!-- Report Controls Sidebar -->
      <div class="report-controls">
        
        <!-- Target Journal -->
        <div class="card" style="padding: 20px;">
          <h4 style="font-size: 13px; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 12px; letter-spacing: 0.05em;">Journal Source</h4>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <label class="checkbox-label" style="margin-bottom:0;">
              <input type="radio" name="report-src" value="live" ${activeReportSource === 'live' ? 'checked' : ''} id="src-live">
              <span>Live Trading Journal</span>
            </label>
            <label class="checkbox-label" style="margin-bottom:0;">
              <input type="radio" name="report-src" value="backtest" ${activeReportSource === 'backtest' ? 'checked' : ''} id="src-back">
              <span>Backtesting Journal</span>
            </label>
          </div>
        </div>

        <div class="card" style="padding: 20px;">
          <h4 style="font-size: 13px; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 12px; letter-spacing: 0.05em;">Session</h4>
          <select id="report-session-selector" class="form-control" style="width: 100%;">
            <option value="all" ${selectedReportSession === 'all' ? 'selected' : ''}>All Sessions</option>
            ${['London', 'New York', 'Asia'].filter(session => reportSessions.includes(session)).map(session => `<option value="${session}" ${selectedReportSession === session ? 'selected' : ''}>${session}</option>`).join('')}
            ${reportSessions.filter(session => !['London', 'New York', 'Asia'].includes(session)).map(session => `<option value="${session}" ${selectedReportSession === session ? 'selected' : ''}>${session}</option>`).join('')}
          </select>
        </div>

        <div class="card" style="padding: 20px;">
          <h4 style="font-size: 13px; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 12px; letter-spacing: 0.05em;">Report Year</h4>
          <select id="report-year-selector" class="form-control" style="width: 100%;">
            <option value="all" ${selectedReportYear === 'all' ? 'selected' : ''}>All Years</option>
            ${reportYears.map(year => `<option value="${year}" ${Number(selectedReportYear) === year ? 'selected' : ''}>${year}</option>`).join('')}
          </select>
        </div>

        <div class="card" style="padding: 20px;">
          <h4 style="font-size: 13px; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 12px; letter-spacing: 0.05em;">Purge Time</h4>
          <select id="report-purge-time-selector" class="form-control" style="width: 100%;">
            <option value="all" ${selectedReportPurgeTime === 'all' ? 'selected' : ''}>All Purge Times</option>
            ${['8:00 AM', '8:00 PM', '9:00 PM'].filter(option => reportPurgeTimes.includes(option) || selectedReportPurgeTime === option).map(option => `<option value="${option}" ${selectedReportPurgeTime === option ? 'selected' : ''}>${option}</option>`).join('')}
          </select>
        </div>

        <!-- Frequency select -->
        <div class="card" style="padding: 20px;">
          <h4 style="font-size: 13px; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 12px; letter-spacing: 0.05em;">Report Range</h4>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <button class="btn ${reportType === 'daily' ? 'btn-primary' : 'btn-secondary'}" id="btn-rep-daily" style="justify-content: flex-start;">Daily Report</button>
            <button class="btn ${reportType === 'weekly' ? 'btn-primary' : 'btn-secondary'}" id="btn-rep-weekly" style="justify-content: flex-start;">Weekly Report</button>
            <button class="btn ${reportType === 'monthly' ? 'btn-primary' : 'btn-secondary'}" id="btn-rep-monthly" style="justify-content: flex-start;">Monthly Report</button>
            <button class="btn ${reportType === 'yearly' ? 'btn-primary' : 'btn-secondary'}" id="btn-rep-yearly" style="justify-content: flex-start;">Yearly Report</button>
          </div>
        </div>

        <!-- Exports Panel -->
        <div class="card" style="padding: 20px;">
          <h4 style="font-size: 13px; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 12px; letter-spacing: 0.05em;">Export Document</h4>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            <button class="btn btn-secondary" id="export-pdf-btn" style="width:100%;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
              Print / Save PDF
            </button>
            <button class="btn btn-secondary" id="export-csv-btn" style="width:100%;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
              Export CSV
            </button>
            <button class="btn btn-secondary" id="export-excel-btn" style="width:100%;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
              Export Excel (.xls)
            </button>
          </div>
        </div>

      </div>

      <!-- Report Viewport Paper Preview -->
      <div class="report-preview-container">
        <div class="report-preview-paper" id="printable-report-area">
          <div class="report-header">
            <div class="report-header-left">
              <h3>TradeMaster</h3>
              <p>Forex Performance Audit Report</p>
            </div>
            <div class="report-header-right">
              <div style="font-weight: 700; font-size: 15px;">Range: ${dateRangeLabel}</div>
              <div style="font-size: 11px; color: var(--text-muted); text-transform: uppercase;">Logged: ${AppState.user?.username || 'Trader'}</div>
            </div>
          </div>

          <!-- Summary Block Cards -->
          <div class="report-summary-block">
            <div style="background: var(--bg-primary); padding: 12px; border-radius: var(--border-radius-md); border: 1px solid var(--border-color);">
              <span style="font-size: 10px; font-weight:700; color: var(--text-muted); text-transform: uppercase;">Total Trades</span>
              <div style="font-size: 20px; font-weight: 700; margin-top: 4px;">${metrics.total}</div>
            </div>
            <div style="background: var(--bg-primary); padding: 12px; border-radius: var(--border-radius-md); border: 1px solid var(--border-color);">
              <span style="font-size: 10px; font-weight:700; color: var(--text-muted); text-transform: uppercase;">Best Purge Time</span>
              <div style="font-size: 20px; font-weight: 700; margin-top: 4px;">${getBestPurgeTime(filtered) || 'N/A'}</div>
            </div>
            <div style="background: var(--bg-primary); padding: 12px; border-radius: var(--border-radius-md); border: 1px solid var(--border-color);">
              <span style="font-size: 10px; font-weight:700; color: var(--text-muted); text-transform: uppercase;">Win Rate</span>
              <div style="font-size: 20px; font-weight: 700; color: var(--color-win); margin-top: 4px;">${metrics.winRate}%</div>
            </div>
            <div style="background: var(--bg-primary); padding: 12px; border-radius: var(--border-radius-md); border: 1px solid var(--border-color);">
              <span style="font-size: 10px; font-weight:700; color: var(--text-muted); text-transform: uppercase;">Net R realized</span>
              <div style="font-size: 20px; font-weight: 700; color: ${metrics.netR >= 0 ? 'var(--color-win)' : 'var(--color-loss)'}; margin-top: 4px;">${metrics.netR > 0 ? '+' : ''}${metrics.netR}R</div>
            </div>
            <div style="background: var(--bg-primary); padding: 12px; border-radius: var(--border-radius-md); border: 1px solid var(--border-color);">
              <span style="font-size: 10px; font-weight:700; color: var(--text-muted); text-transform: uppercase;">Profit Factor</span>
              <div style="font-size: 20px; font-weight: 700; margin-top: 4px;">${metrics.profitFactor}</div>
            </div>
          </div>

          <!-- Secondary Metrics -->
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 24px;">
            <div style="font-size: 12px; color: var(--text-secondary);">Wins: <strong style="color:var(--color-win);">${metrics.wins}</strong></div>
            <div style="font-size: 12px; color: var(--text-secondary);">Losses: <strong style="color:var(--color-loss);">${metrics.losses}</strong></div>
            <div style="font-size: 12px; color: var(--text-secondary);">Break Evens: <strong style="color:var(--color-be);">${metrics.bes}</strong></div>
          </div>

          <!-- Trades List Table -->
          <div class="report-table-section">
            <h4 style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 12px;">Audited Logs</h4>
            <div class="table-container" style="border: none;">
              <table class="table" style="width: 100%;">
                <thead>
                  <tr style="background: var(--bg-primary);">
                    <th>Date</th>
                    <th>Pair</th>
                    <th>Direction</th>
                    <th>Session</th>
                    <th>Purge Time</th>
                    <th>Result</th>
                    <th>RR</th>
                    <th>Risk %</th>
                    <th>Strategy</th>
                  </tr>
                </thead>
                <tbody>
                  ${filtered.length === 0 
                    ? `<tr><td colspan="8" style="text-align: center; padding: 24px; color: var(--text-muted);">No records found in this range.</td></tr>`
                    : filtered.map(t => {
                        const typeValue = t.type || t.direction || 'N/A';
                        const typeBadge = typeValue === 'Buy' ? 'badge-buy' : 'badge-sell';
                        const resBadge = t.result === 'Win' ? 'badge-win' : (t.result === 'Loss' ? 'badge-loss' : 'badge-be');
                        const rrValue = t.rr ?? t.target_rr ?? t.actual_rr ?? 0;
                        const riskValue = t.riskPercent ?? t.risk_percent ?? 0;
                        const purgeTimeValue = normalizeReportPurgeTime(t.purgeTime ?? t.purge_time);
                        return `
                          <tr>
                            <td>${t.date}</td>
                            <td style="font-weight: 700;">${t.pair}</td>
                            <td><span class="badge ${typeBadge}">${typeValue}</span></td>
                            <td><span class="badge badge-session ${t.session.toLowerCase().replace(' ', '')}">${t.session}</span></td>
                            <td>${purgeTimeValue || '—'}</td>
                            <td><span class="badge ${resBadge}">${t.result}</span></td>
                            <td style="font-weight:600;">${rrValue}:1</td>
                            <td>${riskValue}%</td>
                            <td style="font-size:12px; color:var(--text-muted);">${t.strategy || 'N/A'}</td>
                          </tr>
                        `;
                      }).join('')
                  }
                </tbody>
              </table>
            </div>
          </div>

          <!-- Signature Footer -->
          <div style="margin-top: 60px; border-top: 1px solid var(--border-color); padding-top: 16px; display: flex; justify-content: space-between; font-size: 11px; color: var(--text-muted);">
            <span>Generated via TradeMaster Audit API</span>
            <span>Signature: Verified Account Holder</span>
          </div>

        </div>
      </div>

    </div>
  `;

  // Bind side options
  document.getElementById('src-live').addEventListener('change', () => {
    activeReportSource = 'live';
    renderReports(container);
  });
  document.getElementById('src-live').parentElement.addEventListener('click', () => {
    activeReportSource = 'live';
    renderReports(container);
  });
  document.getElementById('src-back').addEventListener('change', () => {
    activeReportSource = 'backtest';
    renderReports(container);
  });
  document.getElementById('src-back').parentElement.addEventListener('click', () => {
    activeReportSource = 'backtest';
    renderReports(container);
  });

  // Range triggers
  document.getElementById('btn-rep-daily').addEventListener('click', () => {
    reportType = 'daily';
    renderReports(container);
  });
  document.getElementById('btn-rep-weekly').addEventListener('click', () => {
    reportType = 'weekly';
    renderReports(container);
  });
  document.getElementById('btn-rep-monthly').addEventListener('click', () => {
    reportType = 'monthly';
    renderReports(container);
  });
  document.getElementById('btn-rep-yearly').addEventListener('click', () => {
    reportType = 'yearly';
    renderReports(container);
  });

  document.getElementById('report-year-selector').addEventListener('change', (event) => {
    selectedReportYear = event.target.value;
    renderReports(container);
  });
  document.getElementById('report-session-selector').addEventListener('change', (event) => {
    selectedReportSession = event.target.value;
    renderReports(container);
  });
  document.getElementById('report-purge-time-selector').addEventListener('change', (event) => {
    selectedReportPurgeTime = event.target.value;
    renderReports(container);
  });

  // Export triggers
  document.getElementById('export-pdf-btn').addEventListener('click', () => {
    window.print();
  });

  document.getElementById('export-csv-btn').addEventListener('click', () => {
    downloadCSVReport(filtered, dateRangeLabel);
  });

  document.getElementById('export-excel-btn').addEventListener('click', () => {
    downloadExcelReport(filtered, dateRangeLabel);
  });
}

// Logic to filter trades based on period selected
function filterTradesByPeriod(trades, type, year = 'all', session = 'all', purgeTime = 'all') {
  const sorted = [...trades].sort((a, b) => new Date(b.date) - new Date(a.date));
  if (sorted.length === 0) return [];

  if (year !== 'all') {
    return sorted.filter(trade =>
      new Date(trade.date).getFullYear() === Number(year) &&
      (session === 'all' || normalizeReportSession(trade.session) === session) &&
      (purgeTime === 'all' || normalizeReportPurgeTime(trade.purgeTime ?? trade.purge_time) === purgeTime)
    );
  }

  const newestDate = new Date(sorted[0].date);
  const msInDay = 24 * 60 * 60 * 1000;

  return sorted.filter(t => {
    if (session !== 'all' && normalizeReportSession(t.session) !== session) return false;
    if (purgeTime !== 'all' && normalizeReportPurgeTime(t.purgeTime ?? t.purge_time) !== purgeTime) return false;
    const tradeDate = new Date(t.date);
    const diffDays = Math.ceil(Math.abs(newestDate - tradeDate) / msInDay);

    if (type === 'daily') {
      return diffDays <= 1;
    } else if (type === 'weekly') {
      return diffDays <= 7;
    } else if (type === 'monthly') {
      return diffDays <= 30;
    } else if (type === 'yearly') {
      return diffDays <= 365;
    }
    return true;
  });
}

function calculatePeriodMetrics(filteredTrades) {
  const total = filteredTrades.length;
  if (total === 0) {
    return { total: 0, winRate: 0, netR: 0, profitFactor: '0.00', wins: 0, losses: 0, bes: 0 };
  }

  const wins = filteredTrades.filter(t => t.result === 'Win').length;
  const losses = filteredTrades.filter(t => t.result === 'Loss').length;
  const bes = filteredTrades.filter(t => t.result === 'Break Even').length;

  const winRate = ((wins / total) * 100).toFixed(1);

  let netR = 0;
  filteredTrades.forEach(t => {
    const rrValue = t.rr ?? t.target_rr ?? t.actual_rr ?? 0;
    if (t.result === 'Win') netR += rrValue;
    else if (t.result === 'Loss') netR -= 1;
  });

  const grossWin = filteredTrades.filter(t => t.result === 'Win').reduce((acc, curr) => acc + ((curr.rr ?? curr.target_rr ?? curr.actual_rr ?? 0)), 0);
  const profitFactor = losses > 0 ? (grossWin / losses).toFixed(2) : grossWin.toFixed(2);

  return {
    total,
    winRate,
    netR: netR.toFixed(2),
    profitFactor,
    wins,
    losses,
    bes
  };
}

export function buildAccountPerformanceModel(trades, account) {
  const selected = trades.filter(trade => (trade.accountType || trade.account_type || trade.account) === account);
  const years = new Map();
  selected.forEach(trade => {
    const date = new Date(trade.date);
    const year = date.getFullYear();
    const month = date.getMonth();
    if (!years.has(year)) years.set(year, { year, months: [], totalTrades: 0, netR: 0 });
    const yearModel = years.get(year);
    let monthModel = yearModel.months.find(entry => entry.month === month);
    if (!monthModel) {
      monthModel = { month, monthLabel: date.toLocaleString('en-US', { month: 'short' }), tradeCount: 0, netR: 0 };
      yearModel.months.push(monthModel);
    }
    const resultR = trade.result === 'Win' ? Number(trade.rr ?? trade.target_rr ?? trade.actual_rr ?? 0) : trade.result === 'Loss' ? -1 : 0;
    monthModel.tradeCount += 1;
    monthModel.netR += resultR;
    yearModel.totalTrades += 1;
    yearModel.netR += resultR;
  });
  return {
    years: [...years.values()].sort((a, b) => a.year - b.year).map(year => ({ ...year, months: year.months.sort((a, b) => a.month - b.month) }))
  };
}

function getPeriodRangeLabel(type, year = 'all') {
  if (year !== 'all') return `Year ${year}`;
  const now = new Date();
  if (type === 'daily') {
    return now.toISOString().split('T')[0];
  } else if (type === 'weekly') {
    const start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    return `${start.toISOString().split('T')[0]} to ${now.toISOString().split('T')[0]}`;
  } else if (type === 'monthly') {
    return now.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  } else if (type === 'yearly') {
    return `Year ${now.getFullYear()}`;
  }
  return 'All Time';
}

// Generate & Download CSV
function downloadCSVReport(tradesList, rangeLabel) {
  const headers = ['Date', 'Day', 'Pair', 'Direction', 'Session', 'Result', 'RR', 'Risk %', 'Strategy', 'Emotion', 'Mistake', 'Lesson', 'Notes'];
  const rows = tradesList.map(t => {
    const rrValue = t.rr ?? t.target_rr ?? t.actual_rr ?? 0;
    const riskValue = t.riskPercent ?? t.risk_percent ?? 0;
    const typeValue = t.type || t.direction || '';
    const dayValue = t.day || '';
    return [
      t.date,
      dayValue,
      t.pair,
      typeValue,
      t.session,
      t.result,
      rrValue,
      riskValue,
      `"${(t.strategy || '').replace(/"/g, '""')}"`,
      t.emotion || '',
      t.mistakes || '',
      `"${(t.lessonLearned || '').replace(/"/g, '""')}"`,
      `"${(t.notes || '').replace(/"/g, '""')}"`
    ];
  });

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `trademaster_${activeReportSource}_report_${reportType}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Generate & Download Excel compatible HTML document
function downloadExcelReport(tradesList, rangeLabel) {
  let tableRows = tradesList.map(t => `
    <tr>
      <td>${t.date}</td>
      <td>${t.day}</td>
      <td>${t.pair}</td>
      <td>${t.type}</td>
      <td>${t.session}</td>
      <td>${t.result}</td>
      <td>${t.rr}</td>
      <td>${t.riskPercent}</td>
      <td>${t.strategy || ''}</td>
      <td>${t.emotion || ''}</td>
      <td>${t.mistakes || ''}</td>
      <td>${t.lessonLearned || ''}</td>
      <td>${t.notes || ''}</td>
    </tr>
  `).join('');

  const excelTemplate = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta charset="utf-8">
      <!--[if gte mso 9]>
      <xml>
        <x:ExcelWorkbook>
          <x:ExcelWorksheets>
            <x:ExcelWorksheet>
              <x:Name>TradeMaster Report</x:Name>
              <x:WorksheetOptions>
                <x:DisplayGridlines/>
              </x:WorksheetOptions>
            </x:ExcelWorksheet>
          </x:ExcelWorksheets>
        </x:ExcelWorkbook>
      </xml>
      <![endif]-->
      <style>
        table { border-collapse: collapse; }
        th { background-color: #3b82f6; color: white; font-weight: bold; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
      </style>
    </head>
    <body>
      <h2>TradeMaster Performance Audit - ${rangeLabel}</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Day</th>
            <th>Pair</th>
            <th>Direction</th>
            <th>Session</th>
            <th>Result</th>
            <th>RR</th>
            <th>Risk %</th>
            <th>Strategy</th>
            <th>Emotion</th>
            <th>Mistakes</th>
            <th>Lesson Learned</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
    </body>
    </html>
  `;

  const blob = new Blob([excelTemplate], { type: 'application/vnd.ms-excel' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `trademaster_${activeReportSource}_report_${reportType}.xls`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
