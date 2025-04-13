// painel.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("upload-form");
  const imagemInput = document.getElementById("imagem");
  const lojaSelect = document.getElementById("loja");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const imagem = imagemInput.files[0];
      const loja = lojaSelect.value;

      if (!imagem || !loja) {
        alert("Por favor, selecione uma imagem e uma loja.");
        return;
      }

      const formData = new FormData();
      formData.append("imagem", imagem);
      formData.append("loja", loja);

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (response.ok) {
          alert("Imagem enviada com sucesso!");
          form.reset();
        } else {
          alert(data.message || "Erro ao enviar imagem.");
        }
      } catch (error) {
        console.error(error);
        alert("Erro ao conectar com o servidor.");
      }
    });
  }
});
