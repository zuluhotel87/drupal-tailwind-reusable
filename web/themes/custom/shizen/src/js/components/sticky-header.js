document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header.sticky');
  const container = header?.querySelector('.container');
  const adminToolbar = document.getElementById('toolbar-bar');
  if (!header || !container) return;

  const MOBILE_BREAKPOINT = 768;

  const isMobile = () => window.innerWidth <= MOBILE_BREAKPOINT;

  const updateOffset = () => {
    const topOffset = (!adminToolbar || isMobile()) ? 0 : adminToolbar.offsetHeight;
    header.style.top = `${topOffset}px`;
  };

  const updateHeader = () => {
    const scrolled = window.scrollY > 10;
    container.classList.toggle('py-10', !scrolled);
    container.classList.toggle('py-2', scrolled);
    header.classList.toggle('shadow-md', scrolled);
  };

  // Restore scroll position on load
  const savedScrollY = sessionStorage.getItem('scrollPosition');
  if (savedScrollY !== null) {
    window.scrollTo(0, parseInt(savedScrollY, 10));
  }

  // Initial run
  updateOffset();
  updateHeader();

  window.addEventListener('resize', () => {
    updateOffset();
    updateHeader();
  });

  window.addEventListener('scroll', () => {
    updateHeader();
    // Save scroll position continuously (throttle if needed)
    sessionStorage.setItem('scrollPosition', window.scrollY);
  });

  if (adminToolbar) {
    new MutationObserver(updateOffset).observe(adminToolbar, { attributes: true, attributeFilter: ['class', 'style'] });
  }
});
