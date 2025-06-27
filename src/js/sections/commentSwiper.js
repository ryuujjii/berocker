
export function commentSwiper() {
    const video = document.querySelectorAll('.comment__video')
    const videoBg = document.querySelectorAll('.comment__video-bg')
    const videoPlay = document.querySelector('.comment__video-play')
    let curIdx = 0
    let userUnmuted = false; // Флаг для отслеживания, включил ли пользователь звук

    function muteAllVideos() {
        video.forEach(v => {
            v.muted = true;
        });
    }

    const swiper = new Swiper('.comment__swiper', {
        slidesPerView: 1,
        speed: 500,
        autoplay: {
            delay: 6000,
            disableOnInteraction: false,
        },
        loop: true,
        pagination: { el: '.swiper-pagination', clickable: true },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        on: {
            slideChange: function () {
                curIdx = this.realIndex
                muteAllVideos(); // Всегда выключаем звук при смене слайда
                video.forEach((el, idx) => {
                    if (idx == this.realIndex) {
                        el.play();
                        videoBg[idx].play()
                    } else {
                        el.pause();
                        el.currentTime = 0;
                        videoBg[idx].pause()
                        videoBg[idx].currentTime = 0;
                    }
                })
            }
        }
    });

    const secSwiper = document.querySelector('.comment__swiper')
    const platformVideo = document.querySelector('.platform__graphic-video')
    let bool = false
    let rect
    let rectPlatform
    window.addEventListener('scroll', () => {
        bool = true
        rect = secSwiper.getBoundingClientRect();
        rectPlatform = platformVideo.getBoundingClientRect();
        if (rect.bottom - window.innerHeight < 0 && rect.top + secSwiper.offsetHeight > 0) {
            swiper.autoplay.start();
            video[curIdx].play()
            muteAllVideos(); // Всегда выключаем звук при прокрутке
            videoBg[curIdx].play()
        } else {
            bool = false
            if (!bool) {
                swiper.autoplay.stop();
                video[curIdx].pause()
                videoBg[curIdx].pause()
            }
        }
        if (rectPlatform.bottom - window.innerHeight < 0 && rectPlatform.top + platformVideo.offsetHeight > 0) {
            platformVideo.play()
        } else {
            platformVideo.pause()
        }
    })

    videoPlay.addEventListener('click', () => {
        swiper.autoplay.stop();
        const currentVideo = video[curIdx];
        currentVideo.currentTime = 0;
        currentVideo.muted = false;
        userUnmuted = false;
        currentVideo.play();
        if (currentVideo.webkitEnterFullscreen) {
            currentVideo.webkitEnterFullscreen();
        } else if (currentVideo.requestFullscreen) {
            currentVideo.requestFullscreen();
        } else if (currentVideo.webkitRequestFullscreen) {
            currentVideo.webkitRequestFullscreen();
        } else if (currentVideo.msRequestFullscreen) {
            currentVideo.msRequestFullscreen();
        }
    });
    document.addEventListener("fullscreenchange", () => {
        if (!document.fullscreenElement) {
            video[curIdx].currentTime = 0;
            muteAllVideos(); // Всегда выключаем звук при выходе из полноэкранного режима
            userUnmuted = false; // Сбрасываем флаг
            videoBg[curIdx].currentTime = 0;
            swiper.autoplay.start();
        }
    });
}