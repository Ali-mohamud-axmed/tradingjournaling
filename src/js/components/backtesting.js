import { AppState, applyAccountTradeChange, getPortfolioAccounts } from '../state.js';
import { addStoreData, updateStoreData, deleteStoreData } from '../db.js';
import { t } from '../translations.js';
import { showTradeDeletedNotification, showTradeSavedNotification } from './notifications.js';

let activeFilters = {
  search: '',
  date: '',
  session: 'All',
  pair: 'All',
  strategy: 'All',
  result: 'All',
  rr: 'All',
  timeframe: 'All',
  sortBy: 'date-desc'
};

export function renderBacktesting(container) {
  const trades = AppState.backtestTrades;

  // Extract unique pairs and strategies for filter dropdowns
  const uniquePairs = ['All', ...new Set(trades.map(t => t.pair).filter(Boolean))];
  const uniqueStrategies = ['All', ...new Set(trades.map(t => t.strategy).filter(Boolean))];
  const uniqueTimeframes = ['All', 'M1', 'M5', 'M15', 'M30', 'H1', 'H4', 'D1', 'W1'];

  // Inject component CSS dynamically
  injectBacktestingStyles();

  container.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 24px;">
      
      <!-- Filters and Header Controls -->
      <div class="card" style="padding: 18px;">
        <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center; justify-content: space-between;">
          
          <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center; flex: 1;">
            <!-- Filter Date -->
            <div style="display: flex; flex-direction: column; gap: 4px;">
              <span class="filter-label-text">Date</span>
              <input type="date" id="filter-backtest-date" class="form-control" style="padding: 6px 10px; font-size: 13px; width: 130px; height: 36px;" value="${activeFilters.date}">
            </div>

            <!-- Filter Pair -->
            <div style="display: flex; flex-direction: column; gap: 4px;">
              <span class="filter-label-text">Pair</span>
              <select id="filter-backtest-pair" class="form-control" style="padding: 8px 12px; font-size: 13px; width: 110px; height: 36px;">
                ${uniquePairs.map(p => `<option value="${p}" ${activeFilters.pair === p ? 'selected' : ''}>${p}</option>`).join('')}
              </select>
            </div>

            <!-- Filter Session -->
            <div style="display: flex; flex-direction: column; gap: 4px;">
              <span class="filter-label-text">Session</span>
              <select id="filter-backtest-session" class="form-control" style="padding: 8px 12px; font-size: 13px; width: 120px; height: 36px;">
                <option value="All" ${activeFilters.session === 'All' ? 'selected' : ''}>All Sessions</option>
                <option value="Asia" ${activeFilters.session === 'Asia' ? 'selected' : ''}>Asia</option>
                <option value="London" ${activeFilters.session === 'London' ? 'selected' : ''}>London</option>
                <option value="New York" ${activeFilters.session === 'New York' ? 'selected' : ''}>New York</option>
              </select>
            </div>

            <!-- Filter Result -->
            <div style="display: flex; flex-direction: column; gap: 4px;">
              <span class="filter-label-text">Result</span>
              <select id="filter-backtest-result" class="form-control" style="padding: 8px 12px; font-size: 13px; width: 120px; height: 36px;">
                <option value="All" ${activeFilters.result === 'All' ? 'selected' : ''}>All Outcomes</option>
                <option value="Win" ${activeFilters.result === 'Win' ? 'selected' : ''}>Wins</option>
                <option value="Loss" ${activeFilters.result === 'Loss' ? 'selected' : ''}>Losses</option>
                <option value="Break Even" ${activeFilters.result === 'Break Even' ? 'selected' : ''}>Break Evens</option>
              </select>
            </div>

            <!-- Filter Strategy -->
            <div style="display: flex; flex-direction: column; gap: 4px;">
              <span class="filter-label-text">Strategy</span>
              <select id="filter-backtest-strategy" class="form-control" style="padding: 8px 12px; font-size: 13px; width: 140px; height: 36px;">
                ${uniqueStrategies.map(s => `<option value="${s}" ${activeFilters.strategy === s ? 'selected' : ''}>${s}</option>`).join('')}
              </select>
            </div>

            <!-- Filter Timeframe -->
            <div style="display: flex; flex-direction: column; gap: 4px;">
              <span class="filter-label-text">Timeframe</span>
              <select id="filter-backtest-timeframe" class="form-control" style="padding: 8px 12px; font-size: 13px; width: 110px; height: 36px;">
                ${uniqueTimeframes.map(tf => `<option value="${tf}" ${activeFilters.timeframe === tf ? 'selected' : ''}>${tf}</option>`).join('')}
              </select>
            </div>

            <!-- Filter Min RR -->
            <div style="display: flex; flex-direction: column; gap: 4px;">
              <span class="filter-label-text">R:R Trigger</span>
              <select id="filter-backtest-rr" class="form-control" style="padding: 8px 12px; font-size: 13px; width: 110px; height: 36px;">
                <option value="All" ${activeFilters.rr === 'All' ? 'selected' : ''}>All R:R</option>
                <option value="1" ${activeFilters.rr === '1' ? 'selected' : ''}>&ge; 1.0 R:R</option>
                <option value="2" ${activeFilters.rr === '2' ? 'selected' : ''}>&ge; 2.0 R:R</option>
                <option value="3" ${activeFilters.rr === '3' ? 'selected' : ''}>&ge; 3.0 R:R</option>
                <option value="4" ${activeFilters.rr === '4' ? 'selected' : ''}>&ge; 4.0 R:R</option>
              </select>
            </div>
          </div>

          <div style="display: flex; gap: 8px; margin-top: auto; flex-wrap: wrap;">
            <button class="btn btn-secondary" id="clear-backtest-filters-btn" style="height: 36px; padding: 0 14px;">Reset</button>
            <button class="btn btn-primary" id="add-backtest-btn" style="height: 36px; padding: 0 16px;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              New Backtest
            </button>
          </div>

        </div>

        <!-- Export & Sorting Sub-Bar -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 16px; border-top: 1px solid var(--border-color); padding-top: 14px; flex-wrap: wrap; gap: 12px;">
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-secondary" id="export-csv-btn" style="height: 32px; padding: 0 10px; font-size: 11px; text-transform: uppercase;">CSV</button>
            <button class="btn btn-secondary" id="export-excel-btn" style="height: 32px; padding: 0 10px; font-size: 11px; text-transform: uppercase;">Excel</button>
            <button class="btn btn-secondary" id="export-pdf-btn" style="height: 32px; padding: 0 10px; font-size: 11px; text-transform: uppercase;">PDF Report</button>
          </div>

          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size:12px; color: var(--text-secondary); font-weight:600;">Sort By:</span>
            <select id="filter-backtest-sort" class="form-control" style="padding: 4px 8px; font-size: 12px; width: 120px; height: 32px;">
              <option value="date-desc" ${activeFilters.sortBy === 'date-desc' ? 'selected' : ''}>Newest First</option>
              <option value="date-asc" ${activeFilters.sortBy === 'date-asc' ? 'selected' : ''}>Oldest First</option>
              <option value="rr-desc" ${activeFilters.sortBy === 'rr-desc' ? 'selected' : ''}>Highest R:R</option>
              <option value="rr-asc" ${activeFilters.sortBy === 'rr-asc' ? 'selected' : ''}>Lowest R:R</option>
            </select>
          </div>
        </div>

      </div>

      <!-- Table View -->
      <div class="card" style="padding: 0;">
        <div class="table-container">
          <table class="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Session</th>
                <th>Pair</th>
                <th>Buy/Sell</th>
                <th>Risk %</th>
                <th>Target RR</th>
                <th>Result</th>
                <th>Lesson Learned</th>
                <th>Before</th>
                <th>After</th>
                <th style="text-align: right; padding-right: 24px;">Actions</th>
              </tr>
            </thead>
            <tbody id="backtest-table-body">
              <!-- Dynamically rendered -->
            </tbody>
          </table>
        </div>
      </div>

    </div>
  `;

  // Bind custom globalSearch event from parent shell
  const onGlobalSearch = (e) => {
    activeFilters.search = e.detail;
    filterAndRenderTable();
  };
  window.addEventListener('globalSearch', onGlobalSearch);

  // Bind Filters
  document.getElementById('filter-backtest-date').addEventListener('change', (e) => {
    activeFilters.date = e.target.value;
    filterAndRenderTable();
  });
  document.getElementById('filter-backtest-pair').addEventListener('change', (e) => {
    activeFilters.pair = e.target.value;
    filterAndRenderTable();
  });
  document.getElementById('filter-backtest-session').addEventListener('change', (e) => {
    activeFilters.session = e.target.value;
    filterAndRenderTable();
  });
  document.getElementById('filter-backtest-result').addEventListener('change', (e) => {
    activeFilters.result = e.target.value;
    filterAndRenderTable();
  });
  document.getElementById('filter-backtest-strategy').addEventListener('change', (e) => {
    activeFilters.strategy = e.target.value;
    filterAndRenderTable();
  });
  document.getElementById('filter-backtest-timeframe').addEventListener('change', (e) => {
    activeFilters.timeframe = e.target.value;
    filterAndRenderTable();
  });
  document.getElementById('filter-backtest-rr').addEventListener('change', (e) => {
    activeFilters.rr = e.target.value;
    filterAndRenderTable();
  });
  document.getElementById('filter-backtest-sort').addEventListener('change', (e) => {
    activeFilters.sortBy = e.target.value;
    filterAndRenderTable();
  });

  // Reset Filters
  document.getElementById('clear-backtest-filters-btn').addEventListener('click', () => {
    activeFilters = { search: '', date: '', session: 'All', pair: 'All', strategy: 'All', result: 'All', rr: 'All', timeframe: 'All', sortBy: 'date-desc' };
    const globalInput = document.getElementById('global-search');
    if (globalInput) globalInput.value = '';
    
    document.getElementById('filter-backtest-date').value = '';
    document.getElementById('filter-backtest-pair').value = 'All';
    document.getElementById('filter-backtest-session').value = 'All';
    document.getElementById('filter-backtest-result').value = 'All';
    document.getElementById('filter-backtest-strategy').value = 'All';
    document.getElementById('filter-backtest-timeframe').value = 'All';
    document.getElementById('filter-backtest-rr').value = 'All';
    document.getElementById('filter-backtest-sort').value = 'date-desc';

    filterAndRenderTable();
  });

  // Export actions
  document.getElementById('export-csv-btn').addEventListener('click', () => exportToCSV(getFilteredBacktests()));
  document.getElementById('export-excel-btn').addEventListener('click', () => exportToExcel(getFilteredBacktests()));
  document.getElementById('export-pdf-btn').addEventListener('click', () => exportToPDF(getFilteredBacktests()));

  // Add Backtest button
  document.getElementById('add-backtest-btn').addEventListener('click', () => openBacktestModal());

  // Render initial table rows
  filterAndRenderTable();

  // Return clean-up hook
  return () => {
    window.removeEventListener('globalSearch', onGlobalSearch);
  };
}

function getFilteredBacktests() {
  let filtered = [...AppState.backtestTrades];

  // 1. Text Search
  if (activeFilters.search) {
    const q = activeFilters.search.toLowerCase();
    filtered = filtered.filter(t => 
      t.pair.toLowerCase().includes(q) ||
      (t.strategy && t.strategy.toLowerCase().includes(q)) ||
      t.session.toLowerCase().includes(q) ||
      t.result.toLowerCase().includes(q) ||
      t.date.includes(q) ||
      (t.notes && t.notes.toLowerCase().includes(q)) ||
      (t.timeframe && t.timeframe.toLowerCase().includes(q))
    );
  }

  // 2. Date filter
  if (activeFilters.date) {
    filtered = filtered.filter(t => t.date === activeFilters.date);
  }

  // 3. Dropdowns
  if (activeFilters.pair !== 'All') {
    filtered = filtered.filter(t => t.pair === activeFilters.pair);
  }
  if (activeFilters.session !== 'All') {
    filtered = filtered.filter(t => t.session === activeFilters.session);
  }
  if (activeFilters.result !== 'All') {
    filtered = filtered.filter(t => t.result === activeFilters.result);
  }
  if (activeFilters.strategy !== 'All') {
    filtered = filtered.filter(t => t.strategy === activeFilters.strategy);
  }
  if (activeFilters.timeframe !== 'All') {
    filtered = filtered.filter(t => t.timeframe === activeFilters.timeframe);
  }
  if (activeFilters.rr !== 'All') {
    const minRR = parseFloat(activeFilters.rr);
    filtered = filtered.filter(t => (t.target_rr || 0) >= minRR);
  }

  // 4. Sorting
  if (activeFilters.sortBy === 'date-desc') {
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (activeFilters.sortBy === 'date-asc') {
    filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
  } else if (activeFilters.sortBy === 'rr-desc') {
    filtered.sort((a, b) => (b.target_rr || 0) - (a.target_rr || 0));
  } else if (activeFilters.sortBy === 'rr-asc') {
    filtered.sort((a, b) => (a.target_rr || 0) - (b.target_rr || 0));
  }

  return filtered;
}

function filterAndRenderTable() {
  const filtered = getFilteredBacktests();
  const tbody = document.getElementById('backtest-table-body');
  
  if (!tbody) return;

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="11" style="text-align: center; padding: 48px; color: var(--text-muted);">No backtests found. Click "New Backtest" to log one!</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(t => {
    const rBadge = t.result === 'Win' ? 'badge-win' : (t.result === 'Loss' ? 'badge-loss' : 'badge-be');
    const dBadge = t.direction === 'Buy' ? 'badge-buy' : 'badge-sell';
    const beforeThumbnail = t.before_image 
      ? `<img src="${t.before_image}" class="table-img-thumbnail" data-action="view-charts" data-id="${t.id}">`
      : `<span style="font-size:11px; color:var(--text-muted);">No image</span>`;
    const afterThumbnail = t.after_image 
      ? `<img src="${t.after_image}" class="table-img-thumbnail" data-action="view-charts" data-id="${t.id}">`
      : `<span style="font-size:11px; color:var(--text-muted);">No image</span>`;
    
    return `
      <tr>
        <td style="font-weight: 600;">${t.date}</td>
        <td><span class="badge badge-session ${t.session.toLowerCase().replace(' ', '')}">${t.session}</span></td>
        <td style="font-weight: 700; font-size: 14px;">${t.pair} (${t.timeframe || 'N/A'})</td>
        <td><span class="badge ${dBadge}">${t.direction}</span></td>
        <td>${t.risk_percent}%</td>
        <td style="font-weight: 600;">${t.target_rr || 0}:1</td>
        <td><span class="badge ${rBadge}">${t.result}</span></td>
        <td class="lesson-text-column" title="${t.lesson_learned || ''}">${t.lesson_learned || 'N/A'}</td>
        <td>${beforeThumbnail}</td>
        <td>${afterThumbnail}</td>
        <td>
          <div style="display: flex; gap: 6px; justify-content: flex-end; align-items: center;">
            <button class="btn btn-secondary table-action-btn" data-action="view" data-id="${t.id}">View</button>
            <button class="btn btn-secondary table-action-btn" data-action="edit" data-id="${t.id}">Edit</button>
            <button class="btn btn-secondary table-action-btn" data-action="duplicate" data-id="${t.id}">Duplicate</button>
            <button class="btn btn-danger table-action-btn" data-action="delete" data-id="${t.id}" style="padding: 6px 10px; font-size: 12px; height: 28px;">Delete</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  // Bind Actions
  tbody.querySelectorAll('.table-action-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const action = btn.dataset.action;
      const id = Number(btn.dataset.id);
      const record = filtered.find(r => r.id === id);
      if (!record) return;

      if (action === 'view') {
        openBacktestDetailsDrawer(record);
      } else if (action === 'edit') {
        openBacktestModal(record);
      } else if (action === 'duplicate') {
        const cloned = { ...record };
        delete cloned.id;
        cloned.date = new Date().toISOString().split('T')[0];
        openBacktestModal(cloned);
      } else if (action === 'delete') {
        if (await requestBacktestDeleteConfirmation(record.pair)) {
          await deleteStoreData('BacktestingJournal', record.id);
          await applyAccountTradeChange(record, null);
          AppState.refreshCache();
          showTradeDeletedNotification();
        }
      }
    });
  });

  tbody.querySelectorAll('.table-img-thumbnail').forEach(img => {
    img.addEventListener('click', () => {
      const id = Number(img.dataset.id);
      const record = filtered.find(r => r.id === id);
      if (record) openBacktestDetailsDrawer(record);
    });
  });
}

