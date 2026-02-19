const toggles = document.querySelectorAll(".js-collapse-toggle");

toggles.forEach(toggle => {
  toggle.addEventListener("click", () => {
    const container = toggle.closest(".config-container");
    if (!container) return;

    container.classList.toggle("collapsed");
  });
});