export const validarCamposObrigatorios = (campos) => {
  return (req, res, next) => {
    const erros = [];

    campos.forEach((campo) => {
      if (!req.body[campo]) {
        erros.push(`O campo '${campo}' é obrigatório.`);
      }
    });

    if (erros.length > 0) {
      return res.status(400).json({ erros });
    }

    next();
  };
};
