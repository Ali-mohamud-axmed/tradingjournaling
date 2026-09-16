import { AppState } from '../state.js';
import { t } from '../translations.js';
import { getAllUsers, updateUser, registerUser, getStoreData } from '../db.js';

export async function renderAdmin(container) {
  // 1. Fetch data
  const users = await getAllUsers();
  const liveTrades = await getStoreData('TradingJournal');
  const backtestTrades = await getStoreData('BacktestingJournal');
  
  // Calculations
  const totalUsersCount = users.length;
  const activeCount = users.filter(u => u.status === 'active').length;
  const suspendedCount = users.filter(u => u.status === 'suspended').length;
  
  const allTrades = [...liveTrades, ...backtestTrades];
  const totalTradesCount = allTrades.length;
  const winCount = allTrades.filter(t => t.result === 'Win').length;
  const winRatePercent = totalTradesCount > 0 
    ? ((winCount / totalTradesCount) * 100).toFixed(1) + '%' 
    : '0.0%';

  // Render Layout
  container.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 32px;">
      
      <!-- Metrics Grid -->
      <div class="metrics-grid">
        <!-- Total Users -->
        <div class="metric-card">
          <span class="metric-card-label">${t('totalUsers')}</span>
          <div class="metric-card-value">${totalUsersCount}</div>
          <div class="metric-card-sub">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--accent-color);"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            <span>System Traders</span>
          </div>
        </div>

        <!-- Active Users -->
        <div class="metric-card">
          <span class="metric-card-label">${t('activeUsers')}</span>
          <div class="metric-card-value">${activeCount}</div>
          <div class="metric-card-sub">
            <span class="badge badge-win" style="padding: 2px 6px; font-size: 10px;">Active</span>
          </div>
        </div>

        <!-- Suspended Users -->
        <div class="metric-card">
          <span class="metric-card-label">${t('suspendedUsers')}</span>
          <div class="metric-card-value">${suspendedCount}</div>
          <div class="metric-card-sub">
            <span class="badge badge-loss" style="padding: 2px 6px; font-size: 10px;">Suspended</span>
          </div>
        </div>

        <!-- Total Trade Logs -->
        <div class="metric-card">
          <span class="metric-card-label">${t('totalLogs')}</span>
          <div class="metric-card-value">${totalTradesCount}</div>
          <div class="metric-card-sub">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--accent-secondary);"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            <span>Live + Backtesting</span>
          </div>
        </div>

        <!-- System Win Rate -->
        <div class="metric-card">
          <span class="metric-card-label">${t('systemWinRate')}</span>
          <div class="metric-card-value" style="color: var(--color-win);">${winRatePercent}</div>
          <div class="metric-card-sub">
            <span class="metric-trend-up">★</span>
            <span>Avg Win Accuracy</span>
          </div>
        </div>
      </div>

      <!-- Main Action Area: Table & Creation -->
      <div style="display: grid; grid-template-columns: 2.2fr 1fr; gap: 28px; align-items: start;">
        
        <!-- User Accounts Table -->
        <div class="card" style="padding: 24px; min-height: 400px; display: flex; flex-direction: column; gap: 20px;">
          <div class="card-header" style="margin-bottom: 0;">
            <div class="card-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="10" rx="2" ry="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/></svg>
              ${t('registeredUsers')}
            </div>
          </div>

          <div class="table-container">
            <table class="table">
              <thead>
                <tr>
                  <th>${t('colUsername')}</th>
                  <th>${t('colEmail')}</th>
                  <th>${t('colRole')}</th>
                  <th>${t('colStatus')}</th>
                  <th>${t('colRegistered')}</th>
                  <th>${t('colActions')}</th>
                </tr>
              </thead>
              <tbody id="users-table-body">
                <!-- User rows rendered dynamically -->
              </tbody>
            </table>
          </div>
        </div>

        <!-- Add New User Form -->
        <div class="card" style="padding: 24px;">
          <div class="card-header">
            <div class="card-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
              ${t('titleAddNewUser')}
            </div>
          </div>

          <form id="admin-create-user-form" style="display: flex; flex-direction: column; gap: 16px;">
            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label">${t('usernameLabel')}</label>
              <input type="text" id="admin-user-name" class="form-control" placeholder="HassanFX" required>
            </div>
            
            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label">${t('emailLabel')}</label>
              <input type="email" id="admin-user-email" class="form-control" placeholder="hassan@trademaster.com" required>
            </div>

            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label">${t('passwordLabel')}</label>
              <input type="password" id="admin-user-pass" class="form-control" placeholder="••••••••" required>
            </div>

            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label">${t('colRole')}</label>
              <select id="admin-user-role" class="form-control">
                <option value="user" selected>User (Standard Trader)</option>
                <option value="admin">Admin (System Manager)</option>
              </select>
            </div>

            <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 12px; height: 42px;">
              ${t('btnSaveUser')}
            </button>
          </form>
        </div>

      </div>
    </div>
  `;

  // 2. Render Users list
  const tableBody = document.getElementById('users-table-body');
  renderUsersRows(users, tableBody);

  // 3. Handle Form Submission
  const createUserForm = document.getElementById('admin-create-user-form');
  createUserForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('admin-user-name').value.trim();
    const email = document.getElementById('admin-user-email').value.trim();
    const password = document.getElementById('admin-user-pass').value;
    const role = document.getElementById('admin-user-role').value;

    const existingUsers = await getAllUsers();
    if (existingUsers.some(u => u.email === email)) {
      alert(t('emailExists'));
      return;
    }

    const newUser = {
      username,
      email,
      password,
      role,
      status: 'active',
      registeredAt: new Date().toISOString().split('T')[0],
      avatar: username.slice(0, 2).toUpperCase(),
      currency: 'USD',
      riskDefault: 1.0,
      notifications: true
    };

    await registerUser(newUser);
    
    // Seed default checklists/strategies for this user email
    try {
      const { addStoreData } = await import('../db.js');
      const defaultStrats = [
        { name: 'SMC Order Block', description: 'Trading refined order blocks on 15m/5m timeframe aligning with HTF order flow.', userEmail: email },
        { name: 'Liquidity Grab & Reversal', description: 'Fading structural high/low grabs at New York/London session opens.', userEmail: email }
      ];
      for (const s of defaultStrats) {
        await addStoreData('Strategies', s);
      }
      const defaultChecks = [
        { name: 'Standard Confirmation', items: ['HTF Trend Aligned', 'Liquidity Swept', 'MSS on LTF', 'OB Tapped', 'Risk defined', 'Order Flow', 'KL', 'TS', 'SMT / 2SMT', '5M #'], userEmail: email }
      ];
      for (const c of defaultChecks) {
        await addStoreData('Checklists', c);
      }
    } catch (err) {
      console.error(err);
    }

    alert(t('userCreatedMsg'));
    createUserForm.reset();
    
    // Refresh admin panel
    renderAdmin(container);
  });
}

function renderUsersRows(users, tableBody) {
  tableBody.innerHTML = '';
  
  users.forEach(u => {
    const isSelf = AppState.user && AppState.user.email === u.email;
    const tr = document.createElement('tr');
    
    // Setup badges
    const roleClass = u.role === 'admin' ? 'badge-buy' : 'badge-session';
    const statusClass = u.status === 'active' ? 'badge-win' : 'badge-loss';
    
    tr.innerHTML = `
      <td>
        <div style="display: flex; align-items: center; gap: 10px;">
          <div class="avatar" style="width: 32px; height: 32px; font-size: 11px; margin: 0; background: var(--bg-tertiary); border: 1px solid var(--border-color);">${u.avatar || u.username.slice(0,2).toUpperCase()}</div>
          <span style="font-weight: 600; color: var(--text-primary);">${u.username} ${isSelf ? ' <span style="font-size:10px; color:var(--text-muted);">(You)</span>' : ''}</span>
        </div>
      </td>
      <td>${u.email}</td>
      <td><span class="badge ${roleClass}">${u.role.toUpperCase()}</span></td>
      <td><span class="badge ${statusClass}">${u.status.toUpperCase()}</span></td>
      <td>${u.registeredAt || '-'}</td>
      <td>
        <div style="display: flex; gap: 8px;">
          <button class="btn btn-secondary btn-status-toggle" style="padding: 6px 10px; font-size: 11px;" ${isSelf ? 'disabled' : ''}>
            ${u.status === 'active' ? t('btnSuspend') : t('btnActivate')}
          </button>
          <button class="btn btn-secondary btn-role-toggle" style="padding: 6px 10px; font-size: 11px;" ${isSelf ? 'disabled' : ''}>
            ${u.role === 'admin' ? t('btnDemote') : t('btnMakeAdmin')}
          </button>
        </div>
      </td>
    `;
    
    // Add event listener for status toggle
    tr.querySelector('.btn-status-toggle').addEventListener('click', async () => {
      if (isSelf) {
        alert(t('cannotSuspendSelf'));
        return;
      }
      u.status = u.status === 'active' ? 'suspended' : 'active';
      await updateUser(u);
      
      // If user session is active and user is suspended, they will be logged out on next state init/refresh.
      // For immediate effect:
      alert(t('userUpdatedMsg'));
      const rootContainer = document.getElementById('content-viewport');
      if (rootContainer) {
        renderAdmin(rootContainer);
      }
    });

    // Add event listener for role toggle
    tr.querySelector('.btn-role-toggle').addEventListener('click', async () => {
      if (isSelf) {
        alert(t('cannotDemoteSelf'));
        return;
      }
      u.role = u.role === 'admin' ? 'user' : 'admin';
      await updateUser(u);
      alert(t('userUpdatedMsg'));
      const rootContainer = document.getElementById('content-viewport');
      if (rootContainer) {
        renderAdmin(rootContainer);
      }
    });

    tableBody.appendChild(tr);
  });
}
