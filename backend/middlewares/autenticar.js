// middlewares/autenticar.js
import jwt from "jsonwebtoken";

const autenticar = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ mensagem: "Token não fornecido" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (erro) {
    res.status(401).json({ mensagem: "Token inválido" });
  }
};

export default autenticar;
