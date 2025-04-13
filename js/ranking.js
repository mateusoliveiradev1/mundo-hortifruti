// ranking.js

// Aplicar degrade moderno no fundo do body
// Já definido via Tailwind na tag <body>

// Aguarda carregamento da DOM

// Exibe dados de autenticação e manipula visibilidade do menu

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("ranking-container");
  const perfilLink = document.getElementById("link-perfil");
  const mobilePerfilLink = document.getElementById("mobile-link-perfil");
  const logoutBtn = document.getElementById("btn-logout");
  const mobileLogoutBtn = document.getElementById("mobile-btn-logout");
  const loginLink = document.getElementById("link-login");
  const cadastroLink = document.getElementById("link-cadastro");
  const mobileLoginLink = document.getElementById("mobile-link-login");
  const mobileCadastroLink = document.getElementById("mobile-link-cadastro");

  const usuarioLogado = localStorage.getItem("usuarioLogado");

  if (usuarioLogado) {
    perfilLink?.classList.remove("hidden");
    logoutBtn?.classList.remove("hidden");
    mobilePerfilLink?.classList.remove("hidden");
    mobileLogoutBtn?.classList.remove("hidden");
    loginLink?.classList.add("hidden");
    cadastroLink?.classList.add("hidden");
    mobileLoginLink?.classList.add("hidden");
    mobileCadastroLink?.classList.add("hidden");
  } else {
    perfilLink?.classList.add("hidden");
    logoutBtn?.classList.add("hidden");
    mobilePerfilLink?.classList.add("hidden");
    mobileLogoutBtn?.classList.add("hidden");
    loginLink?.classList.remove("hidden");
    cadastroLink?.classList.remove("hidden");
    mobileLoginLink?.classList.remove("hidden");
    mobileCadastroLink?.classList.remove("hidden");
  }

  const dadosRanking = [
    { loja: "Monte Aprazível", mediaEstrelas: 4.7, totalComentarios: 23 },
    { loja: "Jales", mediaEstrelas: 4.5, totalComentarios: 18 },
    { loja: "Aparecida", mediaEstrelas: 4.4, totalComentarios: 15 },
    { loja: "Votuporanga", mediaEstrelas: 4.3, totalComentarios: 13 },
    { loja: "Fernandópolis", mediaEstrelas: 4.2, totalComentarios: 11 },
  ];

  if (container) {
    container.innerHTML = dadosRanking
      .map(
        (loja, i) => `
      <div class="bg-gradient-to-r from-blue-100 to-blue-50 border border-blue-200 rounded-2xl shadow-lg p-6 mb-6 hover:scale-[1.02] transition-transform duration-300">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-xl font-bold text-blue-900">${i + 1}º - ${
          loja.loja
        }</h3>
          <span class="text-sm text-blue-700 font-medium bg-blue-100 rounded-full px-3 py-1">⭐ ${
            loja.mediaEstrelas
          }</span>
        </div>
        <p class="text-gray-600">💬 Comentários: <span class="font-semibold text-blue-700">${
          loja.totalComentarios
        }</span></p>
      </div>
    `
      )
      .join("");
  }
});
