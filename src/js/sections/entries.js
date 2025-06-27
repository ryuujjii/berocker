import { addClassName, removeClassName, queryMatches } from "../base/utils.js";
export default function entries() {
  let sections = document.querySelectorAll("section");
  let lastScrollY = window.scrollY;

  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -20% 0px",
    threshold: queryMatches(992) ? 0.05 : 0.2,
  };

  const observer = new IntersectionObserver((entries) => {
    let currentScrollY = window.scrollY;

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (!entry.target.classList.contains("platform")) {
          entry.target.classList.add("active");
        }
      } else {
        if (currentScrollY < lastScrollY && !entry.target.classList.contains("platform")) {
          entry.target.classList.remove("active");
        }
      }
    });

    lastScrollY = currentScrollY;
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));


}
