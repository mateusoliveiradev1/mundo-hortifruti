import jwt from "jsonwebtoken";

// Gera um token JWT com o ID do usuário
export function gerarToken(usuarioId) {
  return jwt.sign({ id: usuarioId }, process.env.JWT_SECRET, {
    expiresIn: "7d", // Token válido por 7 dias
  });
}
