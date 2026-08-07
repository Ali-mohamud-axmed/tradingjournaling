import { AppState } from '../state.js';
import { clearDatabase, testSupabaseConnection } from '../db.js';
import { t } from '../translations.js';

export function renderSettings(container) {
  const user = AppState.user || {
    username: 'AlexTrader',
    email: 'alex.forex@master.com',
    currency: 'USD',
    riskDefault: 1.0,
    notifications: true,
    role: 'user',
    challengeSize: 100000,
    fundedSize: 50000,
    brokerSize: 10000
  };

  const isLight = document.body.classList.contains('light-theme');

  container.innerHTML = `
    <div style="max-width: 800px; display: flex; flex-direction: column; gap: 24px;">
      
      <!-- Profile settings -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            ${t('profileSettings')}
          </div>
        </div>
        <form id="settings-profile-form">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="set-fullname">Full Name</label>
              <input type="text" id="set-fullname" class="form-control" value="${user.fullName || ''}" placeholder="e.g. Alex Sterling">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="set-username">${t('usernameLabel')}</label>
              <input type="text" id="set-username" class="form-control" value="${user.username}" required>
            </div>
            <div class="form-group">
              <label class="form-label" for="set-email">${t('emailLabel')}</label>
              <input type="email" id="set-email" class="form-control" value="${user.email}" required>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="set-currency">${t('defaultCurrency')}</label>
              <select id="set-currency" class="form-control">
                <option value="USD" ${user.currency === 'USD' ? 'selected' : ''}>USD ($)</option>
                <option value="EUR" ${user.currency === 'EUR' ? 'selected' : ''}>EUR (€)</option>
                <option value="GBP" ${user.currency === 'GBP' ? 'selected' : ''}>GBP (£)</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label" for="set-risk">${t('defaultRisk')}</label>
              <input type="number" id="set-risk" step="0.1" class="form-control" value="${user.riskDefault}">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="set-challenge-size">Challenge Account Capital Size ($)</label>
              <input type="number" id="set-challenge-size" class="form-control" value="${user.challengeSize ?? 100000}">
            </div>
            <div class="form-group">
              <label class="form-label" for="set-funded-size">Funded Account Capital Size ($)</label>
              <input type="number" id="set-funded-size" class="form-control" value="${user.fundedSize ?? 50000}">
            </div>
            <div class="form-group">
              <label class="form-label" for="set-broker-size">Your Broker Account Capital Size ($)</label>
              <input type="number" id="set-broker-size" class="form-control" value="${user.brokerSize ?? 10000}">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">${t('colRole')}</label>
              <input type="text" class="form-control" value="${(user.role || 'user').toUpperCase()}" readonly style="opacity: 0.7; cursor: not-allowed; background: var(--bg-primary);">
            </div>
          </div>
          <div style="display: flex; justify-content: flex-end; margin-top: 8px;">
            <button type="submit" class="btn btn-primary">${t('saveChanges')}</button>
          </div>
        </form>
      </div>

      <!-- Custom Checklist Builder Card -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
            Custom Checklist Rule Builder
          </div>
        </div>
        <div style="padding: 4px 0;">
          <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 16px;">
            Define custom confirmation criteria to display when logging live trades and backtests.
          </p>
          <div id="settings-checklist-items-list" style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px;">
            <!-- Rendered by script -->
          </div>
          <div style="display: flex; gap: 12px;">
            <input type="text" id="new-checklist-item-input" class="form-control" placeholder="e.g. 4h FVG filled" style="flex: 1;">
            <button class="btn btn-primary" id="add-checklist-item-btn" style="padding: 0 16px; height: 38px;">Add Rule</button>
          </div>
        </div>
      </div>

      <!-- App preferences -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            ${t('appPreferences')}
          </div>
        </div>
        
        <div style="display: flex; flex-direction: column; gap: 20px;">
          <!-- Theme Switcher -->
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 16px;">
            <div>
              <div style="font-weight: 600; font-size: 14px;">${t('colorTheme')}</div>
              <div style="font-size: 12px; color: var(--text-muted);">${t('themeDescription')}</div>
            </div>
            <button class="btn btn-secondary" id="theme-toggle-btn" style="padding: 8px 16px; font-size:13px;">
              ${isLight ? t('themeDark') : t('themeLight')}
            </button>
          </div>

          <!-- Notification Toggles -->
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-weight: 600; font-size: 14px;">${t('notificationsTitle')}</div>
              <div style="font-size: 12px; color: var(--text-muted);">${t('notificationsDesc')}</div>
            </div>
            <label class="checkbox-label" style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
              <input type="checkbox" id="notification-toggle" ${user.notifications ? 'checked' : ''} style="width: 20px; height: 20px;">
            </label>
          </div>
        </div>
      </div>

      <!-- Account Management / Actions -->
      <div class="card" style="border-color: rgba(239, 68, 68, 0.2);">
        <div class="card-header">
          <div class="card-title" style="color: var(--color-loss);">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            ${t('dangerZone')}
          </div>
        </div>
        <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 20px;">
          ${t('dangerZoneDesc')}
        </p>
        <div style="display: flex; flex-wrap: wrap; gap: 16px;">
          <button class="btn btn-warning" id="supabase-test-btn" style="background: #f59e0b; border-color: #f59e0b; color: #ffffff;">Test Supabase Connection</button>
          <button class="btn btn-danger" id="clear-database-btn">${t('resetDatabase')}</button>
          <button class="btn btn-secondary" id="logout-btn" style="border-color: var(--color-loss); color: var(--color-loss);">${t('logoutAccount')}</button>
        </div>
      </div>

    </div>
  `;

  // Submit profile edits
  document.getElementById('settings-profile-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const updatedUser = {
      username: document.getElementById('set-username').value,
      email: document.getElementById('set-email').value,
      fullName: document.getElementById('set-fullname').value,
      currency: document.getElementById('set-currency').value,
      riskDefault: parseFloat(document.getElementById('set-risk').value || 1),
      challengeSize: parseFloat(document.getElementById('set-challenge-size').value || 100000),
      fundedSize: parseFloat(document.getElementById('set-funded-size').value || 50000),
      brokerSize: parseFloat(document.getElementById('set-broker-size').value || 10000)
    };
    AppState.updateProfile(updatedUser);
    alert(t('profileUpdated'));
  });

  // Checklist Builder Logic
  const checklistList = document.getElementById('settings-checklist-items-list');
  const newItemInput = document.getElementById('new-checklist-item-input');
  const addItemBtn = document.getElementById('add-checklist-item-btn');

  const activeChecklist = AppState.checklists[0] || {
    name: 'Standard Confirmation',
    items: ['HTF Trend Aligned', 'Liquidity Swept', 'OB Tapped', 'Risk defined'],
    userEmail: user.email
  };

  function renderChecklistItems() {
    if (!checklistList) return;
    if (activeChecklist.items.length === 0) {
      checklistList.innerHTML = `<span style="font-size:13px; color:var(--text-muted);">No rules defined yet. Add one below!</span>`;
      return;
    }
    checklistList.innerHTML = activeChecklist.items.map((item, index) => `
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; background: var(--bg-tertiary); border-radius: var(--border-radius-md); border: 1px solid var(--border-color);">
        <span style="font-size: 13px; font-weight: 600; color: var(--text-primary);">${item}</span>
        <button class="btn btn-secondary delete-chk-item-btn" data-index="${index}" style="padding: 4px 8px; height: auto; font-size: 12px; color: var(--color-loss); border-color: transparent; background: transparent;">&times; Delete</button>
      </div>
    `).join('');

    // Bind delete buttons
    checklistList.querySelectorAll('.delete-chk-item-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const idx = parseInt(btn.dataset.index);
        activeChecklist.items.splice(idx, 1);
        await saveChecklist();
      });
    });
  }

  async function saveChecklist() {
    const { addStoreData, updateStoreData } = await import('../db.js');
    if (activeChecklist.id) {
      await updateStoreData('Checklists', activeChecklist);
    } else {
      const added = await addStoreData('Checklists', activeChecklist);
      activeChecklist.id = added.id || added;
    }
    await AppState.refreshCache();
    renderChecklistItems();
  }

  if (addItemBtn) {
    addItemBtn.addEventListener('click', async () => {
      const text = newItemInput.value.trim();
      if (!text) return;
      activeChecklist.items.push(text);
      newItemInput.value = '';
      await saveChecklist();
    });
  }

  renderChecklistItems();

  // Toggle Theme
  document.getElementById('theme-toggle-btn').addEventListener('click', () => {
    const activeIsLight = document.body.classList.contains('light-theme');
    if (activeIsLight) {
      document.body.classList.remove('light-theme');
      localStorage.setItem('trademaster-theme', 'dark');
    } else {
      document.body.classList.add('light-theme');
      localStorage.setItem('trademaster-theme', 'light');
    }
    renderSettings(container);
  });

  // Notifications
  document.getElementById('notification-toggle').addEventListener('change', (e) => {
    AppState.updateProfile({ notifications: e.target.checked });
  });

  // Supabase connection test
  const supabaseTestBtn = document.getElementById('supabase-test-btn');
  if (supabaseTestBtn) {
    supabaseTestBtn.addEventListener('click', async () => {
      try {
        const result = await testSupabaseConnection();
        alert(result && result.connected ? 'Supabase connection successful.' : 'Supabase connection test returned no data.');
      } catch (error) {
        console.error(error);
        alert(`Supabase connection failed: ${error.message || error}`);
      }
    });
  }

  // Reset database logs
  document.getElementById('clear-database-btn').addEventListener('click', async () => {
    if (confirm(t('resetConfirm'))) {
      try {
        await clearDatabase();
        alert(t('dbCleared'));
        AppState.refreshCache();
      } catch (error) {
        console.error(error);
        alert(t('dbClearError') || 'Unable to clear database.');
      }
    }
  });

  // Logout
  document.getElementById('logout-btn').addEventListener('click', () => {
    if (confirm(t('logoutConfirm'))) {
      AppState.logout();
    }
  });
}
