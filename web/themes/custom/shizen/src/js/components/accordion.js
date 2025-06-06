import { Accordion } from 'flowbite';

class TransitionAccordion extends Accordion
{
  open(id) {
    const item = this.getItem(id);

    if (!this._options.alwaysOpen) {
      this._items.forEach(i => {
        if (i !== item) {
          i.triggerEl.classList.remove(...this._options.activeClasses.split(' '));
          i.triggerEl.classList.add(...this._options.inactiveClasses.split(' '));
          i.triggerEl.setAttribute('aria-expanded', 'false');
          i.active = false;
          i.targetEl.style.maxHeight = "0px";

          if (i.iconEl) {
            i.iconEl.classList.add('rotate-180');
          }

          this._options.onClose(this, i);
        }
      });
    }

    item.triggerEl.classList.add(...this._options.activeClasses.split(' '));
    item.triggerEl.classList.remove(...this._options.inactiveClasses.split(' '));
    item.triggerEl.setAttribute('aria-expanded', 'true');
    item.active = true;

    if (item.iconEl) {
      item.iconEl.classList.remove('rotate-180');
    }

    this._options.onOpen(this, item);
  }

  close(id) {
    const item = this.getItem(id);
    item.triggerEl.classList.remove(...this._options.activeClasses.split(' '));
    item.triggerEl.classList.add(...this._options.inactiveClasses.split(' '));
    item.triggerEl.setAttribute('aria-expanded', 'false');
    item.active = false;

    if (item.iconEl) {
      item.iconEl.classList.add('rotate-180');
    }

    this._options.onClose(this, item);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const accordions = document.querySelectorAll('[accordion]');

  accordions.forEach(accordionEl => {
    const items = Array.from(accordionEl.querySelectorAll('[data-accordion-target]')).map(item => ({
      id: item.getAttribute('data-accordion-target'),
      triggerEl: item,
      targetEl: document.querySelector(item.getAttribute('data-accordion-target')),
      iconEl: item.querySelector('[data-accordion-icon]')
    }));

    const options = {
      alwaysOpen: false,
      activeClasses: accordionEl.dataset.activeClasses || '',
      inactiveClasses: accordionEl.dataset.inactiveClasses || '',
      onOpen: (accordion, item) => {
        const target = item.targetEl;
        target.style.maxHeight = target.scrollHeight + 'px';
      },
      onClose: (accordion, item) => {
        const target = item.targetEl;
        target.style.maxHeight = '0px';
      }
    };

    new TransitionAccordion(accordionEl, items, options);
  });
});
