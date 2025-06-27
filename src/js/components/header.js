export function header() {
    const header = document.querySelector('.header')
    if (document.body.classList.contains('blog')) {
        header.classList.add('light-bg')
    } else {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 70) {
                header.classList.add('light-bg')
            } else {
                header.classList.remove('light-bg')
            }
        })
    }


    const link = document.querySelectorAll('[data-to]')
    const navbar = document.querySelector('.navbar')
    const navbarCollapse = document.querySelector('.navbar__collapse')
    if (document.body.classList.contains('home')) {
        if (localStorage.getItem("toSection")) {
            console.log(localStorage.getItem("toSection"));
            setTimeout(() => {
                const sec = document.querySelector(`.${localStorage.getItem("toSection")}`)
                window.scrollTo({
                    top: sec.offsetTop - navbar.offsetHeight + 5,
                    behavior: 'smooth'
                })
                localStorage.removeItem("toSection");
            }, 2000);
        }

        link.forEach(el => {
            const sec = document.querySelector(`.${el.getAttribute('data-to')}`)
            el.addEventListener('click', () => {
                window.scrollTo({
                    top: sec.offsetTop - navbar.offsetHeight + 5,
                    behavior: 'smooth'
                })
                navbarCollapse.classList.remove('show')
                document.body.classList.remove('disable-scroll')
            })
        })
    } else {

        link.forEach(el => {

            el.addEventListener('click', () => {
                if (el.getAttribute('data-to') != 'faq') {
                    localStorage.setItem("toSection", `${el.getAttribute('data-to')}`);
                    window.location.href = "/";
                } else {
                    const sec = document.querySelector(`.faq`)
                    window.scrollTo({
                        top: sec.offsetTop - navbar.offsetHeight + 5,
                        behavior: 'smooth'
                    })
                }
            })


        })
    }

}
