import { openModal } from "../modules/modals.js"
import { getSearchTasks } from "./getSearchTasks.js"

export function initSearch(){

    const modal = document.getElementById("search-modal")
    const search_btn = document.querySelector(".search-btn")
    const search_task_list = document.querySelector(".search-task-list")
    const input_task_title = document.getElementById("search-input")

    if (!search_btn) return;
    if (!modal) return;
    if (!search_task_list) return;

    search_btn.addEventListener("click", ()=>{
        openModal("search-modal");
    })

    let timer;

    input_task_title.addEventListener("input", () => {

        clearTimeout(timer);

        timer = setTimeout(async()=>{
            search_task_list.innerHTML = "";

            const tasks = await getSearchTasks(input_task_title.value);
            
            if (tasks.length === 0){
                return [];
            }

                tasks.forEach(task => {

                    const task_card = document.createElement("div");
                    task_card.classList.add("task-card");
                    task_card.dataset.id = task.id;

                    task_card.innerHTML = `
                        <label>
                            <input type="checkbox" class="task-checkbox"/>
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
                        </div>
                    `;

                    search_task_list.append(task_card);

                });

            }, 300);
    })
}