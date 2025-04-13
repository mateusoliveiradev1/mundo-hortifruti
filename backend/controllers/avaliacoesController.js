// controllers/avaliacoesController.js
import Avaliacao from "../models/Avaliacao.js";
import Foto from "../models/Foto.js";

// Criar nova avaliação
export const avaliarFoto = async (req, res) => {
  const { fotoId } = req.params;
  const { nota } = req.body;

  try {
    if (nota < 1 || nota > 5) {
      return res.status(400).json({ mensagem: "Nota deve ser entre 1 e 5" });
    }

    const avaliacaoExistente = await Avaliacao.findOne({
      foto: fotoId,
      usuario: req.usuario.id,
    });

    if (avaliacaoExistente) {
      avaliacaoExistente.nota = nota;
      await avaliacaoExistente.save();
      return res.status(200).json({ mensagem: "Avaliação atualizada" });
    }

    const novaAvaliacao = new Avaliacao({
      foto: fotoId,
      usuario: req.usuario.id,
      nota,
    });

    await novaAvaliacao.save();
    res.status(201).json({ mensagem: "Avaliação registrada" });
  } catch (erro) {
    res.status(500).json({ mensagem: "Erro ao avaliar foto" });
  }
};

// Buscar avaliações de uma foto
export const listarAvaliacoes = async (req, res) => {
  const { fotoId } = req.params;

  try {
    const avaliacoes = await Avaliacao.find({ foto: fotoId }).populate(
      "usuario",
      "nome"
    );
    res.status(200).json(avaliacoes);
  } catch (erro) {
    res.status(500).json({ mensagem: "Erro ao buscar avaliações" });
  }
};

// Calcular média de avaliações
export const mediaAvaliacoes = async (req, res) => {
  const { fotoId } = req.params;

  try {
    const resultado = await Avaliacao.aggregate([
      { $match: { foto: new Foto.Types.ObjectId(fotoId) } },
      {
        $group: {
          _id: "$foto",
          media: { $avg: "$nota" },
          total: { $sum: 1 },
        },
      },
    ]);

    if (!resultado.length) {
      return res.status(404).json({ mensagem: "Sem avaliações" });
    }

    res.status(200).json({
      media: resultado[0].media,
      total: resultado[0].total,
    });
  } catch (erro) {
    res.status(500).json({ mensagem: "Erro ao calcular média" });
  }
};
