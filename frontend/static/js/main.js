
import {initializeAuth} from "./auth/initializeAuth.js"
import { initTaskPage } from "./tasks/initTaskPage.js";


document.addEventListener("DOMContentLoaded", ()=>{
    initializeAuth();
    initTaskPage();
    
})