export function initLogin() {
  const form = document.querySelector("#login-form");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    const res = await fetch("/auth/login", {
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

    if (res.ok) {
      showToast("Успешный вход", "success");

      setTimeout(() => {
        window.location.href = "/";
      }, 800);
    } else {
      const data = await res.json();
      showToast(data.detail || "Авторизация провалена", "error");
    }
  });
}
