export function scrollShowElem() {
    const elems = document.querySelectorAll('[data-show-scroll]')
    let rect
    elems.forEach(item => {
        rect = item.getBoundingClientRect()
        if (rect.bottom - window.innerHeight - item.offsetHeight / 1.1 < 0) {
            item.classList.add('show')
        } else {
            item.classList.remove('show')
        }
    })
    document.addEventListener('scroll', () => {
        elems.forEach(item => {
            rect = item.getBoundingClientRect()
            if (rect.bottom - window.innerHeight - item.offsetHeight / 1.3 < 0) {
                item.classList.add('show')
            } else {
                item.classList.remove('show')
            }
        })
    })

}