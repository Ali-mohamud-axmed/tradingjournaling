// Core Application Shell and Router
import { AppState } from './state.js';
import { addStoreData, updateStoreData } from './db.js';
import { renderDashboard } from './components/dashboards.js';
import { renderJournal } from './components/journal.js';
import { renderCalendar } from './components/calendar.js';
import { renderAnalytics } from './components/analytics.js';
import { renderGallery } from './components/gallery.js';
import { renderReports } from './components/reports.js';
import { renderSettings } from './components/settings.js';
import { renderAuth } from './components/auth.js';
import { renderAdmin } from './components/admin.js';
import { renderBacktesting } from './components/backtesting.js';
import { t } from './translations.js';

// Setup routing map
const routes = {
  dashboard: { titleKey: 'dashboard', render: renderDashboard },
  journal: { titleKey: 'journal', render: (container) => renderJournal(container, 'live') },
  backtesting: { titleKey: 'backtesting', render: renderBacktesting },
  calendar: { titleKey: 'calendar', render: renderCalendar },
  analytics: { titleKey: 'analytics', render: renderAnalytics },
  gallery: { titleKey: 'gallery', render: renderGallery },
  reports: { titleKey: 'reports', render: renderReports },
  settings: { titleKey: 'settings', render: renderSettings },
  admin: { titleKey: 'adminPanel', render: renderAdmin },
  auth: { titleKey: 'welcomeBack', render: renderAuth }
};

document.addEventListener('DOMContentLoaded', async () => {
  // Initialize App State
  await AppState.init();

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
      if (item.dataset.view === activeRoute) {
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
      if (AppState.activeView !== 'journal' && AppState.activeView !== 'backtesting') {
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

    // Build checklist values
    const checkedChecklist = [];
    document.querySelectorAll('.checklist-form-checkbox').forEach(cb => {
      if (cb.checked) checkedChecklist.push(cb.value);
    });

    // Date calculations
    const dateStr = document.getElementById('form-date').value;
    const dayOfWeek = new Date(dateStr).toLocaleDateString('en-US', { weekday: 'long' });

    const tradeData = {
      userEmail: AppState.user.email,
      date: dateStr,
      day: dayOfWeek,
      session: document.getElementById('form-session').value,
      pair: document.getElementById('form-pair').value.toUpperCase(),
      type: directionSelect.value,
      entryPrice: parseFloat(entryInput.value),
      stopLoss: parseFloat(slInput.value),
      takeProfit: parseFloat(tpInput.value),
      riskPercent: parseFloat(document.getElementById('form-risk').value || 1),
      rr: parseFloat(rrInput.value) || 0,
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

    modal.classList.remove('active');
    AppState.refreshCache();
  });
}

// Open modal helper
export function openTradeModal(trade = null, journalType = null) {
  const modal = document.getElementById('trade-modal');
  const title = document.getElementById('modal-title');
  const form = document.getElementById('trade-form');
  
  form.reset();
  
  // Set default date
  document.getElementById('form-date').value = new Date().toISOString().split('T')[0];
  document.getElementById('form-journal-type').value = journalType || (AppState.activeView === 'backtesting' ? 'backtest' : 'live');
  
  // Build dynamic confirmation checklists
  const checklistArea = document.getElementById('checklist-selectors-area');
  checklistArea.innerHTML = '';
  const currentChecklist = AppState.checklists[0]?.items || ['HTF Trend Aligned', 'Liquidity Swept', 'OB Tapped', 'Risk defined'];
  
  currentChecklist.forEach((item, index) => {
    checklistArea.innerHTML += `
      <label class="checkbox-label">
        <input type="checkbox" class="checklist-form-checkbox" value="${item}" id="chk-${index}">
        <span>${item}</span>
      </label>
    `;
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
    document.getElementById('form-pair').value = trade.pair;
    document.getElementById('form-direction').value = trade.type;
    document.getElementById('form-entry').value = trade.entryPrice;
    document.getElementById('form-sl').value = trade.stopLoss;
    document.getElementById('form-tp').value = trade.takeProfit;
    document.getElementById('form-risk').value = trade.riskPercent;
    document.getElementById('form-rr').value = trade.rr;
    document.getElementById('form-result').value = trade.result;
    document.getElementById('form-strategy').value = trade.strategy;
    document.getElementById('form-setup').value = trade.setup;
    document.getElementById('form-emotion').value = trade.emotion;
    document.getElementById('form-mistakes').value = trade.mistakes;
    document.getElementById('form-lessons').value = trade.lessonLearned;
    document.getElementById('form-notes').value = trade.notes;

    // Check custom checklist boxes
    if (trade.checklist) {
      document.querySelectorAll('.checklist-form-checkbox').forEach(cb => {
        if (trade.checklist.includes(cb.value)) {
          cb.checked = true;
        }
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
