import { AppState } from '../state.js';

let activeGallerySource = 'live'; // 'live' or 'backtest'
let galleryOutcomeFilter = 'All'; // 'All', 'Win', 'Loss', 'Break Even'

export function renderGallery(container) {
  const trades = activeGallerySource === 'live' ? AppState.tradingTrades : AppState.backtestTrades;

  // Normalize trades for display consistency between live and backtest
  const normalized = trades.map(t => {
    const isBack = t.before_image !== undefined || t.after_image !== undefined;
    return {
      id: t.id,
      pair: t.pair,
      date: t.date,
      session: t.session,
      result: t.result,
      direction: isBack ? t.direction : t.type,
      targetRR: isBack ? (t.target_rr || 0) : (t.rr || 0),
      lessonLearned: isBack ? (t.lesson_learned || '') : (t.lessonLearned || ''),
      beforeImage: isBack ? t.before_image : t.beforeScreenshot,
      afterImage: isBack ? t.after_image : t.afterScreenshot
    };
  });

  // Filter to only those that have at least one screenshot
  let filtered = normalized.filter(t => t.beforeImage || t.afterImage);

  // Apply outcome filters
  if (galleryOutcomeFilter !== 'All') {
    filtered = filtered.filter(t => t.result === galleryOutcomeFilter);
  }

  // Render Frame
  container.innerHTML = `
    <!-- Gallery Controls Header -->
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 28px; flex-wrap: wrap; gap: 16px;">
      
      <div style="display: flex; gap: 8px; background: var(--bg-secondary); padding: 4px; border-radius: var(--border-radius-md); border: 1px solid var(--border-color);">
        <button class="btn ${activeGallerySource === 'live' ? 'btn-primary' : 'btn-secondary'}" id="gal-btn-live" style="padding: 8px 16px; font-size: 13px;">Trading Screenshots</button>
        <button class="btn ${activeGallerySource === 'backtest' ? 'btn-primary' : 'btn-secondary'}" id="gal-btn-backtest" style="padding: 8px 16px; font-size: 13px;">Backtesting Screenshots</button>
      </div>

      <div style="display: flex; gap: 12px; align-items: center;">
        <span style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Result Filter</span>
        <select id="gal-filter-outcome" class="form-control" style="padding: 6px 12px; font-size: 13px; width: 140px; height: 34px;">
          <option value="All" ${galleryOutcomeFilter === 'All' ? 'selected' : ''}>All Screenshots</option>
          <option value="Win" ${galleryOutcomeFilter === 'Win' ? 'selected' : ''}>Wins Only</option>
          <option value="Loss" ${galleryOutcomeFilter === 'Loss' ? 'selected' : ''}>Losses Only</option>
          <option value="Break Even" ${galleryOutcomeFilter === 'Break Even' ? 'selected' : ''}>Break Evens Only</option>
        </select>
      </div>

    </div>

    <!-- Gallery Grid -->
    <div class="gallery-grid" id="screenshot-gallery-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
      <!-- Populated by script -->
    </div>
  `;

  const grid = document.getElementById('screenshot-gallery-grid');

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 64px 0; color: var(--text-muted);">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom: 12px;"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
        <p style="font-weight: 600; font-size:15px; color: var(--text-primary);">No screenshots found</p>
        <p style="font-size: 13px; margin-top: 4px;">Upload Before/After charts when logging trades to populate your gallery.</p>
      </div>
    `;
  } else {
    grid.innerHTML = filtered.map(t => {
      const typeBadge = t.direction === 'Buy' ? 'badge-buy' : 'badge-sell';
      const rBadge = t.result === 'Win' ? 'badge-win' : (t.result === 'Loss' ? 'badge-loss' : 'badge-be');
      
      return `
        <div class="gallery-card" data-id="${t.id}" style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--border-radius-lg); overflow: hidden; box-shadow: var(--shadow-sm); display: flex; flex-direction: column;">
          <!-- Card Header -->
          <div style="padding: 16px; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; background: rgba(255, 255, 255, 0.01);">
            <div>
              <span style="font-size: 15px; font-weight: 700; color: var(--text-primary);">${t.pair}</span>
              <div style="font-size: 11px; color: var(--text-muted); margin-top: 2px;">${t.date} (${t.session})</div>
            </div>
            <span class="badge ${rBadge}">${t.result}</span>
          </div>

          <!-- Stacked Images Area -->
          <div style="padding: 12px; display: flex; flex-direction: column; align-items: center; gap: 8px; background: rgba(0,0,0,0.15);">
            <!-- Before Image -->
            <div class="gallery-image-viewport" style="width: 100%; aspect-ratio: 16/9; position: relative; border-radius: var(--border-radius-sm); overflow: hidden; border: 1px solid var(--border-color); background: #000;">
              ${t.beforeImage 
                ? `<img src="${t.beforeImage}" style="width: 100%; height: 100%; object-fit: cover; cursor: pointer;" class="gallery-trigger-img" data-id="${t.id}">` 
                : `<div style="display:flex; align-items:center; justify-content:center; height:100%; color:var(--text-muted); font-size:12px;">No Before Image</div>`
              }
              <div style="position: absolute; bottom: 8px; left: 8px; background: rgba(0,0,0,0.7); color: #fff; font-size: 9px; font-weight: bold; padding: 2px 6px; border-radius: 4px; letter-spacing: 0.05em; border: 1px solid rgba(255,255,255,0.1);">BEFORE SETUP</div>
            </div>

            <!-- Separator Arrow -->
            <div style="display: flex; align-items: center; justify-content: center; width: 26px; height: 26px; border-radius: 50%; background: var(--bg-tertiary); border: 1px solid var(--border-color); color: var(--accent-color); font-size: 13px; font-weight: bold; z-index: 2; margin: -4px 0;">
              ↓
            </div>

            <!-- After Image -->
            <div class="gallery-image-viewport" style="width: 100%; aspect-ratio: 16/9; position: relative; border-radius: var(--border-radius-sm); overflow: hidden; border: 1px solid var(--border-color); background: #000;">
              ${t.afterImage 
                ? `<img src="${t.afterImage}" style="width: 100%; height: 100%; object-fit: cover; cursor: pointer;" class="gallery-trigger-img" data-id="${t.id}">` 
                : `<div style="display:flex; align-items:center; justify-content:center; height:100%; color:var(--text-muted); font-size:12px;">No After Image</div>`
              }
              <div style="position: absolute; bottom: 8px; left: 8px; background: rgba(0,0,0,0.7); color: #fff; font-size: 9px; font-weight: bold; padding: 2px 6px; border-radius: 4px; letter-spacing: 0.05em; border: 1px solid rgba(255,255,255,0.1);">AFTER OUTCOME</div>
            </div>
          </div>

          <!-- Summary Area -->
          <div class="gallery-card-content" style="padding: 16px; border-top: 1px solid var(--border-color); flex-grow: 1; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                <span class="badge ${typeBadge}">${t.direction}</span>
                <span style="font-size: 13px; font-weight: 600; color: var(--text-secondary);">RR Realized: <strong style="color: var(--text-primary); font-size: 14px;">${t.targetRR}:1</strong></span>
              </div>
              <div style="font-size: 10px; color: var(--text-muted); font-weight: 700; text-transform: uppercase; margin-bottom: 4px; letter-spacing: 0.03em;">Lesson Learned</div>
              <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.4; margin: 0; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; height: 54px;" title="${t.lessonLearned || ''}">
                ${t.lessonLearned || 'No lesson recorded.'}
              </p>
            </div>
            <button class="btn btn-secondary compare-trigger-btn" data-id="${t.id}" style="width: 100%; margin-top: 14px; height: 32px; font-size: 12px;">Compare Charts Slider</button>
          </div>
        </div>
      `;
    }).join('');

    // Click details triggers comparison slider
    grid.querySelectorAll('.gallery-trigger-img').forEach(img => {
      img.addEventListener('click', () => {
        const id = Number(img.dataset.id);
        const trade = filtered.find(t => t.id === id);
        if (trade) openGalleryFullscreenViewer(trade);
      });
    });

    grid.querySelectorAll('.compare-trigger-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = Number(btn.dataset.id);
        const trade = filtered.find(t => t.id === id);
        if (trade) openGalleryFullscreenViewer(trade);
      });
    });
  }

  // Bind controls
  document.getElementById('gal-btn-live').addEventListener('click', () => {
    activeGallerySource = 'live';
    renderGallery(container);
  });
  document.getElementById('gal-btn-backtest').addEventListener('click', () => {
    activeGallerySource = 'backtest';
    renderGallery(container);
  });
  document.getElementById('gal-filter-outcome').addEventListener('change', (e) => {
    galleryOutcomeFilter = e.target.value;
    renderGallery(container);
  });
}

// Lightbox comparison slider
function openGalleryFullscreenViewer(trade) {
  const viewerModal = document.createElement('div');
  viewerModal.className = 'modal-overlay active';
  viewerModal.style.zIndex = '2000';
  
  viewerModal.innerHTML = `
    <div class="modal-container" style="max-width: 900px; padding:0; background: #000; border-color: rgba(255,255,255,0.1);">
      <div class="modal-header" style="background:#0f131a; border-bottom:1px solid rgba(255,255,255,0.1)">
        <h3>Before & After Comparison: ${trade.pair}</h3>
        <button class="modal-close" id="close-gal-viewer-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <div style="padding:20px; display:flex; flex-direction:column; gap:16px;">
        <div class="slider-overlay-body">
          <div class="comparison-slider-container" id="gal-slider-container">
            <img src="${trade.beforeImage || ''}" class="slider-image slider-image-before">
            <div class="slider-image-after" id="gal-slider-after-container">
              <img src="${trade.afterImage || ''}" class="slider-image" style="width: 800px; max-width: none;">
            </div>
            <div class="slider-handle" id="gal-slider-handle">
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
  viewerModal.querySelector('#close-gal-viewer-btn').addEventListener('click', closeViewer);
  viewerModal.addEventListener('click', (e) => {
    if (e.target === viewerModal) closeViewer();
  });

  const container = viewerModal.querySelector('#gal-slider-container');
  const afterContainer = viewerModal.querySelector('#gal-slider-after-container');
  const handle = viewerModal.querySelector('#gal-slider-handle');
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

  // Touch
  handle.addEventListener('touchstart', () => isDragging = true);
  window.addEventListener('touchend', () => isDragging = false);
  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    updateSlider(e.touches[0].clientX);
  });
}
