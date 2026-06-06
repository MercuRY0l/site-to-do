
import {initializeAuth} from "./auth/initializeAuth.js"
import {initTaskPage} from "./tasks/initTaskPage.js";
import {initTodayTaskPage} from "./tasks/today/initTodayTaskPage.js"
import {initFutureTaskPage} from "./tasks/future/initFutureTask.js"
import { setActiveMenuItem } from "./modules/setActiveMenuItem.js";


document.addEventListener("DOMContentLoaded", async()=>{
    initializeAuth();
    setActiveMenuItem();

    initTaskPage().catch(err =>
        console.error("Task page error:", err)
    );

    initTodayTaskPage().catch(err =>
        console.error("Today page error:", err)
    );

    initFutureTaskPage().catch(err=>
        console.err("Future page error:", err)
    );
})