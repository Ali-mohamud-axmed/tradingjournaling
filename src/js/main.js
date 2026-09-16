// Core Application Shell and Router
import { AppState, applyAccountTradeChange, getPortfolioAccounts } from './state.js';
import { addStoreData, updateStoreData } from './db.js';
import { renderDashboard } from './components/dashboards.js';
import { renderJournal } from './components/journal.js';
import { renderCalendar } from './components/calendar.js';
import { renderAnalytics } from './components/analytics.js';
import { renderGallery } from './components/gallery.js';
import { renderReports } from './components/reports.js';
import { renderPortfolio } from './components/portfolio.js';
import { renderSettings } from './components/settings.js';
import { renderAuth } from './components/auth.js';
import { renderAdmin } from './components/admin.js';
import { renderBacktesting } from './components/backtesting.js';
import { renderBacktestingDashboard } from './components/backtestingDashboard.js';
import { showTradeSavedNotification } from './components/notifications.js';
import { t } from './translations.js';

// Setup routing map
const routes = {
  dashboard: { titleKey: 'dashboard', render: renderDashboard },
  journal: { titleKey: 'journal', render: (container) => renderJournal(container, 'live') },
  backtesting: { titleKey: 'backtesting', render: renderBacktestingDashboard },
  'backtest-trades': { titleKey: 'backtesting', render: renderBacktesting },
  calendar: { titleKey: 'calendar', render: renderCalendar },
  analytics: { titleKey: 'analytics', render: renderAnalytics },
  gallery: { titleKey: 'gallery', render: renderGallery },
  reports: { titleKey: 'reports', render: renderReports },
  portfolio: { titleKey: 'portfolio', render: renderPortfolio },
  settings: { titleKey: 'settings', render: renderSettings },
  admin: { titleKey: 'adminPanel', render: renderAdmin },
  auth: { titleKey: 'welcomeBack', render: renderAuth }
};

document.addEventListener('DOMContentLoaded', async () => {
  // Initialize App State
  await AppState.init();

  const routeFromPath = window.location.pathname.replace(/^\//, '').replace(/\/$/, '') || 'dashboard';
  if (routes[routeFromPath]) AppState.activeView = routeFromPath;

  const viewport = document.getElementById('content-viewport');
  const viewTitle = document.getElementById('current-view-title');
  const navItems = document.querySelectorAll('.nav-item');
  const searchInput = document.getElementById('global-search');

  // Router renderer
  function router() {
    const activeRoute = AppState.activeView;
    
    // Auth guard
    if (!AppState.user && activeRoute !== 'auth') {
      AppState.setView('auth');
      return;
    }

    // Admin role guard
    if (AppState.user && activeRoute === 'admin' && AppState.user.role !== 'admin') {
      AppState.setView('dashboard');
      return;
    }

    const routeConfig = routes[activeRoute];

    if (!routeConfig) {
      AppState.setView('dashboard');
      return;
    }

    // Toggle main app layout vs auth view
    const appShell = document.getElementById('app');
    const authRoot = document.getElementById('auth-root');
    if (activeRoute === 'auth') {
      if (appShell) appShell.style.display = 'none';
      document.body.classList.add('auth-body');
      if (authRoot) {
        authRoot.style.display = 'block';
        authRoot.innerHTML = '';
        routes.auth.render(authRoot);
      }
      return;
    } else {
      if (appShell) appShell.style.display = 'flex';
      if (authRoot) authRoot.style.display = 'none';
      document.body.classList.remove('auth-body');
    }

    // Set header title
    viewTitle.textContent = t(routeConfig.titleKey);

    // Sync sidebar options visibility based on role
    const adminLink = document.getElementById('nav-admin-link');
    if (adminLink) {
      adminLink.style.display = (AppState.user && AppState.user.role === 'admin') ? 'flex' : 'none';
    }

    // Set sidebar active state
    navItems.forEach(item => {
      if (item.dataset.view === activeRoute || (activeRoute === 'backtest-trades' && item.dataset.view === 'backtesting')) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Sync profile display in sidebar
    if (AppState.user) {
      document.getElementById('profile-avatar').textContent = AppState.user.avatar || 'US';
      document.getElementById('profile-name').textContent = AppState.user.username || 'User';
      const roleLabel = AppState.user.role === 'admin' ? t('adminUser') : t('premiumTrader');
      document.querySelector('.user-role').textContent = roleLabel;
    }

    // Translate Sidebar and App Shell Elements
    document.querySelector('.sidebar-dashboard-text').textContent = t('dashboard');
    document.querySelector('.sidebar-journal-text').textContent = t('journal');
    document.querySelector('.sidebar-backtesting-text').textContent = t('backtesting');
    document.querySelector('.sidebar-calendar-text').textContent = t('calendar');
    document.querySelector('.sidebar-analytics-text').textContent = t('analytics');
    document.querySelector('.sidebar-gallery-text').textContent = t('gallery');
    document.querySelector('.sidebar-reports-text').textContent = t('reports');
    document.querySelector('.sidebar-portfolio-text').textContent = 'Portfolio Accounts';
    document.querySelector('.sidebar-settings-text').textContent = t('settings');
    
    const sidebarAdminSpan = document.querySelector('.sidebar-admin-text');
    if (sidebarAdminSpan) sidebarAdminSpan.textContent = t('adminPanel');

    document.getElementById('quick-add-trade-text').textContent = AppState.language === 'so' ? 'Ganacsi Cusub' : 'New Trade';
    document.getElementById('global-search').placeholder = AppState.language === 'so' ? 'Raadi lamaanaha, xeeladda, taariikhda...' : 'Search pair, strategy, date...';

    // Render component
    viewport.innerHTML = '';
    routeConfig.render(viewport);
  }

  // Bind navigation triggers
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const view = item.dataset.view;
      AppState.setView(view);
    });
  });

  // Language selector
  const langSelector = document.getElementById('lang-selector');
  if (langSelector) {
    langSelector.value = AppState.language;
    langSelector.addEventListener('change', (e) => {
      AppState.setLanguage(e.target.value);
    });
  }

  // Profile click goes to Settings
  document.getElementById('profile-summary').addEventListener('click', () => {
    AppState.setView('settings');
  });

  // Global Search logic
  let searchTimeout = null;
  searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      const query = e.target.value.toLowerCase().trim();
      if (!query) return;

      // If user starts typing, redirect to Journal to show filtered search list
      if (AppState.activeView !== 'journal' && AppState.activeView !== 'backtesting' && AppState.activeView !== 'backtest-trades') {
        AppState.setView('journal');
      }
      
      // Dispatch a custom event that components can listen to
      window.dispatchEvent(new CustomEvent('globalSearch', { detail: query }));
    }, 300);
  });

  // Add listener for state changes
  AppState.subscribe(() => {
    router();
  });

  window.addEventListener('popstate', event => {
    const view = event.state?.view || window.location.pathname.replace(/^\//, '').replace(/\/$/, '') || 'dashboard';
    if (routes[view]) {
      AppState.activeView = view;
      AppState.notifyListeners();
    }
  });

  // Run initial routing
  router();

  // Wire up Modal controls
  initModalLogic();
});

