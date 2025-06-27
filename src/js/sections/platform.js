import {
  addClassName,
  queryMatches,
  removeClassName,
  scrollStop,
} from "../base/utils.js";

export function platform() {
  // const anchors = document.querySelectorAll(".platform__content-anchor");
  // const contents = document.querySelectorAll(".platform__content-item");
  // const videos = document.querySelectorAll(".platform__videos");
  // const cards = document.querySelectorAll(".platform__card");
  // let active = 0;
  // let content = document.querySelector(".platform__wrapper");
  // let platform = document.querySelector(".platform");
  // let header = document.querySelector(".header");
  // let cardClicked = false;
  // let size =
  //   content.getBoundingClientRect().y -
  //   platform.getBoundingClientRect().y -
  //   header.clientHeight / 2 -
  //   (window.innerHeight - content.scrollHeight) / 2;

  // document.documentElement.style.setProperty("--stickyTopHeight", `${size * -1}px`);
  // addClassName(platform, "ready");

  // let timeoutId;

  // if (queryMatches(993, "min")) {
  //   gsap.timeline({
  //     scrollTrigger: {
  //       trigger: platform,
  //       start: "5% bottom",
  //       end: "bottom top",
  //       onEnter: () => {
  //         videos[0].play();
  //         setTimeout(() => {
  //           cards[1].click();
  //         }, 12000);
  //       },
  //     },
  //   });

  //   cards.forEach((card, index) => {
  //     card.addEventListener("click", () => {
  //       // Сбрасываем все активные элементы
  //       cards.forEach((card) => card.classList.remove("active"));
  //       contents.forEach((content) => content.classList.remove("active"));
  //       videos.forEach((video) => {
  //         video.pause();
  //         video.currentTime = 0;
  //       });

  //       // Активация текущего элемента
  //       card.classList.add("active");
  //       contents[index].classList.add("active");
  //       videos[index].play();

  //       // Очищаем предыдущий таймер
  //       clearTimeout(timeoutId);

  //       // Запускаем новый таймер для автоматического переключения
  //       if (index === 0) {
  //         timeoutId = setTimeout(() => {
  //           cards[0].classList.remove("active");
  //           contents[0].classList.remove("active");
  //           cards[1].classList.add("active");
  //           contents[1].classList.add("active");
  //           videos[1].play();

  //           clearTimeout(timeoutId); // Очищаем перед следующим
  //           timeoutId = setTimeout(() => {
  //             cards[1].classList.remove("active");
  //             contents[1].classList.remove("active");
  //             cards[2].classList.add("active");
  //             contents[2].classList.add("active");
  //             videos[2].play();
  //           }, 21000);
  //         }, 12000);
  //       } else if (index === 1) {
  //         timeoutId = setTimeout(() => {
  //           cards[1].classList.remove("active");
  //           contents[1].classList.remove("active");
  //           cards[2].classList.add("active");
  //           contents[2].classList.add("active");
  //           videos[2].play();
  //         }, 21000);
  //       }
  //     });
  //   });
  // } else {
  //   cards.forEach((card, i) => {
  //     gsap.timeline({
  //       scrollTrigger: {
  //         trigger: card,
  //         start: `${-40 * i}% bottom`,
  //         end: `${-40 * i}% bottom`,
  //         onEnter: () => {
  //           addClassName(card);
  //           addClassName(contents[i]);
  //           videos[i].play();
  //         },
  //         onEnterBack: () => {
  //           removeClassName(card);
  //           removeClassName(contents[i]);
  //           videos[i].pause();
  //           videos[i].currentTime = 0;
  //         },
  //       },
  //     });
  //   });
  // }

  // // Удалить позже
  // document.querySelector(".platform__call-btn").addEventListener("click", () => {
  //   document.querySelector(".platform__call").classList.remove("active");
  //   document.querySelector(".platform__form").classList.add("active");
  // });

  // document.querySelector(".platform__form-btn").addEventListener("click", () => {
  //   document.querySelector(".platform__form").classList.remove("active");
  //   document.querySelector(".platform__ty").classList.add("active");
  // });

  // // Перемещение на мобильных устройствах
  // if (queryMatches(992)) {
  //   cards.forEach((card, index) => {
  //     if (contents[index]) {
  //       card.appendChild(contents[index]);
  //     }
  //   });
  // }

  // // Анимация
  // gsap.timeline({
  //   scrollTrigger: {
  //     trigger: platform,
  //     start: "5% bottom",
  //     end: "bottom top",
  //     onEnter: () => addClassName(platform),
  //     onLeaveBack: () => removeClassName(platform),
  //   },
  // });

  const platformSection = document.querySelectorAll(".platform__section");

  platformSection.forEach((section) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: `top+=${queryMatches(992) ? 15 : 50}% bottom`,
        end: "bottom top",
        // markers: true,
        onEnter: () => addClassName(section),
        onLeaveBack: () => removeClassName(section),
      },
    });
  });
}
