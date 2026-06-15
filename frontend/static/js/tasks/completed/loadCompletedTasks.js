import { API_URL } from "../../modules/config.js"
import { apiFetch } from "../../auth/apiFetch.js"
import { showToast } from "../../modules/showToast.js";

export async function loadCompletedTasks() {
    const list = document.querySelector(".completed-task-list");

    if (!list) return;

    list.innerHTML = "";

    try {
        const response = await apiFetch(`${API_URL}/reports/data`, {
            method: "GET"
        });

        const data = await response.json();

        if (!response.ok) {
            showToast("error", data.detail || "Ошибка загрузки отчёта");
            return;
        }

        if (!Array.isArray(data) || data.length === 0) {
            list.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-content">
                        <div class="empty-state-icon">📊</div>
                        <h3>Нет выполненных задач</h3>
                        <p>
                            Выполненные задачи будут отображаться здесь.
                        </p>
                    </div>
                </div>
            `;
            return;
        }

        data.forEach(task => {
            const card = document.createElement("div");

            card.classList.add("task-card");

            card.innerHTML = `
                <div class="task-info">
                    <h3>${task.title}</h3>
                    <p>${task.description}</p>
                </div>

                <div class="task-actions">
                    <div class="tag ${task.priority}">
                        ${task.priority.replace("p", "")}
                    </div>
                </div>
            `;

            list.appendChild(card);
        });

    } catch (error) {
        console.error(error);
        showToast("error", "Ошибка загрузки отчёта");
    }
}