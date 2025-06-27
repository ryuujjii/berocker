export function faq() {
    const faqItems = document.querySelectorAll('.faq__item')
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            faqItems.forEach(el => {
                el.classList.remove('active')
            })
            item.classList.add('active')
        })
    })
}