// Modal handling
export function openBacktestModal(record = null) {
  // Create overlay modal if not exists
  let modal = document.getElementById('backtest-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'backtest-modal';
    modal.className = 'modal-overlay';
    document.body.appendChild(modal);
  }

  const isEdit = record && record.id !== undefined;
  const isDuplicate = record && record.id === undefined;

  modal.innerHTML = `
    <div class="modal-container" style="max-width: 750px;">
      <div class="modal-header">
        <h3>${isEdit ? 'Edit Backtesting Record' : (isDuplicate ? 'Duplicate Backtest' : 'Log New Backtest')}</h3>
        <button class="modal-close" id="close-backtest-modal-btn">&times;</button>
      </div>
      <form id="backtest-form">
        <div class="modal-body" style="max-height: 75vh; overflow-y: auto; padding: 20px;">
          
          <input type="hidden" id="backtest-id" value="${isEdit ? record.id : ''}">

          <!-- Section 1: General Info -->
          <h4 class="modal-section-title">General Information</h4>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="back-date">Date</label>
              <input type="date" id="back-date" class="form-control" required value="${record?.date || new Date().toISOString().split('T')[0]}">
            </div>
            <div class="form-group">
              <label class="form-label" for="back-session">Session</label>
              <select id="back-session" class="form-control">
                <option value="Asia" ${record?.session === 'Asia' ? 'selected' : ''}>Asia</option>
                <option value="London" ${record?.session === 'London' || !record ? 'selected' : ''}>London</option>
                <option value="New York" ${record?.session === 'New York' ? 'selected' : ''}>New York</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label" for="back-account-type">Account Type</label>
              <select id="back-account-type" class="form-control">
                ${getPortfolioAccounts().map(account => `<option value="${account.name}" ${record?.accountType === account.name || (!record && account.name === 'Challenge') ? 'selected' : ''}>${account.name}</option>`).join('')}
              </select>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="back-pair">Pair</label>
              <input type="text" id="back-pair" class="form-control" placeholder="e.g. EURUSD" required value="${record?.pair || ''}">
            </div>
            <div class="form-group">
              <label class="form-label" for="back-direction">Buy / Sell</label>
              <select id="back-direction" class="form-control">
                <option value="Buy" ${record?.direction === 'Buy' ? 'selected' : ''}>Buy</option>
                <option value="Sell" ${record?.direction === 'Sell' ? 'selected' : ''}>Sell</option>
              </select>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="back-timeframe">Timeframe</label>
              <select id="back-timeframe" class="form-control">
                <option value="M1" ${record?.timeframe === 'M1' ? 'selected' : ''}>M1</option>
                <option value="M5" ${record?.timeframe === 'M5' ? 'selected' : ''}>M5</option>
                <option value="M15" ${record?.timeframe === 'M15' || !record ? 'selected' : ''}>M15</option>
                <option value="M30" ${record?.timeframe === 'M30' ? 'selected' : ''}>M30</option>
                <option value="H1" ${record?.timeframe === 'H1' ? 'selected' : ''}>H1</option>
                <option value="H4" ${record?.timeframe === 'H4' ? 'selected' : ''}>H4</option>
                <option value="D1" ${record?.timeframe === 'D1' ? 'selected' : ''}>D1</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label" for="back-strategy">Strategy</label>
              <input type="text" id="back-strategy" class="form-control" value="${record?.strategy || ''}" placeholder="Strategy name">
            </div>
            <div class="form-group">
              <label class="form-label" for="back-setup">Setup</label>
              <input type="text" id="back-setup" class="form-control" value="${record?.setup || ''}" placeholder="Setup name">
            </div>
          </div>

          <!-- Section 2: Risk Management -->
          <h4 class="modal-section-title">Risk Management</h4>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="back-risk">Risk %</label>
              <input type="number" id="back-risk" step="0.1" class="form-control" placeholder="1.0" value="${record?.risk_percent ?? 1.0}">
            </div>
            <div class="form-group">
              <label class="form-label" for="back-target-rr">Target RR</label>
              <input type="number" id="back-target-rr" step="0.01" class="form-control" placeholder="e.g. 3.0" value="${record?.target_rr || ''}" required>
            </div>
            <div class="form-group">
              <label class="form-label" for="back-pl">P/L</label>
              <input type="number" id="back-pl" step="0.01" class="form-control" placeholder="e.g. 150.00" value="${record?.pl_money ?? ''}">
            </div>
          </div>

          <!-- Section 3: Trade Result -->
          <h4 class="modal-section-title">Trade Outcome</h4>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="back-result">Result</label>
              <select id="back-result" class="form-control">
                <option value="Win" ${record?.result === 'Win' ? 'selected' : ''}>Win</option>
                <option value="Loss" ${record?.result === 'Loss' ? 'selected' : ''}>Loss</option>
                <option value="Break Even" ${record?.result === 'Break Even' ? 'selected' : ''}>Break Even</option>
              </select>
            </div>
          </div>

          <!-- Section 4: Lessons -->
          <h4 class="modal-section-title">Lessons & Notes</h4>
          <div class="form-group">
            <label class="form-label" for="back-lessons">Lesson Learned</label>
            <textarea id="back-lessons" rows="3" class="form-control" placeholder="What did this trade teach you?">${record?.lesson_learned || ''}</textarea>
          </div>

          <!-- Section 5: Drag and Drop Screenshots -->
          <h4 class="modal-section-title">Screenshots</h4>
          <div class="screenshot-dropzone-grid">
            <div class="form-group">
              <label class="form-label">Before Screenshot</label>
              <div class="screenshot-dropzone" id="dropzone-before">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                <span>Drag & Drop or Click to Upload</span>
              </div>
              <div class="screenshot-preview-container" id="preview-before" style="display: ${record?.before_image ? 'block' : 'none'};">
                ${record?.before_image ? `<img src="${record.before_image}"><button type="button" class="screenshot-remove-btn" id="rm-btn-before">&times;</button>` : ''}
              </div>
              <label class="form-label" for="back-before-link" style="margin-top: 10px;">Paste Image Link</label>
              <input type="url" id="back-before-link" class="form-control" placeholder="Paste image link here..." value="${record?.before_image && !String(record.before_image).startsWith('data:') ? record.before_image : ''}">
              <input type="hidden" id="back-before-img" value="${record?.before_image || ''}">
            </div>

            <div class="form-group">
              <label class="form-label">After Screenshot</label>
              <div class="screenshot-dropzone" id="dropzone-after">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                <span>Drag & Drop or Click to Upload</span>
              </div>
              <div class="screenshot-preview-container" id="preview-after" style="display: ${record?.after_image ? 'block' : 'none'};">
                ${record?.after_image ? `<img src="${record.after_image}"><button type="button" class="screenshot-remove-btn" id="rm-btn-after">&times;</button>` : ''}
              </div>
              <label class="form-label" for="back-after-link" style="margin-top: 10px;">Paste Image Link</label>
              <input type="url" id="back-after-link" class="form-control" placeholder="Paste image link here..." value="${record?.after_image && !String(record.after_image).startsWith('data:') ? record.after_image : ''}">
              <input type="hidden" id="back-after-img" value="${record?.after_image || ''}">
            </div>
          </div>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" id="cancel-backtest-modal-btn">Cancel</button>
          <button type="submit" class="btn btn-primary">Save Backtest</button>
        </div>
      </form>
    </div>
  `;

  modal.classList.add('active');

  // Input elements
  const directionSelect = document.getElementById('back-direction');
  const targetRRInput = document.getElementById('back-target-rr');
  const resultSelect = document.getElementById('back-result');
  const form = document.getElementById('backtest-form');
  const submitButton = form?.querySelector('button[type="submit"]');
  if (submitButton) submitButton.textContent = 'Save Backtest';

  // Modal closers
  const closeModal = () => modal.classList.remove('active');
  document.getElementById('close-backtest-modal-btn').addEventListener('click', closeModal);
  document.getElementById('cancel-backtest-modal-btn').addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

  // Screenshot Dropzones
  setupDropzoneLogic('dropzone-before', 'preview-before', 'back-before-img', 'rm-btn-before', 'back-before-link');
  setupDropzoneLogic('dropzone-after', 'preview-after', 'back-after-img', 'rm-btn-after', 'back-after-link');

  // Form submission
  document.getElementById('backtest-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('backtest-id').value;
    const previousTrade = id ? AppState.backtestTrades.find(trade => trade.id === Number(id)) : null;
    const dateStr = document.getElementById('back-date').value;

    const targetRRValue = parseFloat(targetRRInput.value) || 0.0;
    const resultValue = resultSelect.value;

    let calculatedActualRR = 0.0;
    if (resultValue === 'Win') {
      calculatedActualRR = targetRRValue;
    } else if (resultValue === 'Loss') {
      calculatedActualRR = -1.0;
    } else if (resultValue === 'Break Even') {
      calculatedActualRR = 0.0;
    }

    const enteredPL = parseFloat(document.getElementById('back-pl').value) || 0;
    const normalizedPL = resultValue === 'Loss'
      ? -Math.abs(enteredPL)
      : resultValue === 'Win'
        ? Math.abs(enteredPL)
        : enteredPL;

    const backtestData = {
      user_id: AppState.user.email,
      date: dateStr,
      session: document.getElementById('back-session').value,
      accountType: document.getElementById('back-account-type').value,
      pair: document.getElementById('back-pair').value.trim().toUpperCase(),
      direction: directionSelect.value,
      timeframe: document.getElementById('back-timeframe').value,
      strategy: document.getElementById('back-strategy').value.trim() || null,
      setup: document.getElementById('back-setup').value.trim() || null,
      risk_percent: parseFloat(document.getElementById('back-risk').value || 1.0),
      target_rr: targetRRValue,
      pl_money: normalizedPL,
      actual_rr: calculatedActualRR,
      result: resultValue,
      lesson_learned: document.getElementById('back-lessons').value.trim() || null,
      before_image: document.getElementById('back-before-img').value || null,
      after_image: document.getElementById('back-after-img').value || null,
      updated_at: new Date().toISOString()
    };

    if (id) {
      backtestData.id = Number(id);
      backtestData.created_at = record.created_at || new Date().toISOString();
      await updateStoreData('BacktestingJournal', backtestData);
    } else {
      backtestData.created_at = new Date().toISOString();
      await addStoreData('BacktestingJournal', backtestData);
    }

    await applyAccountTradeChange(previousTrade, backtestData);

    closeModal();
    AppState.refreshCache();
    showTradeSavedNotification('Backtest trade saved successfully');
  });
}

