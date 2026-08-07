import { AppState } from '../state.js';

let reportType = 'monthly'; // 'daily', 'weekly', 'monthly', 'yearly'
let activeReportSource = 'live'; // 'live', 'backtest'
let selectedAccount = 'All';

export function buildAccountPerformanceModel(trades, accountFilter = 'All') {
  const normalizedTrades = (trades || []).filter(trade => {
    if (accountFilter === 'All') return true;
    return (trade.accountType || trade.account_type || 'Challenge') === accountFilter;
  }).sort((a, b) => new Date(a.date) - new Date(b.date));

  const years = [];
  const byYear = new Map();

  normalizedTrades.forEach(trade => {
    const tradeDate = new Date(trade.date);
    const year = tradeDate.getFullYear();
    const monthIndex = tradeDate.getMonth();
    const rrValue = trade.result === 'Win' ? (trade.rr ?? trade.target_rr ?? trade.actual_rr ?? 0) : (trade.result === 'Loss' ? -1 : 0);

    if (!byYear.has(year)) {
      byYear.set(year, {
        year,
        totalTrades: 0,
        wins: 0,
        losses: 0,
        be: 0,
        netR: 0,
        months: Array.from({ length: 12 }, (_, index) => ({
          monthIndex: index,
          monthLabel: new Date(2020, index, 1).toLocaleString('en-US', { month: 'short' }),
          tradeCount: 0,
          wins: 0,
          losses: 0,
          be: 0,
          netR: 0,
          winRate: 0
        }))
      });
    }

    const yearBucket = byYear.get(year);
    const monthBucket = yearBucket.months[monthIndex];
    monthBucket.tradeCount += 1;
    yearBucket.totalTrades += 1;

    if (trade.result === 'Win') {
      monthBucket.wins += 1;
      yearBucket.wins += 1;
    } else if (trade.result === 'Loss') {
      monthBucket.losses += 1;
      yearBucket.losses += 1;
    } else {
      monthBucket.be += 1;
      yearBucket.be += 1;
    }

    monthBucket.netR += rrValue;
    yearBucket.netR += rrValue;
  });

  byYear.forEach(bucket => {
    bucket.months.forEach(month => {
      month.winRate = month.tradeCount > 0 ? Number(((month.wins / month.tradeCount) * 100).toFixed(1)) : 0;
    });
    years.push(bucket);
  });

  return { years, selectedAccount: accountFilter };
}

export function renderReports(container) {
  const trades = activeReportSource === 'live' ? AppState.tradingTrades : AppState.backtestTrades;

  // Filter trades based on reportType
  const filtered = filterTradesByPeriod(trades, reportType);
  const metrics = calculatePeriodMetrics(filtered);
  const dateRangeLabel = getPeriodRangeLabel(reportType);
  const performanceModel = buildAccountPerformanceModel(trades, selectedAccount);

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

        <!-- Account + Frequency select -->
        <div class="card" style="padding: 20px;">
          <h4 style="font-size: 13px; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 12px; letter-spacing: 0.05em;">Account Filter</h4>
          <select id="report-account-select" class="form-control" style="margin-bottom: 14px;">
            <option value="All">All Accounts</option>
            <option value="Challenge">Challenge</option>
            <option value="Funded">Funded</option>
            <option value="Your Broker">Your Broker</option>
          </select>
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

          <!-- 5-Year Account Performance Overview -->
          <div class="card" style="padding: 16px; margin-bottom: 24px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; flex-wrap: wrap; gap: 10px;">
              <div>
                <h4 style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 4px;">5-Year Performance Engine</h4>
                <div style="font-size: 16px; font-weight: 700; color: var(--text-primary);">${selectedAccount === 'All' ? 'All Accounts' : selectedAccount}</div>
              </div>
              <div style="font-size: 12px; color: var(--text-muted);">Yearly → Monthly drill-down</div>
            </div>
            <div style="display: grid; gap: 12px;">
              ${performanceModel.years.map(year => `
                <div style="border: 1px solid var(--border-color); border-radius: var(--border-radius-md); padding: 12px; background: var(--bg-primary);">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; flex-wrap: wrap; gap: 8px;">
                    <div style="font-weight: 700; color: var(--text-primary);">${year.year}</div>
                    <div style="font-size: 12px; color: var(--text-muted);">${year.totalTrades} trades · ${year.netR >= 0 ? '+' : ''}${year.netR.toFixed(2)}R · ${year.wins}/${year.totalTrades} wins</div>
                  </div>
                  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(90px, 1fr)); gap: 8px;">
                    ${year.months.map(month => `
                      <div style="padding: 8px; border-radius: 8px; background: var(--bg-secondary); border: 1px solid var(--border-color);">
                        <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--text-muted);">${month.monthLabel}</div>
                        <div style="margin-top: 6px; font-size: 13px; color: var(--text-primary); font-weight: 700;">${month.tradeCount} trades</div>
                        <div style="font-size: 11px; color: ${month.netR >= 0 ? 'var(--color-win)' : 'var(--color-loss)'}; margin-top: 2px;">${month.netR >= 0 ? '+' : ''}${month.netR.toFixed(2)}R</div>
                      </div>
                    `).join('')}
                  </div>
                </div>
              `).join('')}
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
                        return `
                          <tr>
                            <td>${t.date}</td>
                            <td style="font-weight: 700;">${t.pair}</td>
                            <td><span class="badge ${typeBadge}">${typeValue}</span></td>
                            <td><span class="badge badge-session ${t.session.toLowerCase().replace(' ', '')}">${t.session}</span></td>
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

  document.getElementById('report-account-select').addEventListener('change', (event) => {
    selectedAccount = event.target.value;
    AppState.setSelectedAccount(selectedAccount);
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
function filterTradesByPeriod(trades, type) {
  const sorted = [...trades].sort((a, b) => new Date(b.date) - new Date(a.date));
  if (sorted.length === 0) return [];

  const newestDate = new Date(sorted[0].date);
  const msInDay = 24 * 60 * 60 * 1000;

  return sorted.filter(t => {
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

function getPeriodRangeLabel(type) {
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
