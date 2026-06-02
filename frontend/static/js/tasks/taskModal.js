export function initTaskModal() {
  const modal = document.getElementById("task-modal");
  const openBtn = document.querySelector(".primary-btn");
  const closeBtn = document.getElementById("close-modal");

  if (!modal) return;
  if (!openBtn) return;
  if (!closeBtn) return;

  openBtn.addEventListener("click", () => {
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
}