function setupDropzoneLogic(dropzoneId, previewId, hiddenInputId, removeBtnId, linkInputId) {
  const dropzone = document.getElementById(dropzoneId);
  const preview = document.getElementById(previewId);
  const hiddenInput = document.getElementById(hiddenInputId);
  const linkInput = document.getElementById(linkInputId);

  const renderPreview = (value) => {
    if (!value) {
      preview.innerHTML = '';
      preview.style.display = 'none';
      return;
    }
    preview.style.display = 'block';
    preview.innerHTML = `<img src="${value}" alt="Screenshot preview"><button type="button" class="screenshot-remove-btn" id="${removeBtnId}">&times;</button>`;
    document.getElementById(removeBtnId).addEventListener('click', (event) => {
      event.stopPropagation();
      hiddenInput.value = '';
      if (linkInput) linkInput.value = '';
      renderPreview('');
    });
  };
  
  // Invisible file input
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';
  fileInput.style.display = 'none';
  document.body.appendChild(fileInput);

  const processFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      hiddenInput.value = dataUrl;
      if (linkInput) linkInput.value = '';
      renderPreview(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  dropzone.addEventListener('click', () => fileInput.click());

  dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.style.borderColor = 'var(--accent-color)';
    dropzone.style.background = 'rgba(59, 130, 246, 0.05)';
  });

  dropzone.addEventListener('dragleave', () => {
    dropzone.style.borderColor = 'var(--border-color)';
    dropzone.style.background = 'transparent';
  });

  dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.style.borderColor = 'var(--border-color)';
    dropzone.style.background = 'transparent';
    if (e.dataTransfer.files.length) {
      processFile(e.dataTransfer.files[0]);
    }
  });

  fileInput.addEventListener('change', () => {
    if (fileInput.files.length) {
      processFile(fileInput.files[0]);
    }
  });

  linkInput?.addEventListener('input', () => {
    const value = linkInput.value.trim();
    hiddenInput.value = value;
    renderPreview(value);
  });

  // Bind existing remove button if it is rendered
  const existingRemoveBtn = document.getElementById(removeBtnId);
  if (existingRemoveBtn) {
    existingRemoveBtn.addEventListener('click', (ev) => {
      ev.stopPropagation();
      hiddenInput.value = '';
      if (linkInput) linkInput.value = '';
      renderPreview('');
    });
  }
}

