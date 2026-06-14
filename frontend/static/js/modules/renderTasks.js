export function renderTasks(tasks) {

    const list = document.querySelector(".task-list");

    list.innerHTML = "";

    if (!tasks.length) {

        list.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-content">
                    <div class="empty-state-icon">📝</div>
                    <h3>Ничего не найдено</h3>
                </div>
            </div>
        `;

        return;
    }

    tasks.forEach(task => {

        const card = document.createElement("div");

        card.classList.add("task-card");

        card.innerHTML = `
            <label>
                <input type="checkbox" class="task-checkbox"/>
                <span>${task.title}</span>
            </label>

            <div class="task-actions">
                <div class="tag ${task.priority}">
                    ${task.priority.replace("p", "")}
                </div>
            </div>
        `;

        list.appendChild(card);

    });
}