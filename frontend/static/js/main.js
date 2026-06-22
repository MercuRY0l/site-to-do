
import {initializeAuth} from "./auth/initializeAuth.js"
import {initTaskPage} from "./tasks/initTaskPage.js";
import {initTodayTaskPage} from "./tasks/today/initTodayTaskPage.js"
import {initFutureTaskPage} from "./tasks/future/initFutureTask.js"
import {initReportsPage} from "./report_page/initReportsPage.js"
import { setActiveMenuItem } from "./modules/setActiveMenuItem.js";
import { initSearch } from "./search/initSearch.js";
import { initModals } from "./modules/modals.js";

document.addEventListener("DOMContentLoaded", async()=>{
    initializeAuth();
    setActiveMenuItem();
    initSearch();
    initModals();

    initTaskPage().catch(err =>
        console.error("Task page error:", err)
    );

    initTodayTaskPage().catch(err =>
        console.error("Today page error:", err)
    );

    initFutureTaskPage().catch(err=>
        console.err("Future page error:", err)
    );

    initReportsPage().catch(err=>
        console.err("Reports page error:", err)
    );
})