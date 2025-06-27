import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import { ScrollToPlugin } from 'gsap/ScrollToPlugin.js';
import Swiper from "swiper";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules"
import Datepicker from 'js-datepicker';

export function plugins() {
    window.gsap = gsap;
    window.ScrollTrigger = ScrollTrigger;
    window.ScrollToPlugin = ScrollToPlugin;
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    window.Swiper = Swiper
    window.Navigation = Navigation
    window.Autoplay = Autoplay
    window.Pagination = Pagination
    window.EffectFade = EffectFade
    window.Datepicker = Datepicker
}
