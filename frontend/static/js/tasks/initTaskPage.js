
import { loadProfile } from "../modules/loadProfile.js";
import {initTaskModal} from "../tasks/taskModal.js"
import {initAddNewTask} from "../tasks/addNewTask.js"
import { loadTasks } from "../tasks/loadTasks.js"
import { initDeleteTask } from "./deleteTask.js"; 
import { initEditTask } from "./editTask.js";
import { initFilters } from "../filter/initFilters.js";

export async function initTaskPage(){
    await loadProfile();
    initTaskModal();
    initAddNewTask();
    await loadTasks();
    initDeleteTask();
    initEditTask();
    initFilters();
}