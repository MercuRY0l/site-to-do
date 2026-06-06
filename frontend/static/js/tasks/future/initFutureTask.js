
import {loadFutureTasks} from "../future/loadFutureTask.js"

export async function initFutureTaskPage(){

    await loadFutureTasks();
}