import { API_URL } from "../modules/config.js";
import { apiFetch } from "../auth/apiFetch.js";
import { showToast } from "../modules/showToast.js";
import { openModal } from "../modules/modals.js"

export function initEditTask() {

    document.addEventListener("click", async (e) => {

        const editBtn = e.target.closest(".edit-task-btn");

        if (!editBtn) return;

        const taskId = editBtn.dataset.id;

        try {

            const response = await apiFetch(
                `${API_URL}/task/${taskId}`,
                {
                    method: "GET"
                }
            );

            const task = await response.json();

            if (!response.ok) {
                showToast(
                    "error",
                    task.detail || "Ошибка загрузки задачи"
                );
                return;
            }

            fillEditForm(task);

        } catch (error) {
            console.error(error);

            showToast(
                "error",
                "Ошибка загрузки задачи"
            );
        }

    });

}

function fillEditForm(task) {
    const form = document.getElementById("task-form");

    openModal("task-modal")

    form.dataset.mode = "edit";
    form.dataset.taskId = task.id;

    form.title.value = task.title;
    form.description.value = task.description;
    form.priority.value = task.priority;

    if (task.date) {

        const date = new Date(task.date);

        form.date.value =
            new Date(
                date.getTime() -
                date.getTimezoneOffset() * 60000
            )
            .toISOString()
            .slice(0, 16);
    }

    const submitBtn =
        form.querySelector(".save-task-btn");

    submitBtn.textContent = "Сохранить";
}