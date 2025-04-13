// controllers/fotosController.js

import Foto from "../models/Foto.js";

// Criar nova foto
export const criarFoto = async (req, res) => {
  try {
    const { url, legenda, loja } = req.body;

    if (!url || !loja) {
      return res
        .status(400)
        .json({ erro: "Campos obrigatórios ausentes (url, loja)." });
    }

    const novaFoto = new Foto({
      usuario: req.usuarioId, // vem do middleware de autenticação
      url,
      legenda,
      loja,
    });

    await novaFoto.save();
    res.status(201).json({
      mensagem: "Foto enviada com sucesso.",
      foto: novaFoto,
    });
  } catch (erro) {
    console.error("Erro ao criar foto:", erro);
    res.status(500).json({ erro: "Erro ao enviar a foto." });
  }
};

// Listar todas as fotos
export const listarFotos = async (req, res) => {
  try {
    const fotos = await Foto.find()
      .populate("usuario", "nome") // traz só o nome do usuário
      .sort({ createdAt: -1 });

    res.status(200).json(fotos);
  } catch (erro) {
    console.error("Erro ao listar fotos:", erro);
    res.status(500).json({ erro: "Erro ao listar fotos." });
  }
};

// Obter uma foto específica por ID
export const obterFotoPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const foto = await Foto.findById(id).populate("usuario", "nome");

    if (!foto) {
      return res.status(404).json({ erro: "Foto não encontrada." });
    }

    res.status(200).json(foto);
  } catch (erro) {
    console.error("Erro ao obter foto:", erro);
    res.status(500).json({ erro: "Erro ao buscar a foto." });
  }
};
