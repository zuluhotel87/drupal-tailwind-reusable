import Swiper from 'swiper';
import { Navigation, EffectCards, EffectCoverflow, EffectCube, EffectFade, EffectFlip } from 'swiper/modules';
import 'swiper/css/bundle';
import 'swiper/css/effect-cards';
import 'swiper/css/effect-coverflow';
import 'swiper/css/effect-cube';
import 'swiper/css/effect-fade';
import 'swiper/css/effect-flip';

document.addEventListener('DOMContentLoaded', function () {
    const settings = drupalSettings['shizen']['swiper'];
    const defaultConfig = {
        modules: [Navigation, EffectCards, EffectCoverflow, EffectCube, EffectFade, EffectFlip],
        a11y: true,
        allowTouchMove: true,
        centeredSlides: true,
        loop: true,
        speed: 100,
        watchSlidesProgress: true,
        navigation: {
            nextEl: '.swiper-btn-next',
            prevEl: '.swiper-btn-prev',
        },
    };

    const swiper = new Swiper('.swiper', {
        ...defaultConfig,
        ...settings
    });
});
