(function (Drupal, once) {
  Drupal.behaviors.analyticsEvents = {
    attach(context) {
      once('ga-event', '[data-ga-event]', context).forEach((el) => {
        el.addEventListener('click', () => {
          const category = el.getAttribute('data-ga-category');
          const action = el.getAttribute('data-ga-action');
          const label = el.getAttribute('data-ga-label') || undefined;
          const value = el.getAttribute('data-ga-value');

          if (typeof gtag === 'function') {
            gtag('event', action, {
              event_category: category,
              event_label: label,
              value: value ? parseInt(value) : undefined,
            });
          }
        });
      });
    }
  };
})(Drupal, once);
