// middlewares/errorMiddleware.js

const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    mensagem: "Erro interno do servidor",
    erro: err.message,
  });
};

export default errorMiddleware;
