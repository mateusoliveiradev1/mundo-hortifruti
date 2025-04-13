import nodemailer from "nodemailer";

const enviarEmail = async ({ para, assunto, mensagemHtml }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // ou 'hotmail', 'outlook', etc.
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Mundo Hortifruti" <${process.env.EMAIL_USER}>`,
      to: para,
      subject: assunto,
      html: mensagemHtml,
    };

    await transporter.sendMail(mailOptions);
    console.log("E-mail enviado com sucesso!");
  } catch (erro) {
    console.error("Erro ao enviar e-mail:", erro);
  }
};

export default enviarEmail;
