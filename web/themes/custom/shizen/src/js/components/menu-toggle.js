document.addEventListener('DOMContentLoaded', function () {
  const toggleButton = document.querySelector('[data-collapse-toggle]');
  const menuId = toggleButton.getAttribute('data-collapse-toggle');
  const menu = document.getElementById(menuId);

  toggleButton.addEventListener('click', function () {
    const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true';

    toggleButton.setAttribute('aria-expanded', String(!isExpanded));
    menu.classList.toggle('desktop-only');
  });
});

