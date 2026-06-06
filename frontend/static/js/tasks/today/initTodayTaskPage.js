

import { loadTodayTasks } from "./loadTodayTask.js";
import { loadProfile } from "../../modules/loadProfile.js";

export async function initTodayTaskPage(){
    await loadTodayTasks();
}