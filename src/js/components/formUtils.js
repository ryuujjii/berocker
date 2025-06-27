export function formUtils() {
  const demoForm = document.getElementById("demoForm");
  const bookForm = document.getElementById("bookForm");
  const feedbackForm = document.getElementById("feedbackForm");
  const faqForm = document.getElementById("faqForm");
  const callForm = document.getElementById("callForm");

  function showError(input, message) {
    const errorDiv = input.parentElement.querySelector(".error-message");
    input.classList.add("error");
    if(errorDiv) errorDiv.textContent = message;
  }

  function clearError(input) {
    const errorDiv = input.parentElement.querySelector(".error-message");
    input.classList.remove("error");
    errorDiv.textContent = "";
  }

  function validatePhone(phone) {
    const cleanedPhone = phone.replace(/[^0-9+]/g, '');
    return cleanedPhone.startsWith("+1") && cleanedPhone.length === 11 || cleanedPhone.length === 10 || cleanedPhone.length === 12;
  }

  function showNotification(message, type = "success") {
    const existingNotification = document.querySelector(".custom-notification");
    if (existingNotification) {
      existingNotification.remove();
    }

    const notification = document.createElement("div");
    notification.classList.add("custom-notification", type);
    notification.textContent = message;

    const closeBtn = document.createElement("button");
    closeBtn.innerHTML = "&times;";
    closeBtn.classList.add("close-btn");
    closeBtn.onclick = () => notification.remove();

    notification.appendChild(closeBtn);
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  }

  const callNextBtn = document.querySelector(".platform__call-btn");
  const phoneInput = document.getElementById("phone");
  const formSection = document.querySelector(".platform__form");
  const callSection = document.querySelector(".platform__call");

  if (callNextBtn && phoneInput) {
    callNextBtn.addEventListener("click", () => {
      if (validatePhone(phoneInput.value)) {
        console.log(validatePhone(phoneInput.value))
        callSection.classList.add("hidden");
        formSection.classList.remove("hidden");
      } else {
        showError(phoneInput, "Please enter a valid phone number (e.g., +1000000000");
      }
    });

    phoneInput.addEventListener("input", () => clearError(phoneInput));
  }

  if(demoForm) {
    demoForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const platformTyNumber = document.querySelector(".platform__ty-number")
      const name = document.getElementById("name");
      const pickup_address = document.getElementById("pickup_address");
      const drop_off_address = document.getElementById("drop_off_address");
      const vehicle_model = document.getElementById("vehicle_model");

      let isValid = true;
      [name, pickup_address, drop_off_address, vehicle_model].forEach((input) => {
        if (input.value.trim() === "") {
          showError(input, "This field is required");
          isValid = false;
        } else {
          clearError(input);
        }
      });

      if (!isValid) return;

      const requestData = {
        phone: phoneInput.value,
        name: name.value,
        pickup_address: pickup_address.value,
        drop_off_address: drop_off_address.value,
        vehicle_model: vehicle_model.value,
      };

      if (platformTyNumber) {
        platformTyNumber.textContent = phoneInput.value;
      }
      try {
        const response = await fetch("https://api.berocker.com/api/call", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestData),
        });

        console.log(response);

        if (platformTyNumber) {
          platformTyNumber.textContent = phoneInput.value;
        }

        // if (response.ok) {
        //   alert("Success!");
        // } else {
        //   alert("Failed to submit");
        // }
      } catch (error) {
        console.error("Error:", error);
      }
    });
  }

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const submit = async (requestData) => {
    try {
      const response = await fetch("https://api.berocker.com/api/book-demo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        showNotification("Your request has been submitted successfully");
      } else {
        showNotification("Your request has been submitted successfully", 'error');
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  if(bookForm) {
    bookForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const submitButton = bookForm.querySelector("button[type='submit']");
      const buttonText = submitButton.querySelector("span");

      const fullName = document.getElementById("book_form_name");
      const email = document.getElementById("book_form_email");
      const phone = document.getElementById("book_form_phone");
      const company_name = document.getElementById("book_form_company_name");
      const company_mc = document.getElementById("book_form_company_mc");
      const website_url = document.getElementById("book_form_website_url");

      let isValid = true;
      [fullName, email, phone, company_name].forEach((input) => {
        if (input.value === "") {
          showError(input, "This field is required");
          isValid = false;
        } else {
          clearError(input);
        }
      });

      if (!isValid) return;

      submitButton.disabled = true;
      buttonText.textContent = "Loading...";

      const requestData = {
        phone: phone.value.trim(),
        full_name: fullName.value.trim(),
        email: email.value.trim(),
        company_name: company_name.value.trim(),
      };

      if(website_url.value?.trim()) {
        requestData.website = website_url.value?.trim()
      }

      if(company_mc.value?.trim()) {
        requestData.company_mc = company_mc.value?.trim()
      }

      await submit(requestData)
      try {
        bookForm.reset()
        submitButton.disabled = false;
        buttonText.textContent = "Get your free demo";
      } catch (err) {
        console.log(err);
      }
    });
  }
  if(feedbackForm) {
    feedbackForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const submitButton = feedbackForm.querySelector("button[type='submit']");
      const buttonText = submitButton.querySelector("span");

      const feedback_full_name = document.getElementById("feedback_full_name");
      const feedback_email = document.getElementById("feedback_email");
      const feedback_phone = document.getElementById("feedback_phone");
      const feedback_company_name = document.getElementById("feedback_company_name");
      const feedback_company_mc = document.getElementById("feedback_company_mc");
      const feedback_website = document.getElementById("feedback_website");

      let isValid = true;
      [feedback_full_name, feedback_email, feedback_phone, feedback_company_name].forEach((input) => {
        if (input.value === "") {
          showError(input, "This field is required");
          isValid = false;
        } else {
          clearError(input);
        }
      });

      if (!isValid) return;

      submitButton.disabled = true;
      buttonText.textContent = "Loading...";

      const requestData = {
        full_name: feedback_full_name.value.trim(),
        email: feedback_email.value.trim(),
        phone: feedback_phone.value.trim(),
        company_name: feedback_company_name.value.trim(),
      };

      if(feedback_website.value?.trim()) {
        requestData.website = feedback_website.value?.trim()
      }

      if(feedback_company_mc.value?.trim()) {
        requestData.company_mc = feedback_company_mc.value?.trim()
      }

      try {
        await submit(requestData)
        feedbackForm.reset()
        submitButton.disabled = false;
        buttonText.textContent = "Get your free demo";
      } catch (err) {
        console.log(err);
      }
    });
  }
  if(faqForm) {
    faqForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const submitButton = faqForm.querySelector("button[type='submit']");
      const buttonText = submitButton.querySelector("span");

      const faq_form_name = document.getElementById("faq_form_name");
      const faq_form_email = document.getElementById("faq_form_email");
      const faq_form_phone = document.getElementById("faq_form_phone");
      const faq_form_textarea = document.getElementById("faq_form_textarea");

      let isValid = true;
      [faq_form_name, faq_form_email, faq_form_phone, faq_form_textarea].forEach((input) => {
        if (input.value === "") {
          showError(input, "This field is required");
          isValid = false;
        } else {
          clearError(input);
        }
      });

      if (!isValid) return;

      submitButton.disabled = true;
      buttonText.textContent = "Loading...";

      const requestData = {
        full_name: faq_form_name.value.trim(),
        email: faq_form_email.value.trim(),
        phone: faq_form_phone.value.trim(),
        question: faq_form_textarea.value.trim(),
      };

      try {
        const response = await fetch("https://api.berocker.com/api/ask-question", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });
        faqForm.reset()
        submitButton.disabled = false;
        buttonText.textContent = "Get your free demo";

        if (response.ok) {
          showNotification("Your request has been submitted successfully");
        } else {
          showNotification("Your request has been submitted successfully", 'error');
        }
      } catch (error) {
        console.error("Error:", error);
      }
    });
  }
  if(callForm) {
    callForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const submitButton = callForm.querySelector("button[type='submit']");
      const buttonText = submitButton.querySelector("span");

      const call_name = document.getElementById("call_name");
      const call_phone = document.getElementById("call_phone");
      const call_vehicle_model = document.getElementById("call_vehicle_model");

      let isValid = true;
      [call_name, call_phone].forEach((input) => {
        if (input.value === "") {
          showError(input, "This field is required");
          isValid = false;
        } else {
          clearError(input);
        }
      });

      if (!isValid) return;

      submitButton.disabled = true;
      buttonText.textContent = "Loading...";

      const requestData = {
        phone: call_phone.value.trim(),
        name: call_name.value.trim(),
      };

      if(call_vehicle_model.value?.trim()) {
        requestData.vehicle_model = call_vehicle_model.value.trim()
      }

      try {
        const response = await fetch("https://api.berocker.com/api/call", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });
        callForm.reset()
        submitButton.disabled = false;
        buttonText.textContent = "Get your free demo";

        if (response.ok) {
          showNotification("Your Call request has been submitted successfully");
        } else {
          showNotification("Your Call request has been submitted successfully", 'error');
        }
      } catch (error) {
        console.error("Error:", error);
      }
    });
  }
}


