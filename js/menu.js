// menu.js

// Verifica autenticação usando token armazenado (pode ser substituído por lógica real com JWT)
const isAuthenticated = Boolean(localStorage.getItem("token"));

const perfilDesktop = document.getElementById("perfil-link");
const perfilMobile = document.getElementById("perfil-link-mobile");
const loginDesktop = document.getElementById("login-link");
const loginMobile = document.getElementById("login-link-mobile");
const cadastroDesktop = document.getElementById("cadastro-link");
const cadastroMobile = document.getElementById("cadastro-link-mobile");

if (isAuthenticated) {
  perfilDesktop?.classList.remove("hidden");
  perfilMobile?.classList.remove("hidden");
  loginDesktop?.classList.add("hidden");
  loginMobile?.classList.add("hidden");
  cadastroDesktop?.classList.add("hidden");
  cadastroMobile?.classList.add("hidden");
} else {
  perfilDesktop?.classList.add("hidden");
  perfilMobile?.classList.add("hidden");
  loginDesktop?.classList.remove("hidden");
  loginMobile?.classList.remove("hidden");
  cadastroDesktop?.classList.remove("hidden");
  cadastroMobile?.classList.remove("hidden");
}

// Toggle do menu mobile
const toggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

if (toggle && mobileMenu) {
  toggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}
