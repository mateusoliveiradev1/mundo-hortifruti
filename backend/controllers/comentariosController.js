import Comentario from "../models/Comentario.js";

// Criar um novo comentário
async function criarComentario(req, res) {
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
    res.status(500).json({ erro: "Erro ao criar comentário" });
  }
}

// Listar comentários por foto
async function listarComentariosPorFoto(req, res) {
  try {
    const { fotoId } = req.params;

    const comentarios = await Comentario.find({ foto: fotoId })
      .populate("usuario", "nome")
      .sort({ createdAt: -1 });

    res.json(comentarios);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao listar comentários" });
  }
}

// 👇 Exportações nomeadas
export { criarComentario, listarComentariosPorFoto };
