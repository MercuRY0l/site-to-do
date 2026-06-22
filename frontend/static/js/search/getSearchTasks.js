
import {apiFetch} from "../auth/apiFetch.js"
import {API_URL} from "../modules/config.js"

export async function getSearchTasks(q){
    try{
        const response = await apiFetch(`${API_URL}/tasks/search/${encodeURIComponent(q)}`, {
            method : "GET"
        })

        if (!response.ok){
            const error = await response.json();
            console.log(error);
            return [];
        }

        return await response.json();
    }

    catch(error){
        console.log(error);
        return [];
    }
}