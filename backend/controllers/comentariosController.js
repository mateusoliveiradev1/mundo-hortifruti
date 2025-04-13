// controllers/comentariosController.js
import Comentario from "../models/Comentario.js";
import Foto from "../models/Foto.js";

export const comentarFoto = async (req, res) => {
  const { texto } = req.body;
  const { fotoId } = req.params;

  try {
    const foto = await Foto.findById(fotoId);
    if (!foto) {
      return res.status(404).json({ mensagem: "Foto não encontrada" });
    }

    const novoComentario = new Comentario({
      texto,
      usuario: req.usuario.id,
      foto: fotoId,
    });

    await novoComentario.save();

    foto.comentarios.push(novoComentario._id);
    await foto.save();

    res.status(201).json(novoComentario);
  } catch (erro) {
    res.status(500).json({ mensagem: "Erro ao comentar na foto" });
  }
};
