import { queryMatches } from "../base/utils.js";

export function intro() {

    const swiperIntro = new Swiper('.intro__cards-swiper', {
        slidesPerView: 1,
        speed: 500,
        spaceBetween: 0,
        effect: "fade",
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        loop: true,
        pagination: { el: '.swiper-pagination', clickable: true },
    });
}