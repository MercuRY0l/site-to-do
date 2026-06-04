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

                <div class="task-actions">
                    <div class="tag ${task.priority}">
                        ${task.priority.replace("p", "")}
                    </div>
                    <button class="edit-task-btn" data-id="${task.id}">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2">
                        <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
                    </svg>
                </button>
                </div>
            `;

            list.appendChild(card);
        });

    } catch (error) {
        console.error(error);
        showToast("error", "Ошибка загрузки задач");
    }
}