// sliding Details Drawer
function openBacktestDetailsDrawer(trade) {
  // Setup drawer DOM components if needed
  let overlay = document.getElementById('trade-drawer-overlay');
  let drawer = document.getElementById('trade-drawer-container');

  if (!overlay || !drawer) return;

  const typeBadge = trade.direction === 'Buy' ? 'badge-buy' : 'badge-sell';
  const resBadge = trade.result === 'Win' ? 'badge-win' : (trade.result === 'Loss' ? 'badge-loss' : 'badge-be');
  const pnlMultiple = trade.result === 'Win' ? `+${trade.actual_rr}R` : (trade.result === 'Loss' ? `-${Math.abs(trade.actual_rr)}R` : '0.00R');

  drawer.innerHTML = `
    <div class="drawer-header">
      <div style="display: flex; align-items: center; gap: 12px;">
        <span class="badge ${typeBadge}">${trade.direction}</span>
        <h3 style="font-size: 20px; font-weight: 700; font-family: var(--font-heading);">${trade.pair} (${trade.timeframe || 'N/A'})</h3>
      </div>
      <button class="modal-close" id="close-drawer-btn" style="padding: 6px;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    
    <div class="drawer-body" style="padding-bottom: 80px;">
      
      <!-- Parameters Grid -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px;">
        <div class="card" style="padding: 14px; background: var(--bg-tertiary);">
          <span style="font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Result</span>
          <div style="margin-top: 6px; display: flex; align-items: center; gap: 8px;">
            <span class="badge ${resBadge}">${trade.result}</span>
            <span style="font-weight: 700; color: ${trade.result === 'Win' ? 'var(--color-win)' : (trade.result === 'Loss' ? 'var(--color-loss)' : 'var(--color-be)')}">${pnlMultiple}</span>
          </div>
        </div>
        <div class="card" style="padding: 14px; background: var(--bg-tertiary);">
          <span style="font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Session</span>
          <div style="margin-top: 6px; font-weight: 600; font-size: 14px;">${trade.session}</div>
        </div>
      </div>

      <!-- Detailed Metrics List -->
      <div class="card" style="margin-bottom: 24px; padding: 18px;">
        <h4 style="font-size: 13px; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 12px; letter-spacing: 0.05em;">Execution Specs</h4>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <div style="display: flex; justify-content: space-between; font-size: 13px;"><span style="color: var(--text-secondary);">Entry Price</span><span style="font-weight: 600; color: var(--text-primary);">${trade.entry_price || 'N/A'}</span></div>
          <div style="display: flex; justify-content: space-between; font-size: 13px;"><span style="color: var(--text-secondary);">Stop Loss</span><span style="font-weight: 600; color: var(--text-primary);">${trade.stop_loss || 'N/A'}</span></div>
          <div style="display: flex; justify-content: space-between; font-size: 13px;"><span style="color: var(--text-secondary);">Take Profit</span><span style="font-weight: 600; color: var(--text-primary);">${trade.take_profit || 'N/A'}</span></div>
          <div style="display: flex; justify-content: space-between; font-size: 13px;"><span style="color: var(--text-secondary);">Risk Percentage</span><span style="font-weight: 600; color: var(--text-primary);">${trade.risk_percent}%</span></div>
          <div style="display: flex; justify-content: space-between; font-size: 13px;"><span style="color: var(--text-secondary);">P/L</span><span style="font-weight: 600; color: ${Number(trade.pl_money || 0) >= 0 ? 'var(--color-win)' : 'var(--color-loss)'}">${trade.pl_money ?? 'N/A'}</span></div>
          <div style="display: flex; justify-content: space-between; font-size: 13px;"><span style="color: var(--text-secondary);">Target R:R</span><span style="font-weight: 600; color: var(--text-primary);">${trade.target_rr}:1</span></div>
          <div style="display: flex; justify-content: space-between; font-size: 13px;"><span style="color: var(--text-secondary);">Actual R:R Realized</span><span style="font-weight: 600; color: var(--text-primary);">${trade.actual_rr}:1</span></div>
        </div>
      </div>

      <!-- Strategy & Timeframe -->
      <div class="card" style="margin-bottom: 24px; padding: 18px;">
        <h4 style="font-size: 13px; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 12px; letter-spacing: 0.05em;">Strategy & Timeframe</h4>
        <div style="display: flex; justify-content: space-between; font-size: 13px;"><span style="color: var(--text-secondary);">Strategy</span><span style="font-weight: 600; color: var(--text-primary);">${trade.strategy || 'N/A'}</span></div>
        <div style="display: flex; justify-content: space-between; font-size: 13px; margin-top: 8px;"><span style="color: var(--text-secondary);">Timeframe</span><span style="font-weight: 600; color: var(--text-primary);">${trade.timeframe || 'N/A'}</span></div>
      </div>

      <!-- Psychology & Lessons -->
      <div class="card" style="margin-bottom: 24px; padding: 18px;">
        <h4 style="font-size: 13px; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 12px; letter-spacing: 0.05em;">Lessons & Notes</h4>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <div>
            <div style="font-size: 11px; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Lesson Learned</div>
            <div style="font-size: 13px; color: var(--text-secondary); line-height: 1.4; font-weight: 500;">${trade.lesson_learned || 'No lessons recorded.'}</div>
          </div>
          <div style="margin-top: 8px;">
            <div style="font-size: 11px; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Notes</div>
            <div style="font-size: 13px; color: var(--text-secondary); line-height: 1.4;">${trade.notes || 'No extra notes logged.'}</div>
          </div>
        </div>
      </div>

      <!-- Screenshot Comparison Slider -->
      <div class="card" style="margin-bottom: 24px; padding: 18px;">
        <h4 style="font-size: 13px; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 12px; letter-spacing: 0.05em;">Chart Comparison</h4>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <div>
            <div style="font-size: 11px; color: var(--text-muted); margin-bottom: 6px; font-weight: 700; text-transform: uppercase;">Before Setup</div>
            <div style="border-radius: var(--border-radius-md); overflow: hidden; border: 1px solid var(--border-color); aspect-ratio: 16/9; background: #000;">
              ${trade.before_image ? `<img src="${trade.before_image}" style="width:100%; height:100%; object-fit:contain; cursor:pointer;" class="drawer-comp-img">` : `<div style="display:flex; align-items:center; justify-content:center; height:100%; color:var(--text-muted); font-size:12px;">No before image</div>`}
            </div>
          </div>
          <div>
            <div style="font-size: 11px; color: var(--text-muted); margin-bottom: 6px; font-weight: 700; text-transform: uppercase;">After Outcome</div>
            <div style="border-radius: var(--border-radius-md); overflow: hidden; border: 1px solid var(--border-color); aspect-ratio: 16/9; background: #000;">
              ${trade.after_image ? `<img src="${trade.after_image}" style="width:100%; height:100%; object-fit:contain; cursor:pointer;" class="drawer-comp-img">` : `<div style="display:flex; align-items:center; justify-content:center; height:100%; color:var(--text-muted); font-size:12px;">No after image</div>`}
            </div>
          </div>
        </div>
      </div>

      <!-- Drawer Control Buttons -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px;">
        <button class="btn btn-danger" id="delete-drawer-backtest-btn">Delete</button>
        <button class="btn btn-primary" id="edit-drawer-backtest-btn">Edit</button>
      </div>

    </div>
  `;

  overlay.classList.add('active');
  drawer.classList.add('active');

  const closeDrawer = () => {
    overlay.classList.remove('active');
    drawer.classList.remove('active');
  };

  document.getElementById('close-drawer-btn').addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);

  document.getElementById('delete-drawer-backtest-btn').addEventListener('click', async () => {
    if (await requestBacktestDeleteConfirmation(trade.pair)) {
      await deleteStoreData('BacktestingJournal', trade.id);
      await applyAccountTradeChange(trade, null);
      closeDrawer();
      AppState.refreshCache();
      showTradeDeletedNotification();
    }
  });

  document.getElementById('edit-drawer-backtest-btn').addEventListener('click', () => {
    closeDrawer();
    openBacktestModal(trade);
  });

  drawer.querySelectorAll('.drawer-comp-img').forEach(img => {
    img.addEventListener('click', () => {
      openBacktestFullscreenLightbox(trade);
    });
  });
}

