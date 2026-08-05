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
    role: 'user'
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
              <label class="form-label">${t('colRole')}</label>
              <input type="text" class="form-control" value="${(user.role || 'user').toUpperCase()}" readonly style="opacity: 0.7; cursor: not-allowed; background: var(--bg-primary);">
            </div>
          </div>
          <div style="display: flex; justify-content: flex-end; margin-top: 8px;">
            <button type="submit" class="btn btn-primary">${t('saveChanges')}</button>
          </div>
        </form>
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
      riskDefault: parseFloat(document.getElementById('set-risk').value || 1)
    };
    AppState.updateProfile(updatedUser);
    alert(t('profileUpdated'));
  });

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