// export function formUtils() {
//     document.querySelectorAll('.form__input-wrapper input').forEach(input => {
//         input.addEventListener('input', function (e) {
//             let value = e.target.value;
//
//             value = value.replace(/[^0-9]/g, '').slice(0, 2);
//
//             if (input.id === 'hours') {
//                 if (value > 12) value = '12';
//             }
//
//             if (input.id === 'minutes') {
//                 if (value > 59) value = '59';
//             }
//
//             e.target.value = value;
//
//         });
//
//     })
//
//     document.addEventListener('click', (event) => {
//         if (!event.target.closest('.form__input-dropdown')) {
//             document.querySelectorAll('.form__dropdown').forEach(dropdown => dropdown.style.display = 'none');
//         }
//     });
//
//     function setupDropdown(inputId, min, max) {
//         const input = document.getElementById(inputId);
//         const dropdown = document.getElementById(`${inputId}-dropdown`);
//         const dropdownWrapper = dropdown.querySelector('.form__dropdown-wrapper');
//
//         dropdownWrapper.innerHTML = '';
//
//         for (let i = min; i <= max; i++) {
//             const formattedNumber = i.toString().padStart(2, '0');
//             const option = document.createElement('span');
//             option.textContent = formattedNumber;
//
//             option.addEventListener('click', () => {
//                 input.value = formattedNumber;
//                 dropdown.style.display = 'none';
//             });
//
//             dropdownWrapper.appendChild(option);
//         }
//
//         input.addEventListener('click', (e) => {
//             e.stopPropagation();
//             toggleDropdown(dropdown);
//         });
//     }
//
//     function toggleDropdown(dropdown) {
//         const isVisible = dropdown.style.display === 'flex';
//         document.querySelectorAll('.form__dropdown').forEach(d => d.style.display = 'none');
//         dropdown.style.display = isVisible ? 'none' : 'flex';
//     }
//
//     setupDropdown('hours', 1, 12);
//     setupDropdown('minutes', 1, 59);
// }
