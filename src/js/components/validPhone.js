export function validationPhoneInput() {
    const allPhoneInput = document.querySelectorAll(`input[type="tel"]`)

    allPhoneInput.forEach(phone => {
        phone.addEventListener('input', function (e) {
            let value = e.target.value;

            value = value.replace(/[^0-9+]/g, '');

            if (value.indexOf('+') > 0) {
                value = value.replace(/\+/g, '');
            } else if (value.indexOf('+') === 0) {
                value = '+' + value.slice(1).replace(/\+/g, '');
            }

            e.target.value = value;
        });

    })
}
