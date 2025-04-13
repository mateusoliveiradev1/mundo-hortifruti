import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";
import autenticar from "../middlewares/autenticar.js";

const router = express.Router();

// POST /cadastro – Criar novo usuário
router.post("/cadastro", async (req, res) => {
  try {
    const { nome, email, senha, lojaFavorita } = req.body;

    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente)
      return res.status(400).json({ erro: "Email já cadastrado." });

    const senhaCriptografada = await bcrypt.hash(senha, 10);
    const novoUsuario = new Usuario({
      nome,
      email,
      senha: senhaCriptografada,
      lojaFavorita,
    });

    await novoUsuario.save();
    res.status(201).json({ mensagem: "Usuário criado com sucesso." });
  } catch (err) {
    res.status(500).json({ erro: "Erro ao cadastrar usuário." });
  }
});

// POST /login – Autenticação com JWT
router.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await Usuario.findOne({ email });
    if (!usuario)
      return res.status(404).json({ erro: "Usuário não encontrado." });

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) return res.status(401).json({ erro: "Senha incorreta." });

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    res.json({
      token,
      usuario: {
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email,
        lojaFavorita: usuario.lojaFavorita,
      },
    });
  } catch (err) {
    res.status(500).json({ erro: "Erro ao fazer login." });
  }
});

export default router;
