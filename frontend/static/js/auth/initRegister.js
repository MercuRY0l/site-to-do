import { showToast } from "../modules/showToast.js";

export function initRegister() {
  const form = document.querySelector("#register-form");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fullName = document.getElementById("register-name").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
    const repeat_password = document.getElementById(
      "register-repeat-password",
    ).value;

    if (password != repeat_password) {
      showToast("error", "Пароли не совпадают!");
    }

    const res = await fetch("/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        full_name: fullName,
        email,
        password,
      }),
    });

    if (res.ok) {
      window.location.href = "/auth/login";
    } else {
      const data = await res.json();
      showToast(data.detail || "Регистрация провалена", "error");
    }
  });
}
