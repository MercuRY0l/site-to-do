import { loadCompletedTasks } from "../tasks/completed/loadCompletedTasks.js"

export async function initReportsPage() {
    await loadCompletedTasks();
}