// Modal CRUD Logic Manager
function initModalLogic() {
  const modal = document.getElementById('trade-modal');
  const closeBtn = document.getElementById('close-trade-modal-btn');
  const cancelBtn = document.getElementById('cancel-trade-modal-btn');
  const quickAddBtn = document.getElementById('quick-add-trade-btn');
  const form = document.getElementById('trade-form');

  // Fields
  const entryInput = document.getElementById('form-entry');
  const slInput = document.getElementById('form-sl');
  const tpInput = document.getElementById('form-tp');
  const rrInput = document.getElementById('form-rr');
  const directionSelect = document.getElementById('form-direction');

  // Trigger modal open
  quickAddBtn.addEventListener('click', () => {
    if (AppState.activeView === 'backtesting') {
      import('./components/backtesting.js').then(({ openBacktestModal }) => openBacktestModal());
      return;
    }
    openTradeModal();
  });

  // Close modals
  [closeBtn, cancelBtn].forEach(btn => {
    btn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  });

  // Close on outside click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });

  // Risk to Reward auto calculator
  function calculateRR() {
    const entry = parseFloat(entryInput.value);
    const sl = parseFloat(slInput.value);
    const tp = parseFloat(tpInput.value);
    const direction = directionSelect.value;

    if (isNaN(entry) || isNaN(sl) || isNaN(tp)) {
      rrInput.value = '';
      return;
    }

    let risk = 0;
    let reward = 0;

    if (direction === 'Buy') {
      risk = entry - sl;
      reward = tp - entry;
    } else {
      risk = sl - entry;
      reward = entry - tp;
    }

    if (risk <= 0) {
      rrInput.value = 'Invalid SL';
      return;
    }

    const calculatedRR = (reward / risk).toFixed(2);
    rrInput.value = calculatedRR;
  }

  [entryInput, slInput, tpInput, directionSelect].forEach(input => {
    input.addEventListener('input', calculateRR);
  });

  // Image Uploading Hooks
  setupImageUploads();

  // Form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('form-trade-id').value;
    const journalType = document.getElementById('form-journal-type').value; // 'live' or 'backtest'
    const storeName = journalType === 'live' ? 'TradingJournal' : 'BacktestingJournal';
    const previousTrade = id ? AppState.tradingTrades.find(trade => trade.id === Number(id)) : null;

    // Build checklist values
    const checkedChecklist = [];
    document.querySelectorAll('.checklist-form-checkbox').forEach(cb => {
      if (cb.checked) checkedChecklist.push(cb.value);
    });

    // Date calculations
    const dateStr = document.getElementById('form-date').value;
    const dayOfWeek = new Date(dateStr).toLocaleDateString('en-US', { weekday: 'long' });

    const enteredPL = parseFloat(document.getElementById('form-pl').value) || 0;
    const normalizedPL = document.getElementById('form-result').value === 'Loss'
      ? -Math.abs(enteredPL)
      : document.getElementById('form-result').value === 'Win'
        ? Math.abs(enteredPL)
        : enteredPL;

    const tradeData = {
      userEmail: AppState.user.email,
      date: dateStr,
      day: dayOfWeek,
      session: document.getElementById('form-session').value,
      accountType: document.getElementById('form-account-type').value,
      pair: document.getElementById('form-pair').value.toUpperCase(),
      type: directionSelect.value,
      entryPrice: parseFloat(entryInput.value),
      stopLoss: parseFloat(slInput.value),
      takeProfit: parseFloat(tpInput.value),
      riskPercent: parseFloat(document.getElementById('form-risk').value || 1),
      rr: parseFloat(rrInput.value) || 0,
      plMoney: normalizedPL,
      result: document.getElementById('form-result').value,
      strategy: document.getElementById('form-strategy').value,
      setup: document.getElementById('form-setup').value,
      checklist: checkedChecklist,
      emotion: document.getElementById('form-emotion').value,
      mistakes: document.getElementById('form-mistakes').value,
      lessonLearned: document.getElementById('form-lessons').value,
      notes: document.getElementById('form-notes').value,
      beforeScreenshot: document.getElementById('form-before-img').value || null,
      afterScreenshot: document.getElementById('form-after-img').value || null
    };

    if (id) {
      // Edit
      tradeData.id = Number(id);
      await updateStoreData(storeName, tradeData);
    } else {
      // Add
      await addStoreData(storeName, tradeData);
    }

    if (journalType === 'live') await applyAccountTradeChange(previousTrade, tradeData);

    modal.classList.remove('active');
    AppState.refreshCache();
    showTradeSavedNotification();
  });
}