function requestBacktestDeleteConfirmation(pair = '') {
  return new Promise(resolve => {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay active delete-confirmation-overlay';
    overlay.innerHTML = `
      <div class="modal-container delete-confirmation-modal" role="dialog" aria-modal="true" aria-labelledby="delete-confirmation-title">
        <div class="delete-confirmation-icon">!</div>
        <div class="delete-confirmation-content">
          <div class="modal-kicker">Permanent action</div>
          <h3 id="delete-confirmation-title">Delete Backtest Trade?</h3>
          <p>This will permanently remove <strong>${pair || 'this record'}</strong> from your backtesting journal.</p>
        </div>
        <div class="delete-confirmation-actions">
          <button type="button" class="btn btn-secondary" id="cancel-delete-confirmation">Cancel</button>
          <button type="button" class="btn btn-danger" id="confirm-delete-confirmation">Delete Trade</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
    let keyHandler;
    const finish = value => {
      if (keyHandler) document.removeEventListener('keydown', keyHandler);
      overlay.remove();
      resolve(value);
    };
    overlay.querySelector('#cancel-delete-confirmation').addEventListener('click', () => finish(false));
    overlay.querySelector('#confirm-delete-confirmation').addEventListener('click', () => finish(true));
    overlay.addEventListener('click', event => {
      if (event.target === overlay) finish(false);
    });
    keyHandler = function onKeydown(event) {
      if (event.key === 'Escape') {
        finish(false);
      }
    };
    document.addEventListener('keydown', keyHandler);
  });
}

// Fullscreen lightbox compare slider
function openBacktestFullscreenLightbox(trade) {
  const viewerModal = document.createElement('div');
  viewerModal.className = 'modal-overlay active';
  viewerModal.style.zIndex = '2000';
  
  viewerModal.innerHTML = `
    <div class="modal-container" style="max-width: 900px; padding:0; background: #000; border-color: rgba(255,255,255,0.1);">
      <div class="modal-header" style="background:#0f131a; border-bottom:1px solid rgba(255,255,255,0.1)">
        <h3>Before & After Comparison: ${trade.pair}</h3>
        <button class="modal-close" id="close-lightbox-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <div style="padding:20px; display:flex; flex-direction:column; gap:16px;">
        <div class="slider-overlay-body">
          <div class="comparison-slider-container" id="backtest-slider-container">
            <img src="${trade.before_image || ''}" class="slider-image slider-image-before">
            <div class="slider-image-after" id="backtest-slider-after-container">
              <img src="${trade.after_image || ''}" class="slider-image" style="width: 800px; max-width: none;">
            </div>
            <div class="slider-handle" id="backtest-slider-handle">
              <div class="slider-handle-button">↔</div>
            </div>
            <span class="slider-label slider-label-before">BEFORE (SETUP)</span>
            <span class="slider-label slider-label-after">AFTER (OUTCOME)</span>
          </div>
        </div>
        <div style="color: #94a3b8; font-size:13px; text-align:center;">
          Drag the center handle left/right to compare trade execution setup with the actual outcome.
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(viewerModal);

  const closeViewer = () => {
    viewerModal.classList.remove('active');
    setTimeout(() => viewerModal.remove(), 250);
  };
  viewerModal.querySelector('#close-lightbox-btn').addEventListener('click', closeViewer);
  viewerModal.addEventListener('click', (e) => { if (e.target === viewerModal) closeViewer(); });

  const container = viewerModal.querySelector('#backtest-slider-container');
  const afterContainer = viewerModal.querySelector('#backtest-slider-after-container');
  const handle = viewerModal.querySelector('#backtest-slider-handle');
  const afterImage = afterContainer.querySelector('img');

  let isDragging = false;

  const updateSlider = (clientX) => {
    const rect = container.getBoundingClientRect();
    let position = clientX - rect.left;
    if (position < 0) position = 0;
    if (position > rect.width) position = rect.width;

    const percentage = (position / rect.width) * 100;
    afterContainer.style.width = `${percentage}%`;
    handle.style.left = `${percentage}%`;
    afterImage.style.width = `${rect.width}px`;
  };

  setTimeout(() => {
    const rect = container.getBoundingClientRect();
    afterImage.style.width = `${rect.width}px`;
  }, 100);

  handle.addEventListener('mousedown', () => isDragging = true);
  window.addEventListener('mouseup', () => isDragging = false);
  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    updateSlider(e.clientX);
  });

  handle.addEventListener('touchstart', () => isDragging = true);
  window.addEventListener('touchend', () => isDragging = false);
  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    updateSlider(e.touches[0].clientX);
  });
}

