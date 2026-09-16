import { AppState } from '../state.js';
import { openTradeModal } from '../main.js';

let currentCalendarDate = new Date();
let activeJournalSource = 'all'; // 'all', 'live', 'backtest'
let activeCalendarAccount = 'All';

function getTradeAccount(trade) {
  return trade.accountType || trade.account_type || trade.account || 'Unknown';
}

function getTradePL(trade) {
  const value = Number(trade.plMoney ?? trade.pl_money);
  if (!Number.isFinite(value)) return null;
  if (trade.result === 'Loss') return -Math.abs(value);
  if (trade.result === 'Win') return Math.abs(value);
  return value;
}

export function renderCalendar(container) {
  // 1. Get trades based on selected journal source
  let trades = [];
  if (activeJournalSource === 'all' || activeJournalSource === 'live') {
    trades = trades.concat(AppState.tradingTrades.map(t => ({ ...t, source: 'live' })));
  }
  if (activeJournalSource === 'all' || activeJournalSource === 'backtest') {
    trades = trades.concat(AppState.backtestTrades.map(t => ({ ...t, source: 'backtest' })));
  }
  const accounts = [...new Set(trades.map(getTradeAccount))].filter(Boolean).sort();
  if (activeCalendarAccount !== 'All' && !accounts.includes(activeCalendarAccount)) activeCalendarAccount = 'All';
  trades = trades.filter(trade => activeCalendarAccount === 'All' || getTradeAccount(trade) === activeCalendarAccount);

  const year = currentCalendarDate.getFullYear();
  const month = currentCalendarDate.getMonth();
  const monthName = currentCalendarDate.toLocaleDateString('en-US', { month: 'long' });

  // Start/End of Month Calculations
  const firstDayIndex = new Date(year, month, 1).getDay(); // Sunday=0, Monday=1...
  // Adjust firstDayIndex to make Monday = index 0 (European standard)
  const adjustedStartDay = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

  const totalDays = new Date(year, month + 1, 0).getDate();

  // Create Grid of days
  let calendarDaysHTML = '';
  
  // Empty spaces for previous month offset
  for (let i = 0; i < adjustedStartDay; i++) {
    calendarDaysHTML += `<div class="calendar-day empty"></div>`;
  }

  // Days in current month
  const todayStr = new Date().toISOString().split('T')[0];

  for (let dayNum = 1; dayNum <= totalDays; dayNum++) {
    const paddedDay = String(dayNum).padStart(2, '0');
    const paddedMonth = String(month + 1).padStart(2, '0');
    const dateKey = `${year}-${paddedMonth}-${paddedDay}`;
    
    // Check for trades on this date
    const dayTrades = trades.filter(t => t.date === dateKey);
    const wins = dayTrades.filter(t => t.result === 'Win').length;
    const losses = dayTrades.filter(t => t.result === 'Loss').length;
    const bes = dayTrades.filter(t => t.result === 'Break Even').length;
    const dayPL = dayTrades.reduce((total, trade) => {
      const value = getTradePL(trade);
      return value === null ? total : total + value;
    }, 0);
    const hasPL = dayTrades.some(trade => getTradePL(trade) !== null);

    const isToday = todayStr === dateKey;
    const hasTrades = dayTrades.length > 0;

    let dayBadges = '';
    if (wins > 0) dayBadges += `<div class="calendar-day-badge win"><span>Wins</span><span>${wins}</span></div>`;
    if (losses > 0) dayBadges += `<div class="calendar-day-badge loss"><span>Loss</span><span>${losses}</span></div>`;
    if (bes > 0) dayBadges += `<div class="calendar-day-badge be"><span>BE</span><span>${bes}</span></div>`;
    if (hasPL) {
      const formattedPL = `${dayPL >= 0 ? '+' : '-'}$${Math.abs(dayPL).toFixed(2)}`;
      dayBadges += `<div class="calendar-day-badge pl ${dayPL >= 0 ? 'positive' : 'negative'}"><span>P/L</span><span>${formattedPL}</span></div>`;
    }

    calendarDaysHTML += `
      <div class="calendar-day ${isToday ? 'today' : ''}" data-date="${dateKey}" style="${hasTrades ? 'border-color: rgba(59, 130, 246, 0.3);' : ''}">
        <span class="calendar-day-num">${dayNum}</span>
        <div class="calendar-day-stats">
          ${dayBadges}
        </div>
      </div>
    `;
  }

  container.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 24px;">
      
      <!-- Calendar Controls Header -->
      <div class="card" style="padding: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
          
          <div style="display: flex; gap: 8px; background: var(--bg-secondary); padding: 4px; border-radius: var(--border-radius-md); border: 1px solid var(--border-color);">
            <button class="btn ${activeJournalSource === 'all' ? 'btn-primary' : 'btn-secondary'}" id="cal-src-all" style="padding: 6px 12px; font-size: 12px;">All Trades</button>
            <button class="btn ${activeJournalSource === 'live' ? 'btn-primary' : 'btn-secondary'}" id="cal-src-live" style="padding: 6px 12px; font-size: 12px;">Live Only</button>
            <button class="btn ${activeJournalSource === 'backtest' ? 'btn-primary' : 'btn-secondary'}" id="cal-src-backtest" style="padding: 6px 12px; font-size: 12px;">Backtest Only</button>
          </div>

          <div style="display: flex; align-items: center; gap: 16px;">
            <button class="btn btn-secondary btn-icon" id="cal-prev-month-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <span class="calendar-month-year">${monthName} ${year}</span>
            <button class="btn btn-secondary btn-icon" id="cal-next-month-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>

          <select id="cal-account-selector" class="form-control" style="width: 150px; height: 36px; padding: 6px 10px; font-size: 12px;">
            <option value="All" ${activeCalendarAccount === 'All' ? 'selected' : ''}>All Accounts</option>
            ${accounts.map(account => `<option value="${account}" ${activeCalendarAccount === account ? 'selected' : ''}>${account}</option>`).join('')}
          </select>

          <div>
            <button class="btn btn-primary" id="cal-today-btn" style="padding: 8px 16px; font-size: 13px;">Today</button>
          </div>

        </div>
      </div>

      <!-- Calendar Board -->
      <div class="card" style="padding: 24px;">
        <div class="calendar-grid">
          <!-- Weekday Headers -->
          <div class="calendar-day-header">Mon</div>
          <div class="calendar-day-header">Tue</div>
          <div class="calendar-day-header">Wed</div>
          <div class="calendar-day-header">Thu</div>
          <div class="calendar-day-header">Fri</div>
          <div class="calendar-day-header">Sat</div>
          <div class="calendar-day-header">Sun</div>

          ${calendarDaysHTML}
        </div>
      </div>

    </div>
  `;

  // Bind Control triggers
  document.getElementById('cal-prev-month-btn').addEventListener('click', () => {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
    renderCalendar(container);
  });
  document.getElementById('cal-next-month-btn').addEventListener('click', () => {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
    renderCalendar(container);
  });
  document.getElementById('cal-today-btn').addEventListener('click', () => {
    currentCalendarDate = new Date();
    renderCalendar(container);
  });

  // Source buttons
  document.getElementById('cal-src-all').addEventListener('click', () => {
    activeJournalSource = 'all';
    renderCalendar(container);
  });
  document.getElementById('cal-src-live').addEventListener('click', () => {
    activeJournalSource = 'live';
    renderCalendar(container);
  });
  document.getElementById('cal-src-backtest').addEventListener('click', () => {
    activeJournalSource = 'backtest';
    renderCalendar(container);
  });
  document.getElementById('cal-account-selector').addEventListener('change', event => {
    activeCalendarAccount = event.target.value;
    renderCalendar(container);
  });

  // Bind day clicks
  document.querySelectorAll('.calendar-day:not(.empty)').forEach(dayEl => {
    dayEl.addEventListener('click', () => {
      const selectedDate = dayEl.dataset.date;
      const dayTrades = trades.filter(t => t.date === selectedDate);
      if (dayTrades.length > 0) {
        openDayDetailsOverlay(selectedDate, dayTrades);
      }
    });
  });
}

// Show list of trades logged on clicked day
function openDayDetailsOverlay(dateStr, dayTrades) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay active';
  overlay.style.zIndex = '1500';

  overlay.innerHTML = `
    <div class="modal-container" style="max-width: 550px;">
      <div class="modal-header">
        <h3>Trades on ${dateStr}</h3>
        <button class="modal-close" id="close-cal-overlay-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <div class="modal-body" style="padding: 20px; display: flex; flex-direction: column; gap: 12px; max-height: 400px; overflow-y: auto;">
        ${dayTrades.map(t => {
          const typeBadge = t.type === 'Buy' ? 'badge-buy' : 'badge-sell';
          const rBadge = t.result === 'Win' ? 'badge-win' : (t.result === 'Loss' ? 'badge-loss' : 'badge-be');
          const isLive = t.source === 'live';
          
          return `
            <div class="card cal-trade-item" data-id="${t.id}" data-source="${t.source}" style="padding: 16px; background: var(--bg-tertiary); cursor: pointer; display: flex; justify-content: space-between; align-items: center; border-color: ${isLive ? 'rgba(59,130,246,0.1)' : 'rgba(236,72,153,0.1)'}">
              <div style="display: flex; flex-direction: column; gap: 6px;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span class="badge ${typeBadge}" style="padding: 2px 6px; font-size: 9px;">${t.type}</span>
                  <span style="font-weight: 700; color: var(--text-primary); font-size: 14px;">${t.pair}</span>
                  <span style="font-size: 10px; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">(${t.source.toUpperCase()})</span>
                </div>
                <div style="font-size: 12px; color: var(--text-secondary); font-weight: 500;">
                  Session: ${t.session} | Strategy: ${t.strategy || 'N/A'}
                </div>
              </div>
              <div style="text-align: right; display: flex; flex-direction: column; gap: 4px; align-items: flex-end;">
                <span class="badge ${rBadge}">${t.result}</span>
                ${getTradePL(t) !== null ? `<span style="font-weight: 700; font-size: 13px; color: ${getTradePL(t) >= 0 ? 'var(--color-win)' : 'var(--color-loss)'}">${getTradePL(t) >= 0 ? '+' : '-'}$${Math.abs(getTradePL(t)).toFixed(2)}</span>` : ''}
                <span style="font-weight: 700; font-size: 13px; color: var(--text-primary);">${t.result === 'Win' ? `+${t.rr}` : (t.result === 'Loss' ? '-1.00' : '0.00')}R</span>
              </div>
            </div>
          `;
        }).join('')}
      </div>
      <div class="modal-footer" style="padding: 12px 20px;">
        <button class="btn btn-secondary" id="close-cal-overlay-ok">Close</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  const closeOverlay = () => {
    overlay.classList.remove('active');
    setTimeout(() => overlay.remove(), 250);
  };

  overlay.querySelector('#close-cal-overlay-btn').addEventListener('click', closeOverlay);
  overlay.querySelector('#close-cal-overlay-ok').addEventListener('click', closeOverlay);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeOverlay();
  });

  // Clicking a trade in calendar details popup triggers details drawer directly
  overlay.querySelectorAll('.cal-trade-item').forEach(item => {
    item.addEventListener('click', () => {
      const id = Number(item.dataset.id);
      const source = item.dataset.source;
      const originalTrades = source === 'live' ? AppState.tradingTrades : AppState.backtestTrades;
      const trade = originalTrades.find(t => t.id === id);
      
      closeOverlay();
      
      // We trigger click on a row by simulating journal detail drawer open
      // Navigate to the correct tab first
      AppState.setView(source === 'live' ? 'journal' : 'backtesting');
      
      // Delay slightly to allow view transition before sliding open the drawer
      setTimeout(() => {
        const row = document.querySelector(`.journal-row[data-id="${id}"]`);
        if (row) row.click();
      }, 300);
    });
  });
}
