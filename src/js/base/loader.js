// import { mediaQueryMatches } from "utils.js";

export function loader() {

  document.documentElement.classList.add("loading");
  const mediaElements = gsap.utils.toArray("[data-src]");
  const loaderPercent = document.querySelector(".loading-percent span");
  let loadingPerc = 0;
  const totalMedia = mediaElements.length;
  const failedMediaList = [];

  let loadedMedia = 0;

  const tlLoading = gsap.timeline({
    defaults: {
      duration: 1,
    },
  });

  async function mediaLoaded(e) {
    loadedMedia++;
    const loadedP = Math.floor((loadedMedia / totalMedia) * 100);
    const path = 100 - loadedP;

    await gsap.to(".loading-logo__loading", {
      clipPath: `inset(0 ${path}% 0 0)`,
      duration: 0.3,
      onStart: () => {
        gsap.to(loaderPercent, {
          innerText: loadedP,
          duration: 0.3,
          snap: {
            innerText: 1,
          },
          onComplete: () => {
            if (loadedMedia === totalMedia) {
              setTimeout(() => {
                document.documentElement.classList.remove("loading");
                document.documentElement.classList.add("loaded");
              }, 100);
            }
          },
        });
      },
    });
  }

  mediaElements.forEach((media) => {
    const dataSrc = media.getAttribute("data-src");

    media.onload = mediaLoaded;
    media.onerror = () => {
      console.log(`Ошибка загрузки для ${dataSrc}`);
      failedMediaList.push(dataSrc);
      mediaLoaded();
    };
    media.setAttribute("src", dataSrc);
  });
}
