export function initTaskModal() {
  const modal = document.getElementById("task-modal");
  const openBtn = document.querySelector(".primary-btn");
  const closeBtn = document.getElementById("close-modal");
  const form = document.getElementById("task-form")

  if (!modal) return;
  if (!openBtn) return;
  if (!closeBtn) return;

  openBtn.addEventListener("click", () => {

    form.reset();

    delete form.dataset.mode;
    delete form.dataset.taskId;

    form.querySelector(".save-task-btn").textContent =
        "Создать задачу";

    modal.classList.add("show");
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("show");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("show");
    }
  });

   document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("show")) {
      modal.classList.remove("show");
    }
  });

}
