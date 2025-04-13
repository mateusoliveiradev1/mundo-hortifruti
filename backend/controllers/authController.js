// controllers/usuariosController.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";

// Cadastro de novo usuário
export const cadastrarUsuario = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ mensagem: "Email já cadastrado." });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const novoUsuario = new Usuario({
      nome,
      email,
      senha: senhaCriptografada,
    });

    await novoUsuario.save();

    res.status(201).json({ mensagem: "Usuário cadastrado com sucesso." });
  } catch (erro) {
    console.error("Erro ao cadastrar usuário:", erro);
    res.status(500).json({ mensagem: "Erro ao cadastrar usuário." });
  }
};

// Login de usuário
export const loginUsuario = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ mensagem: "Email ou senha inválidos." });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(400).json({ mensagem: "Email ou senha inválidos." });
    }

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      mensagem: "Login realizado com sucesso.",
      token,
      usuario: {
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email,
        lojaFavorita: usuario.lojaFavorita || "",
      },
    });
  } catch (erro) {
    console.error("Erro ao fazer login:", erro);
    res.status(500).json({ mensagem: "Erro ao fazer login." });
  }
};

// Buscar perfil do usuário logado
export const buscarPerfil = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuarioId).select("-senha");

    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado." });
    }

    res.json(usuario);
  } catch (erro) {
    console.error("Erro ao buscar perfil:", erro);
    res.status(500).json({ mensagem: "Erro ao buscar perfil." });
  }
};
