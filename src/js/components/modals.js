import { scrollStop } from "../base/utils.js";

export function modals() {
  const modalTrigger = document.querySelectorAll("[data-open-modal]");
  const modals = document.querySelectorAll(".modal");

  function closeModal(modal) {
    modal.classList.remove("show");
    scrollStop(false);
    stopScroll = true;
  }

  let stopScroll = true;

  modalTrigger.forEach((btn) => {
    btn.addEventListener("click", () => {
      const currentModalId = btn.getAttribute("data-open-modal");
      if (!currentModalId) return;

      const targetModal = document.getElementById(currentModalId);
      if (!targetModal) return;

      if (stopScroll) {
 
        scrollStop(true);
      } else {
 
        scrollStop(false);
      }
      stopScroll = !stopScroll;

      targetModal.classList.toggle("show");
    });
  });

  modals.forEach((modal) => {
    const closeButton = modal.querySelector("[data-modal-close]");
    if (closeButton) {
      closeButton.addEventListener("click", () => closeModal(modal));
    }

    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeModal(modal);
      }
    });
  });
}
