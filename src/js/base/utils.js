export function queryMatches(width, prefix = 'max') {
    return window.matchMedia(`(${prefix}-width: ${width}px)`).matches;
}

export const COMMON_MEDIA_QUERIES = {
    TABLET: queryMatches(991.98),
    MOBILE: queryMatches(767.98),
};

// Function to detect mobile or tablet devices
export function isMobileOrTablet() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Tablet|KFAPWI/i.test(navigator.userAgent);
}

export function addClassName(el, className = 'active') {
    el.classList.add(className);
}

export function removeClassName(el, className = 'active') {
    el.classList.remove(className);
}

export function toggleClassName(el, className = 'active') {
    el.classList.toggle(className);
}

export function removeClasses(array, className = 'active') {
    array.forEach((currentEl) => {
        removeClassName(currentEl, className);
    });
}

export function changeText(el, text) {
    el.innerText = text;
}

export function dispatchCustomEvent({ el, event, detail }) {
    el.dispatchEvent(new CustomEvent(event, { detail }));
}

export function wrapElements(elms, wrapClass = 'wrapped', wrapType = 'div') {
    elms.forEach((el) => {
        const wrapEl = document.createElement(wrapType);
        wrapEl.classList = wrapClass;
        el.parentNode.children[1].before(wrapEl)
            .appendChild(wrapEl);
        wrapEl.appendChild(el);
    });
};

export function scrollStop(bool) {
    if(bool) {
        document.body.classList.add('disable-scroll')
    }else {
        document.body.classList.remove('disable-scroll')
    }
}

export function lazyLoad() {
  document.addEventListener("DOMContentLoaded", function () {
    const lazyElements = document.querySelectorAll(".lazy");

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.tagName === "IMG") {
            entry.target.src = entry.target.dataset.src;
          } else if (entry.target.tagName === "VIDEO") {
            let sources = entry.target.querySelectorAll("source");
            sources.forEach(source => {
              source.src = source.dataset.src;
            });
            entry.target.load();
          }
          entry.target.classList.remove("lazy");
          observer.unobserve(entry.target);
        }
      });
    });

    lazyElements.forEach(element => observer.observe(element));
  });
}
