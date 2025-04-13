// contato.js

// Controle de navegação baseado em login
const usuario = localStorage.getItem("usuarioLogado");
if (usuario) {
  document.getElementById("perfil-link")?.classList.remove("hidden");
  document.getElementById("perfil-link-mobile")?.classList.remove("hidden");
  document.getElementById("login-link")?.classList.add("hidden");
  document.getElementById("login-link-mobile")?.classList.add("hidden");
  document.getElementById("cadastro-link")?.classList.add("hidden");
  document.getElementById("cadastro-link-mobile")?.classList.add("hidden");
}

// Menu hamburguer
const toggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
toggle?.addEventListener("click", () => {
  mobileMenu?.classList.toggle("hidden");
});

// Validação e envio do formulário
const form = document.querySelector("form");

form?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const mensagem = document.getElementById("mensagem").value.trim();

  if (!nome || !email || !mensagem) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    alert("E-mail inválido.");
    return;
  }

  // Aqui você poderia integrar com o backend
  try {
    // Simulação de envio (quando backend estiver pronto, substitui por fetch real)
    /*
    const resposta = await fetch("/api/contato", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, mensagem }),
    });

    const resultado = await resposta.json();
    */

    alert("Mensagem enviada com sucesso! Em breve entraremos em contato.");
    form.reset();
  } catch (error) {
    alert("Erro ao enviar mensagem. Tente novamente mais tarde.");
  }
});
