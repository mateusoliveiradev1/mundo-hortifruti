// perfil.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-editar-perfil");
  const nomeInput = document.getElementById("nome");
  const emailInput = document.getElementById("email");
  const avatarInput = document.getElementById("avatar");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const nome = nomeInput.value.trim();
      const email = emailInput.value.trim();
      const avatar = avatarInput.files[0];

      if (!nome || !email) {
        alert("Preencha todos os campos obrigatórios.");
        return;
      }

      const formData = new FormData();
      formData.append("nome", nome);
      formData.append("email", email);
      if (avatar) formData.append("avatar", avatar);

      try {
        const response = await fetch("/api/editar-perfil", {
          method: "PUT",
          body: formData,
        });

        const data = await response.json();

        if (response.ok) {
          alert("Perfil atualizado com sucesso!");
        } else {
          alert(data.message || "Erro ao atualizar perfil.");
        }
      } catch (error) {
        console.error(error);
        alert("Erro ao conectar com o servidor.");
      }
    });
  }
});
