import { showToast } from "../modules/showToast.js";
import { API_URL } from "../modules/config.js";

export function initRegister() {
  const form = document.querySelector("#register-form");

  if (!form) {
    console.error("Form not found");
    return;
  }

  function getValidationMessage(error) {
    const field = error.loc?.[1];

    switch (field) {
      case "username":
        if (error.type?.includes("too_short")) {
          return "Имя пользователя должно содержать минимум 6 символов";
        }

        if (error.type?.includes("too_long")) {
          return "Имя пользователя не должно превышать 30 символов";
        }

        return "Некорректное имя пользователя";

      case "email":
        return "Введите корректный email";

      case "password":
        if (error.type?.includes("too_short")) {
          return "Пароль должен содержать минимум 6 символов";
        }

        if (error.type?.includes("too_long")) {
          return "Пароль не должен превышать 128 символов";
        }

        return "Некорректный пароль";

      case "password_repeat":
        return "Некорректное подтверждение пароля";

      default:
        return error.msg || "Ошибка валидации";
    }
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const usernameInput = document.getElementById("register-name");
    const emailInput = document.getElementById("register-email");
    const passwordInput = document.getElementById("register-password");
    const repeatPasswordInput = document.getElementById("register-password-repeat");

    if (!usernameInput) {
      showToast("error", "Поле имени не найдено");
      return;
    }

    if (!emailInput) {
      showToast("error", "Поле email не найдено");
      return;
    }

    if (!passwordInput) {
      showToast("error", "Поле пароля не найдено");
      return;
    }

    if (!repeatPasswordInput) {
      showToast("error", "Поле подтверждения пароля не найдено");
      return;
    }

    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const repeat_password = repeatPasswordInput.value;

    if (username.length < 6) {
      showToast("error", "Имя пользователя должно содержать минимум 6 символов");
      return;
    }

    if (username.length > 30) {
      showToast("error", "Имя пользователя не должно превышать 30 символов");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      showToast("error", "Введите корректный email");
      return;
    }

    if (password.length < 6) {
      showToast("error", "Пароль должен содержать минимум 6 символов");
      return;
    }

    if (password.length > 128) {
      showToast("error", "Пароль не должен превышать 128 символов");
      return;
    }

    if (password !== repeat_password) {
      showToast("error", "Пароли не совпадают");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          password_repeat: repeat_password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        showToast("success", "Регистрация успешна!");

        setTimeout(() => {
          window.location.href = "/auth/login";
        }, 1000);

        return;
      }

      if (res.status === 422) {
        data.detail.forEach((error) => {
          showToast("error", getValidationMessage(error));
        });
        return;
      }

      if (res.status === 409) {
        showToast(
          "error",
          data.detail?.error || "Пользователь уже существует"
        );
        return;
      }

      if (res.status === 400) {
        showToast(
          "error",
          data.detail?.error || "Некорректные данные"
        );
        return;
      }

      showToast(
        "error",
        data.detail?.error || "Произошла ошибка при регистрации"
      );

    } catch (error) {
      console.error("Registration error:", error);
      showToast("error", "Ошибка сети. Попробуйте позже");
    }
  });
}