import { openModal } from "../modules/modals.js";

export function initTaskModal() {

    const openBtn = document.querySelector(".primary-btn");
    const form = document.getElementById("task-form");

    if (!openBtn || !form) return;

    openBtn.addEventListener("click", () => {

        form.reset();

        delete form.dataset.mode;
        delete form.dataset.taskId;

        form.querySelector(".save-task-btn").textContent =
            "Создать задачу";

        openModal("task-modal");

    });

}