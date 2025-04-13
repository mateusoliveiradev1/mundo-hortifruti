// utils/validarCamposObrigatorios.js

export const validarCamposObrigatorios = (objeto, campos) => {
  const erros = [];

  campos.forEach((campo) => {
    if (!objeto[campo] || objeto[campo].toString().trim() === "") {
      erros.push(`O campo '${campo}' é obrigatório.`);
    }
  });

  return erros;
};
