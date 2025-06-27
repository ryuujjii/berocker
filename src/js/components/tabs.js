export function tabs() {
    const toggleItems = document.querySelectorAll('.toggle-item');
    const tabs = document.querySelectorAll('.tabs');
    const toggleBg = document.querySelector('.toggle-bg');

    toggleItems.forEach(item => {
        item.addEventListener('click', () => {
            toggleItems.forEach(el => el.classList.remove('active'));
            item.classList.add('active');

            const toggleValue = item.getAttribute('data-toggle');

            tabs.forEach(tab => {
                tab.classList.remove('show');
                if (tab.getAttribute('data-tab') === toggleValue) {
                    tab.classList.add('show');
                }
            });

            moveToggleBg(item);
        });
    });

    const activeItem = document.querySelector('.toggle-item.active');
    if (activeItem) {
        moveToggleBg(activeItem);
    }

    function moveToggleBg(target) {
        const parent = target.parentElement;
        const targetOffsetLeft = target.offsetLeft;

        toggleBg.style.width = `${target.offsetWidth}px`;
        toggleBg.style.transform = `translateY(-50%) translateX(${targetOffsetLeft}px)`;
    }
}
