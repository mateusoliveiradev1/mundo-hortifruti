import express from "express";
import autenticar from "../middlewares/autenticar.js";
import { autenticar } from "../middlewares/autenticar.js";

const router = express.Router();

// POST /api/avaliacoes – Avaliar uma foto
router.post("/", autenticar, async (req, res) => {
  try {
    const { foto, nota } = req.body;

    const novaAvaliacao = new Avaliacao({
      usuario: req.usuarioId,
      foto,
      nota,
    });

    await novaAvaliacao.save();
    res.status(201).json(novaAvaliacao);
  } catch (erro) {
    console.error("Erro ao criar avaliação:", erro);
    res.status(500).json({ erro: "Erro ao criar avaliação." });
  }
});

export default router;
