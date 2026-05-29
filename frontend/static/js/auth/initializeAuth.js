

import {initLogin} from "./initLogin.js"
import {initRegister} from "./initRegister.js"

export function initializeAuth() {
    initLogin();
    initRegister();
}