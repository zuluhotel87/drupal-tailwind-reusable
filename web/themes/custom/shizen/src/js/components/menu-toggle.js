(function (Drupal, once) {
  Drupal.behaviors.responsiveMenuToggle = {
    attach(context) {
      const LG_BREAKPOINT = 1024;

      once('responsive-toggle', '[data-collapse-toggle]', context).forEach((toggleButton) => {
        const menuId = toggleButton.getAttribute('data-collapse-toggle');
        const menu = document.getElementById(menuId);

        if (!menu) return;

        toggleButton.addEventListener('click', () => {
          if (window.innerWidth >= LG_BREAKPOINT) return;

          const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true';
          toggleButton.setAttribute('aria-expanded', String(!isExpanded));

          menu.classList.toggle('max-h-0');
          menu.classList.toggle('max-h-500');
        });
      });
    }
  };
})(Drupal, once);