// Inject Component specific styles
function injectBacktestingStyles() {
  if (document.getElementById('backtest-custom-styles')) return;

  const style = document.createElement('style');
  style.id = 'backtest-custom-styles';
  style.innerHTML = `
    .filter-label-text {
      font-size: 11px;
      font-weight: 700;
      color: var(--text-muted);
      text-transform: uppercase;
    }
    .table-img-thumbnail {
      width: 48px;
      height: 28px;
      object-fit: cover;
      border-radius: 4px;
      border: 1px solid var(--border-color);
      cursor: pointer;
      transition: transform var(--transition-fast), border-color var(--transition-fast);
      background: #000;
    }
    .table-img-thumbnail:hover {
      transform: scale(1.1);
      border-color: var(--accent-color);
    }
    .lesson-text-column {
      color: var(--text-secondary);
      max-width: 160px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 13px;
    }
    .modal-section-title {
      font-size: 12px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--accent-color);
      margin: 18px 0 10px 0;
      border-bottom: 1px solid var(--border-color);
      padding-bottom: 6px;
    }
    .screenshot-dropzone-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-top: 10px;
    }
    @media (max-width: 600px) {
      .screenshot-dropzone-grid {
        grid-template-columns: 1fr;
      }
    }
    .screenshot-dropzone {
      border: 2px dashed var(--border-color);
      border-radius: var(--border-radius-md);
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 8px;
      cursor: pointer;
      color: var(--text-muted);
      font-size: 12px;
      font-weight: 600;
      transition: all var(--transition-normal);
      text-align: center;
      min-height: 100px;
    }
    .screenshot-dropzone:hover {
      border-color: var(--accent-color);
      color: var(--text-primary);
      background: rgba(59, 130, 246, 0.02);
    }
    .screenshot-dropzone svg {
      width: 24px;
      height: 24px;
      stroke: var(--text-muted);
    }
    .screenshot-preview-container {
      position: relative;
      margin-top: 10px;
      border-radius: var(--border-radius-md);
      overflow: hidden;
      border: 1px solid var(--border-color);
      aspect-ratio: 16/9;
      background: #000;
    }
    .screenshot-preview-container img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    .screenshot-remove-btn {
      position: absolute;
      top: 8px;
      right: 8px;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: rgba(239, 68, 68, 0.9);
      color: #fff;
      border: none;
      font-size: 16px;
      font-weight: 700;
      line-height: 1;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background var(--transition-fast);
      z-index: 10;
    }
    .screenshot-remove-btn:hover {
      background: var(--color-loss-hover);
    }
  `;
  document.head.appendChild(style);
}

