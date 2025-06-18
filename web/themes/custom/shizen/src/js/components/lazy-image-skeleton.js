(function (Drupal, once) {
  Drupal.behaviors.lazyImageSkeleton = {
    attach(context) {
      once('lazy-image', 'img[loading="lazy"]', context).forEach((img) => {
        const container = img.closest('.relative');
        const overlay = container?.querySelector('.skeleton-overlay');

        function onLoad() {
          overlay?.remove();
          img.classList.remove('invisible');
        }

        img.classList.add('invisible');

        if (img.complete) {
          onLoad();
        } else {
          img.addEventListener('load', onLoad);
        }
      });
    }
  };
})(Drupal, once);