// Open modal helper
export function openTradeModal(trade = null, journalType = null) {
  const modal = document.getElementById('trade-modal');
  const title = document.getElementById('modal-title');
  const form = document.getElementById('trade-form');
  
  form.reset();

  const accountSelect = document.getElementById('form-account-type');
  accountSelect.innerHTML = getPortfolioAccounts().map(account => `<option value="${account.name}">${account.name}</option>`).join('');
  
  // Set default date
  document.getElementById('form-date').value = new Date().toISOString().split('T')[0];
  document.getElementById('form-journal-type').value = journalType || (AppState.activeView === 'backtesting' ? 'backtest' : 'live');
  
  // Build dynamic confirmation checklists
  const checklistArea = document.getElementById('checklist-selectors-area');
  checklistArea.innerHTML = '';
  const defaultChecklist = ['HTF Trend Aligned', 'Liquidity Swept', 'MSS on LTF', 'OB Tapped', 'Risk defined', 'Order Flow', 'KL', 'TS', 'SMT / 2SMT', '5M #'];
  const checklistSections = AppState.checklists.length
    ? AppState.checklists.map(section => ({ ...section, items: [...(section.items || [])] }))
    : [{ name: 'Standard Confirmation', items: defaultChecklist }];
  const selectedChecklistValues = new Set(trade?.checklist || []);
  const sectionSelect = document.getElementById('checklist-section-select');
  let selectedSectionIndex = 0;
  let checklistItems = [];
  const currentSection = () => checklistSections[selectedSectionIndex];
  const saveChecklistSection = async () => {
    const section = currentSection();
    if (section.id) await updateStoreData('Checklists', section);
  };
  const renderSectionOptions = () => {
    sectionSelect.innerHTML = checklistSections.map((section, index) => `<option value="${index}">${section.name}</option>`).join('');
    sectionSelect.value = String(selectedSectionIndex);
  };
  const renderChecklistItems = () => {
    checklistItems = currentSection().items;
    checklistArea.innerHTML = checklistItems.map((item, index) => `
      <div class="checklist-item-row">
        <label class="checkbox-label">
          <input type="checkbox" class="checklist-form-checkbox" value="${item}" id="chk-${index}" ${selectedChecklistValues.has(item) ? 'checked' : ''}>
          <span class="checklist-item-text">${item}</span>
        </label>
        <button type="button" class="checklist-edit-btn" data-index="${index}" aria-label="Rename ${item}">✎</button>
        <button type="button" class="checklist-remove-btn" data-index="${index}" aria-label="Remove ${item}">×</button>
      </div>
    `).join('');
    checklistArea.querySelectorAll('.checklist-form-checkbox').forEach(input => {
      input.addEventListener('change', () => {
        if (input.checked) selectedChecklistValues.add(input.value);
        else selectedChecklistValues.delete(input.value);
      });
    });
    checklistArea.querySelectorAll('.checklist-edit-btn').forEach(button => {
      button.addEventListener('click', () => {
        const index = Number(button.dataset.index);
        const row = button.closest('.checklist-item-row');
        const text = row.querySelector('.checklist-item-text');
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'checklist-inline-edit';
        input.value = checklistItems[index];
        text.replaceWith(input);
        input.focus();
        input.select();
        const saveName = async () => {
          const nextName = input.value.trim();
          if (nextName && !checklistItems.some((item, itemIndex) => item === nextName && itemIndex !== index)) {
            selectedChecklistValues.delete(checklistItems[index]);
            checklistItems[index] = nextName;
            if (document.getElementById(`chk-${index}`)?.checked) selectedChecklistValues.add(nextName);
          }
          renderChecklistItems();
          await saveChecklistSection();
        };
        input.addEventListener('keydown', event => {
          if (event.key === 'Enter') saveName();
          if (event.key === 'Escape') renderChecklistItems();
        });
        input.addEventListener('blur', saveName, { once: true });
      });
    });
    checklistArea.querySelectorAll('.checklist-remove-btn').forEach(button => {
      button.addEventListener('click', async () => {
        checklistItems.splice(Number(button.dataset.index), 1);
        renderChecklistItems();
        await saveChecklistSection();
      });
    });
  };
  renderSectionOptions();
  renderChecklistItems();
  sectionSelect.addEventListener('change', async () => {
    selectedSectionIndex = Number(sectionSelect.value);
    renderChecklistItems();
  });
  document.getElementById('add-checklist-item-btn').addEventListener('click', async () => {
    const input = document.getElementById('new-checklist-item');
    const item = input.value.trim();
    if (!item || checklistItems.includes(item)) return;
    checklistItems.push(item);
    currentSection().items = checklistItems;
    input.value = '';
    renderChecklistItems();
    await saveChecklistSection();
  });
  document.getElementById('new-checklist-item').addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      document.getElementById('add-checklist-item-btn').click();
    }
  });
  document.getElementById('add-checklist-section-btn').addEventListener('click', async () => {
    const name = await requestChecklistSectionName();
    if (!name) return;
    const section = { name, items: [], userEmail: AppState.user.email };
    const added = await addStoreData('Checklists', section);
    section.id = added?.id || added;
    checklistSections.push(section);
    selectedSectionIndex = checklistSections.length - 1;
    renderSectionOptions();
    renderChecklistItems();
  });

  // Preview elements
  const beforePreview = document.getElementById('before-preview');
  const afterPreview = document.getElementById('after-preview');
  beforePreview.style.display = 'none';
  afterPreview.style.display = 'none';
  document.getElementById('form-before-img').value = '';
  document.getElementById('form-after-img').value = '';

  if (trade) {
    title.textContent = 'Edit Trade Record';
    document.getElementById('form-trade-id').value = trade.id;
    document.getElementById('form-date').value = trade.date;
    document.getElementById('form-session').value = trade.session;
    document.getElementById('form-account-type').value = trade.accountType || 'Challenge';
    document.getElementById('form-pair').value = trade.pair;
    document.getElementById('form-direction').value = trade.type;
    document.getElementById('form-entry').value = trade.entryPrice;
    document.getElementById('form-sl').value = trade.stopLoss;
    document.getElementById('form-tp').value = trade.takeProfit;
    document.getElementById('form-risk').value = trade.riskPercent;
    document.getElementById('form-rr').value = trade.rr;
    document.getElementById('form-result').value = trade.result;
    document.getElementById('form-pl').value = trade.plMoney ?? trade.pl_money ?? '';
    document.getElementById('form-strategy').value = trade.strategy;
    document.getElementById('form-setup').value = trade.setup;
    document.getElementById('form-emotion').value = trade.emotion;
    document.getElementById('form-mistakes').value = trade.mistakes;
    document.getElementById('form-lessons').value = trade.lessonLearned;
    document.getElementById('form-notes').value = trade.notes;

    // Check custom checklist boxes
    if (trade.checklist) {
        document.querySelectorAll('.checklist-form-checkbox').forEach(cb => {
          cb.checked = trade.checklist.includes(cb.value);
        });
    }

    // Set screenshot previews
    if (trade.beforeScreenshot) {
      document.getElementById('form-before-img').value = trade.beforeScreenshot;
      beforePreview.style.display = 'block';
      beforePreview.innerHTML = `<img src="${trade.beforeScreenshot}">`;
    }
    if (trade.afterScreenshot) {
      document.getElementById('form-after-img').value = trade.afterScreenshot;
      afterPreview.style.display = 'block';
      afterPreview.innerHTML = `<img src="${trade.afterScreenshot}">`;
    }
  } else {
    title.textContent = 'Log New Trade';
    document.getElementById('form-trade-id').value = '';
  }

  modal.classList.add('active');
}