// EXPORT TO CSV
function exportToCSV(data) {
  if (data.length === 0) {
    alert('No data available to export.');
    return;
  }
  const headers = ['Date', 'Session', 'Pair', 'Direction', 'Strategy', 'Timeframe', 'Entry Price', 'Stop Loss', 'Take Profit', 'Risk %', 'Target R:R', 'Actual R:R', 'Result', 'Lesson Learned', 'Notes'];
  const rows = data.map(t => [
    t.date,
    t.session,
    t.pair,
    t.direction,
    `"${(t.strategy || '').replace(/"/g, '""')}"`,
    t.timeframe || '',
    t.entry_price,
    t.stop_loss,
    t.take_profit,
    t.risk_percent,
    t.target_rr,
    t.actual_rr,
    t.result,
    `"${(t.lesson_learned || '').replace(/"/g, '""')}"`,
    `"${(t.notes || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `trademaster_backtests_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// EXPORT TO EXCEL
function exportToExcel(data) {
  if (data.length === 0) {
    alert('No data available to export.');
    return;
  }
  let tabText = '<table border="1" style="font-family: sans-serif; border-collapse: collapse;">';
  tabText += '<tr style="background-color: #3b82f6; color: #ffffff; font-weight: bold;">';
  tabText += '<td>Date</td><td>Session</td><td>Pair</td><td>Direction</td><td>Strategy</td><td>Timeframe</td><td>Entry Price</td><td>Stop Loss</td><td>Take Profit</td><td>Risk %</td><td>Target RR</td><td>Actual RR</td><td>Result</td><td>Lesson Learned</td><td>Notes</td>';
  tabText += '</tr>';

  data.forEach(t => {
    tabText += `<tr>
      <td>${t.date}</td>
      <td>${t.session}</td>
      <td>${t.pair}</td>
      <td>${t.direction}</td>
      <td>${t.strategy || ''}</td>
      <td>${t.timeframe || ''}</td>
      <td>${t.entry_price}</td>
      <td>${t.stop_loss}</td>
      <td>${t.take_profit}</td>
      <td>${t.risk_percent}</td>
      <td>${t.target_rr}</td>
      <td>${t.actual_rr}</td>
      <td>${t.result}</td>
      <td>${t.lesson_learned || ''}</td>
      <td>${t.notes || ''}</td>
    </tr>`;
  });
  tabText += '</table>';

  const blob = new Blob([tabText], { type: 'application/vnd.ms-excel' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `trademaster_backtests_${new Date().toISOString().split('T')[0]}.xls`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// EXPORT TO PDF (Clean styled window for printing)
function exportToPDF(data) {
  if (data.length === 0) {
    alert('No data available to export.');
    return;
  }
  const printWindow = window.open('', '_blank', 'width=900,height=700');
  
  let html = `
    <html>
      <head>
        <title>TradeMaster Backtesting Report</title>
        <style>
          body { font-family: 'Outfit', sans-serif; background-color: #ffffff; color: #0f172a; padding: 30px; }
          h2 { color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 8px; margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 12px; }
          th, td { border: 1px solid #cbd5e1; padding: 10px; text-align: left; }
          th { background-color: #f1f5f9; font-weight: bold; color: #1e293b; }
          tr:nth-child(even) { background-color: #f8fafc; }
          .badge { padding: 3px 8px; border-radius: 12px; font-size: 10px; font-weight: bold; text-transform: uppercase; display: inline-block; }
          .badge-win { background-color: #d1fae5; color: #065f46; }
          .badge-loss { background-color: #fee2e2; color: #991b1b; }
          .badge-be { background-color: #fef3c7; color: #92400e; }
          .badge-buy { background-color: #dbeafe; color: #1e40af; }
          .badge-sell { background-color: #fce7f3; color: #9d174d; }
          .summary-card { display: inline-block; padding: 12px 20px; background-color: #f1f5f9; border-radius: 8px; margin-right: 15px; margin-bottom: 20px; border: 1px solid #e2e8f0; }
          .summary-card-val { font-size: 18px; font-weight: bold; color: #2563eb; }
          .summary-card-lbl { font-size: 10px; text-transform: uppercase; color: #64748b; font-weight: bold; }
        </style>
      </head>
      <body>
        <h2>TradeMaster Backtesting Analytics Report</h2>
        <div style="margin-bottom: 10px;">
          <div class="summary-card"><div class="summary-card-val">${data.length}</div><div class="summary-card-lbl">Total Backtests</div></div>
          <div class="summary-card"><div class="summary-card-val">${((data.filter(t => t.result === 'Win').length / data.length) * 100).toFixed(1)}%</div><div class="summary-card-lbl">Win Rate</div></div>
          <div class="summary-card"><div class="summary-card-val">${(data.reduce((acc, curr) => acc + (curr.actual_rr || 0), 0)).toFixed(2)} R</div><div class="summary-card-lbl">Realized R</div></div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Session</th>
              <th>Pair</th>
              <th>Direction</th>
              <th>Strategy</th>
              <th>TF</th>
              <th>Risk %</th>
              <th>Target RR</th>
              <th>Actual RR</th>
              <th>Result</th>
              <th>Lesson Learned</th>
            </tr>
          </thead>
          <tbody>
  `;

  data.forEach(t => {
    const resClass = t.result === 'Win' ? 'badge-win' : (t.result === 'Loss' ? 'badge-loss' : 'badge-be');
    const dirClass = t.direction === 'Buy' ? 'badge-buy' : 'badge-sell';
    html += `
      <tr>
        <td>${t.date}</td>
        <td>${t.session}</td>
        <td>${t.pair}</td>
        <td><span class="badge ${dirClass}">${t.direction}</span></td>
        <td>${t.strategy || ''}</td>
        <td>${t.timeframe || ''}</td>
        <td>${t.risk_percent}%</td>
        <td>${t.target_rr}:1</td>
        <td>${t.actual_rr}:1</td>
        <td><span class="badge ${resClass}">${t.result}</span></td>
        <td>${t.lesson_learned || ''}</td>
      </tr>
    `;
  });

  html += `
          </tbody>
        </table>
        <script>
          window.onload = function() {
            window.print();
            window.close();
          }
        </script>
      </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
}
