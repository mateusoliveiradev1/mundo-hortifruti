// main.js

// Toggle do menu mobile
const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

menuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Modal de comentários
const modal = document.getElementById("modal");

function abrirModal() {
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function fecharModal() {
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}

// Fecha modal ao clicar fora do conteúdo
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    fecharModal();
  }
});
