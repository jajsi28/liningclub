/* toast.js — polished toast notification system
   - place <link rel="stylesheet" href="toast.css"> in <head>
   - include <script src="toast.js"></script> before closing </body>
   Usage:
     showToast('Message', 'success'|'error'|'info'|'warn', 3500, 'Optional title');
*/

(function () {
  if (window.showToast) return;

  // create container
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  // helper: pick icon (SVG) by type
  function iconFor(type) {
    if (type === 'success') return '✓';
    if (type === 'error') return '⚠';
    if (type === 'warn') return '!';
    return 'ℹ';
  }

  // create toast
  window.showToast = function (message = '', type = 'info', duration = 3500, title = '') {
    duration = Number(duration) || 3500;
    type = ['success', 'error', 'info', 'warn'].includes(type) ? type : 'info';

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.setAttribute('tabindex', '0');

    // content row
    const row = document.createElement('div');
    row.className = 'toast-row';

    const icon = document.createElement('div');
    icon.className = 'toast-icon';
    icon.innerHTML = iconFor(type);

    const body = document.createElement('div');
    body.className = 'toast-body';
    if (title) {
      const t = document.createElement('div');
      t.className = 'toast-title';
      t.textContent = title;
      body.appendChild(t);
    }
    const msg = document.createElement('div');
    msg.className = 'toast-message';
    msg.textContent = message;
    body.appendChild(msg);

    const close = document.createElement('button');
    close.className = 'toast-close';
    close.setAttribute('aria-label', 'Close notification');
    close.innerHTML = '✕';

    row.appendChild(icon);
    row.appendChild(body);
    row.appendChild(close);

    // progress bar
    const progressWrap = document.createElement('div');
    progressWrap.className = 'toast-progress';
    const progressBar = document.createElement('div');
    progressBar.className = 'bar';
    progressWrap.appendChild(progressBar);

    toast.appendChild(row);
    toast.appendChild(progressWrap);

    // append
    container.appendChild(toast);

    // show animation (next frame)
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    // Timing and pause/resume logic
    let start = Date.now();
    let remaining = duration;
    let dismissed = false;
    let timeoutId = null;
    let rafId = null;

    // update progress via requestAnimationFrame
    function startProgress(dur) {
      start = Date.now();
      remaining = dur;
      // ensure any previous animation frame cleared
      if (rafId) cancelAnimationFrame(rafId);

      function tick() {
        const elapsed = Date.now() - start;
        const pct = Math.max(0, Math.min(1, 1 - (elapsed / remaining)));
        // scaleX from 0..1 where 0 is finished, so set transform based on pct
        progressBar.style.transform = `scaleX(${pct})`;
        if (elapsed >= remaining) {
          // time up
          dismiss();
          return;
        }
        rafId = requestAnimationFrame(tick);
      }
      rafId = requestAnimationFrame(tick);
    }

    function startTimer(dur) {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        dismiss();
      }, dur);
    }

    function pause() {
      // compute elapsed and remaining
      const elapsed = Date.now() - start;
      remaining = Math.max(0, remaining - elapsed);
      if (timeoutId) clearTimeout(timeoutId);
      if (rafId) cancelAnimationFrame(rafId);
    }

    function resume() {
      startProgress(remaining);
      startTimer(remaining);
    }

    function dismiss() {
      if (dismissed) return;
      dismissed = true;
      // remove show and add hide for exit animation
      toast.classList.remove('show');
      toast.classList.add('hide');
      // cleanup timers
      if (timeoutId) { clearTimeout(timeoutId); timeoutId = null; }
      if (rafId) { cancelAnimationFrame(rafId); rafId = null; }

      // wait for transition to end then remove
      const removeAfter = 320;
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, removeAfter);
    }

    // start progress + timer
    startProgress(duration);
    startTimer(duration);

    // hover to pause/resume
    toast.addEventListener('mouseenter', () => {
      toast.classList.add('paused');
      pause();
    });
    toast.addEventListener('mouseleave', () => {
      toast.classList.remove('paused');
      resume();
    });

    // close button
    close.addEventListener('click', (e) => {
      e.stopPropagation();
      dismiss();
    });

    // allow clicking toast to dismiss quickly
    toast.addEventListener('click', (e) => {
      if (e.target === close) return;
      dismiss();
    });

    // keyboard support: ESC to close when focused
    toast.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') dismiss();
    });

    // return a handle
    return {
      dismiss: () => dismiss()
    };
  };
})();
