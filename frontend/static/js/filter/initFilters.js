import { API_URL } from "../modules/config.js";
import { apiFetch } from "../auth/apiFetch.js";
import { renderTasks } from "../modules/renderTasks.js";

export function initFilters() {

    const filterBtn =
        document.getElementById("filter-btn");

    const dropdown =
        document.getElementById("filter-dropdown");

    const applyBtn =
        document.getElementById("apply-filters");

    if (!filterBtn || !dropdown || !applyBtn) return;

    filterBtn.addEventListener("click", () => {
        dropdown.classList.toggle("hidden");
    });

    applyBtn.addEventListener("click", async () => {

        const priority =
            document.getElementById("filter-priority").value;

        // const status =
        //     document.getElementById("filter-status").value;

        const date =
            document.getElementById("filter-date").value;

        const params = new URLSearchParams();

        if (priority)
            params.append("priority", priority);

        // if (status)
        //     params.append("status", status);

        if (date)
            params.append("date_filter", date);

        const response = await apiFetch(
            `${API_URL}/tasks/filter?${params}`
        );

        const tasks = await response.json();

        renderTasks(tasks);

        dropdown.classList.add("hidden");
    });

    document.addEventListener("click", (e) => {

        if (
            !dropdown.contains(e.target) &&
            !filterBtn.contains(e.target)
        ) {
            dropdown.classList.add("hidden");
        }

    });
}