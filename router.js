// ===== APEX Router =====

let currentPage = 'home';
window.currentRouteParams = null;

function navigate(page, params = null) {
  const overlay = document.getElementById('transitionOverlay');
  window.currentRouteParams = params;

  // Fade out
  overlay.style.opacity = '1';
  overlay.style.pointerEvents = 'all';

  setTimeout(() => {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));

    // Show target
    const target = document.getElementById('page-' + page);
    if (target) {
      target.classList.remove('hidden');
      // Fire a custom event so the page can re-render or load data based on params
      if (page === 'brands' && typeof renderBrands === 'function') renderBrands();
      if (page === 'about' && typeof renderAbout === 'function') renderAbout();
      window.dispatchEvent(new CustomEvent('page-navigated', { detail: { page, params } }));
      
      // Re-trigger animations
      target.querySelectorAll('[class*="anim-"]').forEach(el => {
        el.style.animationName = 'none';
        requestAnimationFrame(() => {
          requestAnimationFrame(() => { el.style.animationName = ''; });
        });
      });
      // Trigger stat bars
      setTimeout(() => animateStatBars(target), 300);
    }

    // Update nav active state
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.dataset.page === page) link.classList.add('active');
    });

    currentPage = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Fade in
    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';
  }, 280);
}

function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('hidden');
  menu.classList.toggle('flex');
}

function animateStatBars(container) {
  container.querySelectorAll('.stat-bar').forEach(bar => {
    const target = bar.dataset.width || '0%';
    bar.style.width = target;
  });
}

// Counter animation
function animateCounters(container) {
  container.querySelectorAll('[data-count]').forEach(el => {
    const target = parseFloat(el.dataset.count);
    const decimals = el.dataset.decimals || 0;
    const suffix = el.dataset.suffix || '';
    let start = 0;
    const duration = 1800;
    const step = timestamp => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = (eased * target).toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}
