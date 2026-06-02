import { showToast } from "../modules/showToast.js";
import { API_URL } from "../modules/config.js";

export function initLogin() {
  const form = document.querySelector("#login-form");
  if (!form) return;

  function getValidationMessage(error) {
    const field = error.loc?.[1];

    switch (field) {
      case "email":
        return "Введите корректный email";

      case "password":
        if (error.type?.includes("too_short")) {
          return "Пароль должен содержать минимум 6 символов";
        }
        return "Некорректный пароль";

      default:
        return error.msg || "Ошибка валидации";
    }
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const emailInput = document.getElementById("login-email");
    const passwordInput = document.getElementById("login-password");

    if (!emailInput) {
      showToast("error", "Поле email не найдено");
      return;
    }

    if (!passwordInput) {
      showToast("error", "Поле пароля не найдено");
      return;
    }

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      showToast("error", "Введите корректный email");
      return;
    }

    if (password.length < 6) {
      showToast("error", "Пароль должен содержать минимум 6 символов");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        showToast("success", "Успешный вход");

        setTimeout(() => {
          window.location.href = "/";
        }, 800);

        return;
      }

      if (res.status === 422) {
        data.detail.forEach((error) => {
          showToast("error", getValidationMessage(error));
        });
        return;
      }

      if (res.status === 401 || res.status === 403) {
        showToast("error", data.detail?.error || "Неверный email или пароль");
        return;
      }

      showToast(
        "error",
        data.detail?.error || "Авторизация провалена"
      );

    } catch (error) {
      console.error("Login error:", error);
      showToast("error", "Ошибка сети. Попробуйте позже");
    }
  });
}