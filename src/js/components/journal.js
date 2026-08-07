import { AppState } from '../state.js';
import { deleteStoreData } from '../db.js';
import { openTradeModal } from '../main.js';

let activeFilters = {
  search: '',
  pair: 'All',
  session: 'All',
  result: 'All',
  strategy: 'All',
  sortBy: 'date-desc'
};

export function renderJournal(container, journalType = 'live') {
  const trades = journalType === 'live' ? AppState.tradingTrades : AppState.backtestTrades;
  const storeName = journalType === 'live' ? 'TradingJournal' : 'BacktestingJournal';

  // Extract unique pairs and strategies for filter dropdowns
  const uniquePairs = ['All', ...new Set(trades.map(t => t.pair))];
  const uniqueStrategies = ['All', ...new Set(trades.map(t => t.strategy).filter(Boolean))];

  // Render Layout Structure
  container.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 24px;">
      
      <!-- Filters and Header Controls -->
      <div class="card" style="padding: 18px;">
        <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center; justify-content: space-between;">
          
          <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center; flex: 1;">
            <!-- Filter Pair -->
            <div style="display: flex; flex-direction: column; gap: 4px;">
              <span style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Pair</span>
              <select id="filter-pair" class="form-control" style="padding: 8px 12px; font-size: 13px; width: 110px; height: 36px;">
                ${uniquePairs.map(p => `<option value="${p}" ${activeFilters.pair === p ? 'selected' : ''}>${p}</option>`).join('')}
              </select>
            </div>

            <!-- Filter Session -->
            <div style="display: flex; flex-direction: column; gap: 4px;">
              <span style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Session</span>
              <select id="filter-session" class="form-control" style="padding: 8px 12px; font-size: 13px; width: 120px; height: 36px;">
                <option value="All" ${activeFilters.session === 'All' ? 'selected' : ''}>All Sessions</option>
                <option value="Asia" ${activeFilters.session === 'Asia' ? 'selected' : ''}>Asia</option>
                <option value="London" ${activeFilters.session === 'London' ? 'selected' : ''}>London</option>
                <option value="New York" ${activeFilters.session === 'New York' ? 'selected' : ''}>New York</option>
              </select>
            </div>

            <!-- Filter Result -->
            <div style="display: flex; flex-direction: column; gap: 4px;">
              <span style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Result</span>
              <select id="filter-result" class="form-control" style="padding: 8px 12px; font-size: 13px; width: 120px; height: 36px;">
                <option value="All" ${activeFilters.result === 'All' ? 'selected' : ''}>All Outcomes</option>
                <option value="Win" ${activeFilters.result === 'Win' ? 'selected' : ''}>Wins</option>
                <option value="Loss" ${activeFilters.result === 'Loss' ? 'selected' : ''}>Losses</option>
                <option value="Break Even" ${activeFilters.result === 'Break Even' ? 'selected' : ''}>Break Evens</option>
              </select>
            </div>

            <!-- Filter Strategy -->
            <div style="display: flex; flex-direction: column; gap: 4px;">
              <span style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Strategy</span>
              <select id="filter-strategy" class="form-control" style="padding: 8px 12px; font-size: 13px; width: 140px; height: 36px;">
                ${uniqueStrategies.map(s => `<option value="${s}" ${activeFilters.strategy === s ? 'selected' : ''}>${s}</option>`).join('')}
              </select>
            </div>

            <!-- Sort By -->
            <div style="display: flex; flex-direction: column; gap: 4px;">
              <span style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Sort By</span>
              <select id="filter-sort" class="form-control" style="padding: 8px 12px; font-size: 13px; width: 140px; height: 36px;">
                <option value="date-desc" ${activeFilters.sortBy === 'date-desc' ? 'selected' : ''}>Newest First</option>
                <option value="date-asc" ${activeFilters.sortBy === 'date-asc' ? 'selected' : ''}>Oldest First</option>
                <option value="rr-desc" ${activeFilters.sortBy === 'rr-desc' ? 'selected' : ''}>Highest R:R</option>
                <option value="rr-asc" ${activeFilters.sortBy === 'rr-asc' ? 'selected' : ''}>Lowest R:R</option>
              </select>
            </div>
          </div>

          <div style="display: flex; gap: 8px; margin-top: auto;">
            <button class="btn btn-secondary" id="clear-filters-btn" style="height: 36px; padding: 0 14px;">Reset</button>
            <button class="btn btn-primary" id="add-trade-journal-btn" style="height: 36px; padding: 0 16px;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Add Record
            </button>
          </div>

        </div>
      </div>

      <!-- Table View -->
      <div class="card" style="padding: 0;">
        <div class="table-container">
          <table class="table">
            <thead>
              <tr>
                <th>Date / Day</th>
                <th>Pair</th>
                <th>Direction</th>
                <th>Session</th>
                <th>Result</th>
                <th>Target RR</th>
                <th>Risk %</th>
                <th>Strategy</th>
                <th>Setup</th>
              </tr>
            </thead>
            <tbody id="journal-table-body">
              <!-- Dynamically rendered -->
            </tbody>
          </table>
        </div>
      </div>

    </div>
  `;

  // Filter & Render logic
  function filterAndRenderTable() {
    let filteredTrades = [...trades];

    // 1. Text Search
    if (activeFilters.search) {
      const q = activeFilters.search;
      filteredTrades = filteredTrades.filter(t => 
        t.pair.toLowerCase().includes(q) ||
        (t.strategy && t.strategy.toLowerCase().includes(q)) ||
        t.session.toLowerCase().includes(q) ||
        t.result.toLowerCase().includes(q) ||
        t.date.includes(q) ||
        (t.labelA && t.labelA.toLowerCase().includes(q)) ||
        (t.labelB && t.labelB.toLowerCase().includes(q)) ||
        (t.notes && t.notes.toLowerCase().includes(q))
      );
    }

    // 2. Select Dropdowns
    if (activeFilters.pair !== 'All') {
      filteredTrades = filteredTrades.filter(t => t.pair === activeFilters.pair);
    }
    if (activeFilters.session !== 'All') {
      filteredTrades = filteredTrades.filter(t => t.session === activeFilters.session);
    }
    if (activeFilters.result !== 'All') {
      filteredTrades = filteredTrades.filter(t => t.result === activeFilters.result);
    }
    if (activeFilters.strategy !== 'All') {
      filteredTrades = filteredTrades.filter(t => t.strategy === activeFilters.strategy);
    }

    // 3. Sorting
    if (activeFilters.sortBy === 'date-desc') {
      filteredTrades.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (activeFilters.sortBy === 'date-asc') {
      filteredTrades.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (activeFilters.sortBy === 'rr-desc') {
      filteredTrades.sort((a, b) => b.rr - a.rr);
    } else if (activeFilters.sortBy === 'rr-asc') {
      filteredTrades.sort((a, b) => a.rr - b.rr);
    }

    // Render Table Rows
    const tbody = document.getElementById('journal-table-body');
    if (filteredTrades.length === 0) {
      tbody.innerHTML = `<tr><td colspan="11" style="text-align: center; padding: 48px; color: var(--text-muted);">No records found matching current criteria.</td></tr>`;
      return;
    }

    tbody.innerHTML = filteredTrades.map(t => {
      const rBadge = t.result === 'Win' ? 'badge-win' : (t.result === 'Loss' ? 'badge-loss' : 'badge-be');
      const dBadge = t.type === 'Buy' ? 'badge-buy' : 'badge-sell';
      return `
        <tr class="journal-row" data-id="${t.id}" style="cursor: pointer;">
          <td>
            <div style="font-weight: 600; color: var(--text-primary);">${t.date}</div>
            <div style="font-size: 11px; color: var(--text-muted);">${t.day}</div>
          </td>
          <td style="font-weight: 700; font-size: 15px;">${t.pair}</td>
          <td><span class="badge ${dBadge}">${t.type}</span></td>
          <td><span class="badge badge-session ${t.session.toLowerCase().replace(' ', '')}">${t.session}</span></td>
          <td><span class="badge ${rBadge}">${t.result}</span></td>
          <td style="font-weight: 600;">${t.rr}:1</td>
          <td>${t.riskPercent}%</td>
          <td>${t.strategy || 'N/A'}</td>
          <td style="color: var(--text-secondary); max-width: 150px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${t.setup || 'N/A'}</td>
          <td>${t.labelA || '—'}</td>
          <td>${t.labelB || '—'}</td>
        </tr>
      `;
    }).join('');

    // Bind click events on rows to open sliding Details Drawer
    document.querySelectorAll('.journal-row').forEach(row => {
      row.addEventListener('click', () => {
        const id = Number(row.dataset.id);
        const trade = trades.find(t => t.id === id);
        if (trade) {
          openDetailsDrawer(trade, storeName, journalType);
        }
      });
    });
  }

  // Hook global search custom event from header
  const onGlobalSearch = (e) => {
    activeFilters.search = e.detail;
    filterAndRenderTable();
  };
  window.addEventListener('globalSearch', onGlobalSearch);

  // Hook filter event listeners
  document.getElementById('filter-pair').addEventListener('change', (e) => {
    activeFilters.pair = e.target.value;
    filterAndRenderTable();
  });
  document.getElementById('filter-session').addEventListener('change', (e) => {
    activeFilters.session = e.target.value;
    filterAndRenderTable();
  });
  document.getElementById('filter-result').addEventListener('change', (e) => {
    activeFilters.result = e.target.value;
    filterAndRenderTable();
  });
  document.getElementById('filter-strategy').addEventListener('change', (e) => {
    activeFilters.strategy = e.target.value;
    filterAndRenderTable();
  });
  document.getElementById('filter-sort').addEventListener('change', (e) => {
    activeFilters.sortBy = e.target.value;
    filterAndRenderTable();
  });

  // Reset Filters
  document.getElementById('clear-filters-btn').addEventListener('click', () => {
    activeFilters = { search: '', pair: 'All', session: 'All', result: 'All', strategy: 'All', sortBy: 'date-desc' };
    const globalInput = document.getElementById('global-search');
    if (globalInput) globalInput.value = '';
    
    // Update DOM selects
    document.getElementById('filter-pair').value = 'All';
    document.getElementById('filter-session').value = 'All';
    document.getElementById('filter-result').value = 'All';
    document.getElementById('filter-strategy').value = 'All';
    document.getElementById('filter-sort').value = 'date-desc';

    filterAndRenderTable();
  });

  // Add Record Button
  document.getElementById('add-trade-journal-btn').addEventListener('click', () => {
    openTradeModal(null, journalType);
  });

  // Run initial render
  filterAndRenderTable();

  // Clean event listener on unmount
  return () => {
    window.removeEventListener('globalSearch', onGlobalSearch);
  };
}

// Slide open detailed view drawer
function openDetailsDrawer(trade, storeName, journalType) {
  const drawerOverlay = document.getElementById('trade-drawer-overlay');
  const drawer = document.getElementById('trade-drawer-container');

  const typeBadge = trade.type === 'Buy' ? 'badge-buy' : 'badge-sell';
  const resBadge = trade.result === 'Win' ? 'badge-win' : (trade.result === 'Loss' ? 'badge-loss' : 'badge-be');
  const pnlMultiple = trade.result === 'Win' ? `+${trade.rr}R` : (trade.result === 'Loss' ? '-1.00R' : '0.00R');
  
  // Render Drawer Content
  drawer.innerHTML = `
    <div class="drawer-header">
      <div style="display: flex; align-items: center; gap: 12px;">
        <span class="badge ${typeBadge}">${trade.type}</span>
        <h3 style="font-size: 20px; font-weight: 700; font-family: var(--font-heading);">${trade.pair}</h3>
      </div>
      <button class="modal-close" id="close-drawer-btn" style="padding: 6px;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    
    <div class="drawer-body">
      
      <!-- Parameters Grid -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px;">
        <div class="card" style="padding: 14px; background: var(--bg-tertiary);">
          <span style="font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Result Code</span>
          <div style="margin-top: 6px; display: flex; align-items: center; gap: 8px;">
            <span class="badge ${resBadge}">${trade.result}</span>
            <span style="font-weight: 700; color: ${trade.result === 'Win' ? 'var(--color-win)' : (trade.result === 'Loss' ? 'var(--color-loss)' : 'var(--color-be)')}">${pnlMultiple}</span>
          </div>
        </div>
        <div class="card" style="padding: 14px; background: var(--bg-tertiary);">
          <span style="font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Session / Day</span>
          <div style="margin-top: 6px; font-weight: 600; font-size: 14px;">${trade.session} - ${trade.day}</div>
        </div>
      </div>

      <!-- Detailed Metrics List -->
      <div class="card" style="margin-bottom: 24px; padding: 18px;">
        <h4 style="font-size: 13px; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 12px; letter-spacing: 0.05em;">Execution Specs</h4>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <div style="display: flex; justify-content: space-between; font-size: 13px;"><span style="color: var(--text-secondary);">Entry Price</span><span style="font-weight: 600; color: var(--text-primary);">${trade.entryPrice}</span></div>
          <div style="display: flex; justify-content: space-between; font-size: 13px;"><span style="color: var(--text-secondary);">Stop Loss</span><span style="font-weight: 600; color: var(--text-primary);">${trade.stopLoss}</span></div>
          <div style="display: flex; justify-content: space-between; font-size: 13px;"><span style="color: var(--text-secondary);">Take Profit</span><span style="font-weight: 600; color: var(--text-primary);">${trade.takeProfit}</span></div>
          <div style="display: flex; justify-content: space-between; font-size: 13px;"><span style="color: var(--text-secondary);">Risk Percentage</span><span style="font-weight: 600; color: var(--text-primary);">${trade.riskPercent}%</span></div>
          <div style="display: flex; justify-content: space-between; font-size: 13px;"><span style="color: var(--text-secondary);">Risk-to-Reward</span><span style="font-weight: 600; color: var(--text-primary);">${trade.rr}:1</span></div>
          <div style="display: flex; justify-content: space-between; font-size: 13px;"><span style="color: var(--text-secondary);">Label A</span><span style="font-weight: 600; color: var(--text-primary);">${trade.labelA || '—'}</span></div>
          <div style="display: flex; justify-content: space-between; font-size: 13px;"><span style="color: var(--text-secondary);">Label B</span><span style="font-weight: 600; color: var(--text-primary);">${trade.labelB || '—'}</span></div>
        </div>
      </div>

      <!-- Checklist confirmations -->
      <div class="card" style="margin-bottom: 24px; padding: 18px;">
        <h4 style="font-size: 13px; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 12px; letter-spacing: 0.05em;">Checklist</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
          ${(trade.checklist && trade.checklist.length > 0) 
            ? trade.checklist.map(item => `<span class="badge badge-win" style="font-size: 10px;">✓ ${item}</span>`).join('')
            : '<span style="font-size: 12px; color: var(--text-muted);">No items checked.</span>'}
        </div>
      </div>

      <!-- Psychology & Lessons -->
      <div class="card" style="margin-bottom: 24px; padding: 18px;">
        <h4 style="font-size: 13px; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 12px; letter-spacing: 0.05em;">Psychology & Analysis</h4>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <div>
            <div style="font-size: 11px; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Emotion</div>
            <div style="font-size: 13px; font-weight: 600; color: var(--text-primary);">${trade.emotion || 'Disciplined'}</div>
          </div>
          <div>
            <div style="font-size: 11px; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Mistake logged</div>
            <div style="font-size: 13px; font-weight: 600; color: ${trade.mistakes === 'None' ? 'var(--color-win)' : 'var(--color-loss)'}">${trade.mistakes || 'None'}</div>
          </div>
          <div>
            <div style="font-size: 11px; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Lesson Learned</div>
            <div style="font-size: 13px; color: var(--text-secondary); line-height: 1.4;">${trade.lessonLearned || 'No lesson logged.'}</div>
          </div>
          <div>
            <div style="font-size: 11px; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Notes</div>
            <div style="font-size: 13px; color: var(--text-secondary); line-height: 1.4;">${trade.notes || 'No notes.'}</div>
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
              ${trade.beforeScreenshot ? `<img src="${trade.beforeScreenshot}" style="width:100%; height:100%; object-fit:contain; cursor:pointer;" class="details-chart-img">` : `<div style="display:flex; align-items:center; justify-content:center; height:100%; color:var(--text-muted); font-size:12px;">No screenshot uploaded</div>`}
            </div>
          </div>
          <div>
            <div style="font-size: 11px; color: var(--text-muted); margin-bottom: 6px; font-weight: 700; text-transform: uppercase;">After Outcome</div>
            <div style="border-radius: var(--border-radius-md); overflow: hidden; border: 1px solid var(--border-color); aspect-ratio: 16/9; background: #000;">
              ${trade.afterScreenshot ? `<img src="${trade.afterScreenshot}" style="width:100%; height:100%; object-fit:contain; cursor:pointer;" class="details-chart-img">` : `<div style="display:flex; align-items:center; justify-content:center; height:100%; color:var(--text-muted); font-size:12px;">No screenshot uploaded</div>`}
            </div>
          </div>
        </div>
      </div>

      <!-- Drawer Control Buttons -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px;">
        <button class="btn btn-danger" id="delete-trade-btn">Delete Trade</button>
        <button class="btn btn-primary" id="edit-trade-btn">Edit Trade</button>
      </div>

    </div>
  `;

  // Slide Open transitions
  drawerOverlay.classList.add('active');
  drawer.classList.add('active');

  // Close bindings
  const closeDrawer = () => {
    drawerOverlay.classList.remove('active');
    drawer.classList.remove('active');
  };

  document.getElementById('close-drawer-btn').addEventListener('click', closeDrawer);
  drawerOverlay.addEventListener('click', closeDrawer);

  // Delete trade handler
  const deleteButton = document.getElementById('delete-trade-btn');
  const editButton = document.getElementById('edit-trade-btn');

  if (trade.immutable) {
    deleteButton.remove();
    editButton.textContent = 'Locked Entry';
    editButton.disabled = true;
    editButton.classList.add('btn-secondary');
    editButton.classList.remove('btn-primary');
  } else {
    deleteButton.addEventListener('click', async () => {
      if (confirm('Are you sure you want to delete this trade record permanently?')) {
        await deleteStoreData(storeName, trade.id);
        closeDrawer();
        AppState.refreshCache();
      }
    });

    editButton.addEventListener('click', () => {
      closeDrawer();
      openTradeModal(trade, journalType);
    });
  }

  // Click on chart opens a beautiful fullscreen comparison viewer modal
  document.querySelectorAll('.details-chart-img').forEach(img => {
    img.addEventListener('click', () => {
      openFullscreenViewer(trade);
    });
  });
}

// Lightbox modal overlay viewer with before/after interactive comparisons
function openFullscreenViewer(trade) {
  const viewerModal = document.createElement('div');
  viewerModal.className = 'modal-overlay active';
  viewerModal.style.zIndex = '2000';
  
  viewerModal.innerHTML = `
    <div class="modal-container" style="max-width: 900px; padding:0; background: #000; border-color: rgba(255,255,255,0.1);">
      <div class="modal-header" style="background:#0f131a; border-bottom:1px solid rgba(255,255,255,0.1)">
        <h3>Before & After Comparison: ${trade.pair}</h3>
        <button class="modal-close" id="close-viewer-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <div style="padding:20px; display:flex; flex-direction:column; gap:16px;">
        <div class="slider-overlay-body">
          <div class="comparison-slider-container" id="fullscreen-slider-container">
            <!-- Background: Before image -->
            <img src="${trade.beforeScreenshot || ''}" class="slider-image slider-image-before">
            
            <!-- Foreground: After image container (clipped width) -->
            <div class="slider-image-after" id="slider-after-container">
              <img src="${trade.afterScreenshot || ''}" class="slider-image" style="width: 800px; max-width: none;">
            </div>

            <!-- Slide handle divider line -->
            <div class="slider-handle" id="slider-handle">
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

  // Close events
  const closeViewer = () => {
    viewerModal.classList.remove('active');
    setTimeout(() => viewerModal.remove(), 250);
  };
  viewerModal.querySelector('#close-viewer-btn').addEventListener('click', closeViewer);
  viewerModal.addEventListener('click', (e) => {
    if (e.target === viewerModal) closeViewer();
  });

  // Slider dragging logic
  const container = viewerModal.querySelector('#fullscreen-slider-container');
  const afterContainer = viewerModal.querySelector('#slider-after-container');
  const handle = viewerModal.querySelector('#slider-handle');
  const afterImage = afterContainer.querySelector('img');

  let isDragging = false;

  const updateSlider = (clientX) => {
    const rect = container.getBoundingClientRect();
    let position = clientX - rect.left;
    
    // Bounds check
    if (position < 0) position = 0;
    if (position > rect.width) position = rect.width;

    const percentage = (position / rect.width) * 100;
    afterContainer.style.width = `${percentage}%`;
    handle.style.left = `${percentage}%`;
    
    // Lock the width of the overlay image to the container width so it doesn't squish
    afterImage.style.width = `${rect.width}px`;
  };

  // Align image size initially on render
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

  // Touch Support
  handle.addEventListener('touchstart', () => isDragging = true);
  window.addEventListener('touchend', () => isDragging = false);
  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    updateSlider(e.touches[0].clientX);
  });
}
