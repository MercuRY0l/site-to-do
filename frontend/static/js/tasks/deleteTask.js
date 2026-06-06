import { API_URL } from "../modules/config.js";
import { apiFetch } from "../auth/apiFetch.js";
import { showToast } from "../modules/showToast.js";

export function initDeleteTask() {

    document.addEventListener("change", async (e) => {

        const checkbox = e.target.closest(
            ".task-checkbox"
        );

        if (!checkbox) return;

        const card = checkbox.closest(".task-card");
        const taskId = card.dataset.id;

        card.classList.add("removing");

        try {

            const response = await apiFetch(
                `${API_URL}/task/delete/${taskId}`,
                {
                    method: "DELETE"
                }
            );

            const data = await response.json();

            if (!response.ok) {

                card.classList.remove("removing");

                showToast(
                    "error",
                    data.detail || "Ошибка удаления"
                );

                checkbox.checked = false;

                return;
            }

            setTimeout(() => {
                card.remove();
            }, 350);

        } catch (error) {

            console.error(error);

            card.classList.remove("removing");

            checkbox.checked = false;

            showToast(
                "error",
                "Ошибка соединения с сервером"
            );
        }
    });

}