function requestChecklistSectionName() {
  return new Promise(resolve => {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay active checklist-section-modal-overlay';
    overlay.innerHTML = `
      <div class="modal-container checklist-section-modal" role="dialog" aria-modal="true" aria-labelledby="checklist-section-modal-title">
        <div class="modal-header">
          <div>
            <div class="modal-kicker">Checklist Library</div>
            <h3 id="checklist-section-modal-title">Add Checklist Section</h3>
          </div>
          <button type="button" class="modal-close checklist-section-cancel" aria-label="Close">&times;</button>
        </div>
        <div class="modal-body">
          <label class="form-label" for="checklist-section-name">Section Name</label>
          <input id="checklist-section-name" class="form-control" type="text" placeholder="e.g. London Open Confirmation" autocomplete="off">
          <p class="checklist-section-helper">Create a reusable group of confirmation rules for your trades.</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary checklist-section-cancel">Cancel</button>
          <button type="button" class="btn btn-primary" id="confirm-checklist-section-btn">Add Section</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
    const input = overlay.querySelector('#checklist-section-name');
    const finish = value => {
      overlay.remove();
      resolve(value);
    };
    overlay.querySelectorAll('.checklist-section-cancel').forEach(button => button.addEventListener('click', () => finish('')));
    overlay.addEventListener('click', event => {
      if (event.target === overlay) finish('');
    });
    overlay.querySelector('#confirm-checklist-section-btn').addEventListener('click', () => finish(input.value.trim()));
    input.addEventListener('keydown', event => {
      if (event.key === 'Enter') finish(input.value.trim());
      if (event.key === 'Escape') finish('');
    });
    requestAnimationFrame(() => input.focus());
  });
}

// Drag & drop dropzones file handler
function setupImageUploads() {
  const beforeDropzone = document.getElementById('before-dropzone');
  const afterDropzone = document.getElementById('after-dropzone');
  const beforeInput = document.getElementById('before-file-input');
  const afterInput = document.getElementById('after-file-input');

  const bindDropzone = (dropzone, input, previewId, hiddenInputId) => {
    const preview = document.getElementById(previewId);
    const hidden = document.getElementById(hiddenInputId);

    dropzone.addEventListener('click', () => input.click());

    // Highlight dropzone on dragover
    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.style.borderColor = 'var(--accent-color)';
    });

    dropzone.addEventListener('dragleave', () => {
      dropzone.style.borderColor = 'var(--border-color)';
    });

    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.style.borderColor = 'var(--border-color)';
      if (e.dataTransfer.files.length) {
        processFile(e.dataTransfer.files[0], preview, hidden);
      }
    });

    input.addEventListener('change', () => {
      if (input.files.length) {
        processFile(input.files[0], preview, hidden);
      }
    });
  };

  const processFile = (file, previewEl, hiddenEl) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      hiddenEl.value = dataUrl;
      previewEl.style.display = 'block';
      previewEl.innerHTML = `
        <img src="${dataUrl}">
        <button type="button" class="image-preview-remove">&times;</button>
      `;
      // Handle image deletion inside preview
      previewEl.querySelector('.image-preview-remove').addEventListener('click', (e) => {
        e.stopPropagation();
        hiddenEl.value = '';
        previewEl.innerHTML = '';
        previewEl.style.display = 'none';
      });
    };
    reader.readAsDataURL(file);
  };

  bindDropzone(beforeDropzone, beforeInput, 'before-preview', 'form-before-img');
  bindDropzone(afterDropzone, afterInput, 'after-preview', 'form-after-img');
}
