// controllers/rankingController.js
import Foto from "../models/Foto.js";
import Avaliacao from "../models/Avaliacao.js";

export const obterRanking = async (req, res) => {
  try {
    // Busca todas as fotos com suas avaliações
    const fotos = await Foto.find().populate("avaliacoes");

    const lojas = {};

    // Agrupa por loja e acumula somas e contagens
    fotos.forEach((foto) => {
      const { loja, avaliacoes } = foto;

      if (!lojas[loja]) {
        lojas[loja] = { totalEstrelas: 0, totalAvaliacoes: 0 };
      }

      avaliacoes.forEach((avaliacao) => {
        lojas[loja].totalEstrelas += avaliacao.estrelas;
        lojas[loja].totalAvaliacoes++;
      });
    });

    // Calcula média por loja
    const ranking = Object.entries(lojas)
      .map(([loja, dados]) => {
        const media =
          dados.totalAvaliacoes > 0
            ? dados.totalEstrelas / dados.totalAvaliacoes
            : 0;
        return { loja, media: parseFloat(media.toFixed(2)) };
      })
      .sort((a, b) => b.media - a.media);

    res.status(200).json(ranking);
  } catch (erro) {
    res.status(500).json({ mensagem: "Erro ao gerar ranking" });
  }
};
