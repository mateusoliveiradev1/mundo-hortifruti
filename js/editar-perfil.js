// editar-perfil.js

document.addEventListener("DOMContentLoaded", () => {
  const avatarInput = document.getElementById("avatar-input");
  const avatarPreview = document.getElementById("avatar-preview");

  avatarInput?.addEventListener("change", () => {
    const file = avatarInput.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        avatarPreview.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });
});
