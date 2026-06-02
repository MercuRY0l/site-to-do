
import { getUser } from "./getUser.js";

export async function loadProfile(){

    const profile_card = document.querySelector(".profile-card");

    if (!profile_card) return;

    const div = document.createElement("div");

    const user = await getUser();

    div.innerHTML = `
        <h4>${user.username}</h4>
        <p>${user.email}</p>
    `

    profile_card.appendChild(div);

}