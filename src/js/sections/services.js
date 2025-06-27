export function services() {
    const servicesInner = document.querySelector('.services__inner')
    const imgs = document.querySelectorAll('.services__img-item')
    const tabs = document.querySelectorAll('.services__tab-item')
    const infos = document.querySelectorAll('.services__info-item')
    const list = document.querySelectorAll('.services__list')
    const dropDowns = document.querySelectorAll('.services__dropdown')
    tabs.forEach((tab, i) => {
        const listItem = document.querySelectorAll('.services__list-item')
        const dropdown = document.querySelectorAll('.services__dropdown')

        listItem.forEach((item, k) => {
            const close = dropdown[k].querySelector('.services__dropdown-close')
            close.addEventListener('click', () => {
                dropdown[k].classList.remove('active')
            })
            item.addEventListener('click', () => {
                dropdown.forEach(drop => {
                    drop.classList.remove('active')
                })
                dropdown[k].classList.add('active')
            })
        })
        tab.addEventListener('click', () => {
            tabs.forEach((el, j) => {
                imgs[j].classList.remove('active')
                infos[j].classList.remove('active')
                el.classList.remove('active')
            })
            dropDowns.forEach(el => {
                el.classList.remove('active')
            })
            imgs[i].classList.add('active')
            infos[i].classList.add('active')
            tab.classList.add('active')
        })
    })

}