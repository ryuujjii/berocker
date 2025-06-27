if (history.scrollRestoration == "auto") {
    history.scrollRestoration = "manual";
}
window.addEventListener("onbeforeunload", function () {
    window.scrollTo(0, 0);
    gsap.to(window, { duration: 0, scrollTo: 0 });
});
window.addEventListener("unload", function () {
    window.scrollTo(0, 0);
    gsap.to(window, { duration: 0, scrollTo: 0 });
});

import { plugins } from "./base/plugins.js";
import { lenis } from "./base/lenis.js";
import { validationPhoneInput } from "./components/validPhone.js";
import { loader } from "./base/loader.js";

// Sections
import { header } from "./components/header.js";
import { truckCanvas } from "./components/truck-canvas.js";
import { accordion } from "./sections/accordion.js";
import { commentSwiper } from "./sections/commentSwiper.js";
import { faq } from "./sections/faq.js";
import { services } from "./sections/services.js";
import { platform } from "./sections/platform.js";
import { intro } from "./sections/intro.js";

//Components
import { tabs } from "./components/tabs.js";
import { modals } from "./components/modals.js";
import { formUtils } from "./components/formUtils.js";
// import { datepicker } from "./components/datepicker.js";
import { actionVideo } from "./components/actionVideo.js";
import { scrollShowElem } from "./components/scrollShowElem.js";
import entries from "./sections/entries.js";

window.addEventListener("load", () => {
    plugins();
    Swiper.use([Navigation, Autoplay, Pagination, EffectFade]);
    loader()
    // lenis();
    validationPhoneInput();
    header()
    if (document.body.classList.contains('home')) {
        intro();
        accordion();
        commentSwiper();
        services()
        tabs();
        platform();
        // formUtils();
        // datepicker();
        actionVideo()
    } else {
        scrollShowElem()
    }
    modals();
    entries()
    faq();
    truckCanvas();

    // Zoom Site Disabled
    document.addEventListener('gesturestart', function (e) {
        e.preventDefault();
        document.body.style.zoom = 1;
    });

    document.addEventListener('gesturechange', function (e) {
        e.preventDefault();
        document.body.style.zoom = 1;
    });

    document.addEventListener('gestureend', function (e) {
        e.preventDefault();
        document.body.style.zoom = 1;
    });
})
