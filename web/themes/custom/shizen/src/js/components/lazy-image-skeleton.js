(function (Drupal, once) {
  Drupal.behaviors.lazyImageSkeleton = {
    attach(context) {
      once('lazy-image', 'img[loading="lazy"]', context).forEach((img) => {
        const wrapper = img.closest('.relative');

        function onLoad() {
          wrapper?.querySelector('.skeleton-loader')?.remove();
          img.classList.remove('invisible');
        }

        // Hide initially
        img.classList.add('invisible');

        // Already loaded
        if (img.complete) {
          onLoad();
        } else {
          img.addEventListener('load', onLoad);
        }
      });
    }
  };
})(Drupal, once);
