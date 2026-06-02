import { API_URL } from "./config.js";
import { apiFetch } from "../auth/apiFetch.js"

export async function getUser() {
    try {
        const response = await apiFetch(`${API_URL}/auth/me`, {
            method: "GET"
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Ошибка получения пользователя");
        }

        return data.user; 
    } catch (error) {
        console.error(error);
        return null;
    }
}