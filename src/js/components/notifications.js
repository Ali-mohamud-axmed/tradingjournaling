export function showTradeSavedNotification(message = 'Trade saved successfully') {
  showTradeNotification(message, 'Your trade has been added to the journal.', 'success');
}

export function showTradeDeletedNotification(message = 'Trade deleted') {
  showTradeNotification(message, 'The trade was removed from your journal.', 'danger');
}

function showTradeNotification(message, detail, type) {
  document.querySelector('.trade-save-success')?.remove();

  const notification = document.createElement('div');
  notification.className = `trade-save-success trade-save-${type}`;
  notification.setAttribute('role', 'status');
  notification.innerHTML = `
    <div class="trade-save-success-icon">${type === 'danger' ? '×' : '✓'}</div>
    <div>
      <strong>${message}</strong>
      <span>${detail}</span>
    </div>
    <button type="button" class="trade-save-success-close" aria-label="Close">&times;</button>
  `;
  document.body.appendChild(notification);

  const close = () => {
    notification.classList.add('is-closing');
    window.setTimeout(() => notification.remove(), 180);
  };
  notification.querySelector('.trade-save-success-close').addEventListener('click', close);
  window.setTimeout(close, 3600);
}
