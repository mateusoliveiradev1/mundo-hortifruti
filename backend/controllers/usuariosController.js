import Usuario from "../models/Usuario.js";
import gerarToken from "../utils/gerarToken.js";

// Criar novo usuário
export async function registrarUsuario(req, res) {
  try {
    const { nome, email, senha } = req.body;

    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ mensagem: "Email já está em uso" });
    }

    const novoUsuario = new Usuario({ nome, email, senha });
    await novoUsuario.save();

    res.status(201).json({
      sucesso: true,
      mensagem: "Usuário registrado com sucesso",
      token: gerarToken(novoUsuario._id),
    });
  } catch (erro) {
    res.status(500).json({ mensagem: "Erro ao registrar usuário" });
  }
}

// Login
export async function loginUsuario(req, res) {
  try {
    const { email, senha } = req.body;

    const usuario = await Usuario.findOne({ email });
    if (!usuario || !(await usuario.compararSenha(senha))) {
      return res.status(401).json({ mensagem: "Credenciais inválidas" });
    }

    res.json({
      sucesso: true,
      mensagem: "Login bem-sucedido",
      token: gerarToken(usuario._id),
    });
  } catch (erro) {
    res.status(500).json({ mensagem: "Erro ao fazer login" });
  }
}
