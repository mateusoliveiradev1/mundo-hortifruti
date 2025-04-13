document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("cadastro-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;

    if (!nome || !email || !senha) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await fetch("/api/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, email, senha }),
      });

      if (!response.ok) {
        const erro = await response.json();
        alert(erro.mensagem || "Erro ao cadastrar. Tente novamente.");
        return;
      }

      alert("Cadastro realizado com sucesso!");
      window.location.href = "/login.html";
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      alert(
        "Erro de conexão. Verifique sua internet ou tente novamente mais tarde."
      );
    }
  });
});
