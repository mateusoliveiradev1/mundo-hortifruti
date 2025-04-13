import express from "express";
import { autenticar } from "../middlewares/autenticar.js";
import Comentario from "../models/Comentario.js";

const router = express.Router();

// POST /api/comentarios – Adicionar comentário a uma foto
router.post("/", autenticar, async (req, res) => {
  try {
    const { foto, texto } = req.body;

    const novoComentario = new Comentario({
      usuario: req.usuarioId,
      foto,
      texto,
    });

    await novoComentario.save();
    res.status(201).json(novoComentario);
  } catch (erro) {
    console.error("Erro ao criar comentário:", erro);
    res.status(500).json({ erro: "Erro ao criar comentário." });
  }
});

export default router;
