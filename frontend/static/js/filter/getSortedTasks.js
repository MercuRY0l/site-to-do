import { API_URL } from "../modules/config.js";
import { apiFetch } from "../auth/apiFetch.js";

export async function getSortedTasks(sort) {
    try {

        const response = await apiFetch(
            `${API_URL}/tasks/sort?sort=${encodeURIComponent(sort)}`,
            {
                method: "GET"
            }
        );

        if (!response.ok) {
            console.log("Ошибка сортировки")
        }

        return await response.json();

    } catch (error) {

        console.error(error);

        return [];
    }
}