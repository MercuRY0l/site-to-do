export function initModals() {
    document.querySelectorAll(".modal-close")
        .forEach(btn => {

            btn.addEventListener("click", () => {

                btn.closest(".modal-overlay")
                    ?.classList.remove("show");

            });

        });

    document.querySelectorAll(".modal-overlay")
        .forEach(modal => {

            modal.addEventListener("click", e => {

                if (e.target === modal) {
                    modal.classList.remove("show");
                }

            });

        });

    document.addEventListener("keydown", e => {

        if (e.key === "Escape") {

            document
                .querySelectorAll(".modal-overlay.show")
                .forEach(modal => modal.classList.remove("show"));

        }

    });

}

export function closeAllModals() {
    document
        .querySelectorAll(".modal-overlay.show")
        .forEach(modal => modal.classList.remove("show"));
}

export function openModal(id) {
    closeAllModals();
    document.getElementById(id)?.classList.add("show");
}