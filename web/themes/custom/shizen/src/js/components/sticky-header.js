(function (Drupal, once) {
  Drupal.behaviors.stickyHeaderAdjust = {
    attach(context) {
      once('sticky-header-adjust', 'header', context).forEach((header) => {
        const container = header.querySelector('.container');
        const adminToolbar = document.getElementById('toolbar-bar');
        if (!container) return;

        const updateOffset = () => {
          const topOffset = adminToolbar ? adminToolbar.offsetHeight : 0;
          header.style.top = `${topOffset}px`;
        };

        const updateHeader = () => {
          const scrolled = window.scrollY > 10;
          container.classList.toggle('py-10', !scrolled);
          container.classList.toggle('py-2', scrolled);
          header.classList.toggle('shadow-md', scrolled);
        };

        // Restore scroll position if available
        const savedScrollY = sessionStorage.getItem('scrollPosition');
        if (savedScrollY !== null) {
          window.scrollTo(0, parseInt(savedScrollY, 10));
        }

        // Initial update
        updateOffset();
        updateHeader();

        // Bind scroll and resize
        const onScroll = () => {
          updateHeader();
          sessionStorage.setItem('scrollPosition', window.scrollY);
        };

        const onResize = () => {
          updateOffset();
          updateHeader();
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onResize);

        // Observe toolbar mutations
        if (adminToolbar) {
          new MutationObserver(updateOffset).observe(adminToolbar, {
            attributes: true,
            attributeFilter: ['class', 'style'],
          });
        }
      });
    }
  };
})(Drupal, once);
