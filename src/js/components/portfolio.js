import { AppState, getPortfolioAccounts } from '../state.js';

export function renderPortfolio(container) {
  const user = AppState.user || {};
  const accounts = getPortfolioAccounts();
  const balanceOf = account => account.field ? Number(user[account.field] ?? 0) : Number(account.balance ?? 0);
  const total = accounts.reduce((sum, account) => sum + balanceOf(account), 0);
  const currency = user.currency || 'USD';
  const formatMoney = value => new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 2 }).format(Number(value) || 0);

  container.innerHTML = `
    <div class="portfolio-page">
      <div class="portfolio-heading">
        <div>
          <div class="eyebrow">Capital overview</div>
          <h1>Portfolio Accounts</h1>
          <p>Track the live balance of every account. Trade P/L is applied automatically after each save or deletion.</p>
        </div>
        <div class="portfolio-heading-actions"><button class="btn btn-primary" id="add-portfolio-account-btn">+ Add Account</button><div class="portfolio-total"><span>Total portfolio</span><strong>${formatMoney(total)}</strong></div></div>
      </div>
      <div class="portfolio-grid">
        ${accounts.map(account => `
          <article class="card portfolio-account-card" style="--account-accent: ${account.accent};">
            <div class="portfolio-card-top"><span class="portfolio-account-dot"></span><span class="portfolio-account-label">${account.name}</span><span class="portfolio-card-menu">•••</span></div>
            <div class="portfolio-balance-label">Current balance</div>
            <div class="portfolio-balance">${formatMoney(balanceOf(account))}</div>
            <div class="portfolio-card-footer"><span>${account.note}</span><span class="portfolio-live-state">Live</span></div>
          </article>
        `).join('')}
      </div>
      <div class="card portfolio-info-card">
        <div class="portfolio-info-icon">↗</div>
        <div><strong>Automatic balance updates</strong><p>Winning P/L is added to the selected account and losing P/L is deducted. Editing a trade applies only the balance difference.</p></div>
      </div>
    </div>
  `;

  document.getElementById('add-portfolio-account-btn').addEventListener('click', async () => {
    const account = await requestPortfolioAccount();
    if (!account) return;
    const existing = Array.isArray(AppState.user.portfolioAccounts) ? AppState.user.portfolioAccounts : [];
    await AppState.updateProfile({ portfolioAccounts: [...existing, account] });
    renderPortfolio(container);
  });
}

function requestPortfolioAccount() {
  return new Promise(resolve => {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay active portfolio-account-modal-overlay';
    overlay.innerHTML = `<div class="modal-container portfolio-account-modal"><div class="modal-header"><div><div class="modal-kicker">Portfolio Library</div><h3>Add Portfolio Account</h3></div><button class="modal-close" data-cancel>&times;</button></div><div class="modal-body"><label class="form-label">Account Name</label><input id="new-portfolio-account-name" class="form-control" placeholder="e.g. Prop Firm Alpha"><label class="form-label" style="margin-top:14px;">Starting Balance</label><input id="new-portfolio-account-balance" type="number" step="0.01" class="form-control" placeholder="e.g. 25000"><p class="portfolio-account-helper">P/L from selected trades will update this balance automatically.</p></div><div class="modal-footer"><button class="btn btn-secondary" data-cancel>Cancel</button><button class="btn btn-primary" data-confirm>Add Account</button></div></div>`;
    document.body.appendChild(overlay);
    const finish = value => { overlay.remove(); resolve(value); };
    const name = overlay.querySelector('#new-portfolio-account-name');
    const balance = overlay.querySelector('#new-portfolio-account-balance');
    overlay.querySelectorAll('[data-cancel]').forEach(button => button.addEventListener('click', () => finish(null)));
    overlay.querySelector('[data-confirm]').addEventListener('click', () => {
      const trimmed = name.value.trim();
      const amount = Number(balance.value);
      finish(trimmed && Number.isFinite(amount) ? { id: `custom-${Date.now()}`, name: trimmed, balance: Number(amount.toFixed(2)), note: 'Custom trading account' } : null);
    });
    overlay.addEventListener('click', event => { if (event.target === overlay) finish(null); });
    requestAnimationFrame(() => name.focus());
  });
}
