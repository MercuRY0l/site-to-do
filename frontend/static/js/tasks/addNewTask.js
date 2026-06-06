import { API_URL } from "../modules/config.js";
import { apiFetch } from "../auth/apiFetch.js";
import { showToast } from "../modules/showToast.js";
import { loadTasks } from "./loadTasks.js";

export function initAddNewTask() {
    const form = document.getElementById("task-form");
    const modal = document.getElementById("task-modal");

    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const title = form.title.value.trim();
        const description = form.description.value.trim();
        const date = form.date.value;
        const priority = form.priority.value;


        if (!title) {
            showToast("error", "Введите название задачи");
            return;
        }

        if (title.length > 255) { 
            showToast("error", "Название не должно превышать 255 символов");
            return;
        }

        if (!description) {
            showToast("error", "Введите описание задачи");
            return;
        }

        if (description.length > 512) {
            showToast("error", "Описание не должно превышать 512 символов");
            return;
        }

        if (!date) {
            showToast("error", "Укажите дату выполнения");
            return;
        }

        const selectedDate = new Date(date);

        if (selectedDate < new Date()) {
            showToast("error", "Дата не может быть в прошлом");
            return;
        }

        if (!["p0", "p1", "p2", "p3", "p4", "p5"].includes(priority)) {
            showToast("error", "Некорректный приоритет");
            return;
        }

        const isEdit =
        form.dataset.mode === "edit";

        const url = isEdit
            ? `${API_URL}/task/edit/${form.dataset.taskId}`
            : `${API_URL}/task/create`;

        const method = isEdit
            ? "PATCH"
            : "POST";

        try {
            const response = await apiFetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title,
                    description,
                    date,
                    priority
                })
            });

            const data = await response.json();

            if (!response.ok) {
                showToast("error", data.detail || "Ошибка создания задачи");
                return;
            }

            showToast("success", "Задача успешно создана");

            form.reset();

            modal.classList.remove("show");

            delete form.dataset.mode;
            delete form.dataset.taskId;

            await loadTasks();

        } catch (error) {
            console.error(error);
            showToast("error", "Ошибка соединения с сервером");
        }
    });
}