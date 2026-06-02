import { API_URL } from "../modules/config.js";
import { apiFetch } from "../auth/apiFetch.js";
import { showToast } from "../modules/showToast.js";

export async function loadTasks() {
    const list = document.querySelector(".task-list");

    if (!list) return;

    list.innerHTML = "";

    try {
        const response = await apiFetch(`${API_URL}/tasks`, {
            method: "GET"
        });

        const data = await response.json();

        if (!response.ok) {
            showToast("error", data.detail || "Ошибка загрузки задач");
            return;
        }

        if (!data.length) {
            list.innerHTML = `
                <div class="empty-state">
                    <p>У вас пока нет задач</p>
                </div>
            `;
            return;
        }

        data.forEach(task => {
            const card = document.createElement("div");
            card.classList.add("task-card");

            card.innerHTML = `
                <label>
                    <input type="checkbox" />
                    <span>${task.title}</span>
                </label>

                <div class="tag ${task.priority}">
                    ${task.priority.replace("p", "")}
                </div>
            `;

            list.appendChild(card);
        });

    } catch (error) {
        console.error(error);
        showToast("error", "Ошибка загрузки задач");
    }
}