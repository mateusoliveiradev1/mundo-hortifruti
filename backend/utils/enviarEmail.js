// utils/enviarEmail.js

export const enviarEmail = async ({ para, assunto, mensagem }) => {
  try {
    // Aqui seria a integração real com serviço tipo SendGrid, Mailgun etc.
    console.log("📧 Simulando envio de email:");
    console.log("Para:", para);
    console.log("Assunto:", assunto);
    console.log("Mensagem:", mensagem);
    return true;
  } catch (erro) {
    console.error("Erro ao enviar email:", erro);
    return false;
  }
};
