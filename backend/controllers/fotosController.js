// controllers/fotosController.js
import Foto from "../models/Foto.js";

// Enviar nova foto
export const enviarFoto = async (req, res) => {
  const { legenda, loja, imagemUrl } = req.body;

  try {
    const novaFoto = new Foto({
      legenda,
      loja,
      imagemUrl,
      usuario: req.usuario.id,
    });

    await novaFoto.save();
    res.status(201).json(novaFoto);
  } catch (erro) {
    res.status(500).json({ mensagem: "Erro ao enviar foto" });
  }
};

// Buscar todas as fotos com usuário e avaliações
export const buscarFotos = async (req, res) => {
  try {
    const fotos = await Foto.find()
      .populate("usuario", "nome")
      .populate("comentarios")
      .sort({ createdAt: -1 });
    res.status(200).json(fotos);
  } catch (erro) {
    res.status(500).json({ mensagem: "Erro ao buscar fotos" });
  }
};

// Deletar foto (por usuário dono)
export const deletarFoto = async (req, res) => {
  const { id } = req.params;

  try {
    const foto = await Foto.findById(id);
    if (!foto) {
      return res.status(404).json({ mensagem: "Foto não encontrada" });
    }

    if (foto.usuario.toString() !== req.usuario.id) {
      return res.status(401).json({ mensagem: "Ação não autorizada" });
    }

    await foto.deleteOne();
    res.status(200).json({ mensagem: "Foto deletada com sucesso" });
  } catch (erro) {
    res.status(500).json({ mensagem: "Erro ao deletar foto" });
  }
};
