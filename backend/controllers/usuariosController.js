// Controller de usuários funcionando
// controllers/usuariosController.js
import Usuario from "../models/Usuario.js";
import gerarToken from "../utils/gerarToken.js";
import bcrypt from "bcryptjs";

// Cadastro
export const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ mensagem: "Email já cadastrado" });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);
    const novoUsuario = new Usuario({ nome, email, senha: senhaCriptografada });
    await novoUsuario.save();

    res.status(201).json({
      _id: novoUsuario._id,
      nome: novoUsuario.nome,
      email: novoUsuario.email,
      token: gerarToken(novoUsuario._id),
    });
  } catch (erro) {
    res.status(500).json({ mensagem: "Erro ao cadastrar usuário" });
  }
};

// Login
export const loginUsuario = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ mensagem: "Credenciais inválidas" });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ mensagem: "Credenciais inválidas" });
    }

    res.status(200).json({
      _id: usuario._id,
      nome: usuario.nome,
      email: usuario.email,
      token: gerarToken(usuario._id),
    });
  } catch (erro) {
    res.status(500).json({ mensagem: "Erro ao fazer login" });
  }
};

// Editar perfil
export const editarPerfil = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const usuario = await Usuario.findById(req.usuario.id);
    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    if (nome) usuario.nome = nome;
    if (email) usuario.email = email;
    if (senha) usuario.senha = await bcrypt.hash(senha, 10);

    await usuario.save();

    res.status(200).json({ mensagem: "Perfil atualizado com sucesso" });
  } catch (erro) {
    res.status(500).json({ mensagem: "Erro ao atualizar perfil" });
  }
};
