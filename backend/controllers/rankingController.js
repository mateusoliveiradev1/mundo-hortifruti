// controllers/rankingController.js

import Avaliacao from "../models/Avaliacao.js";

export const obterRankingLojas = async (req, res) => {
  try {
    const resultado = await Avaliacao.aggregate([
      {
        $lookup: {
          from: "fotos",
          localField: "foto",
          foreignField: "_id",
          as: "fotoInfo",
        },
      },
      { $unwind: "$fotoInfo" },
      {
        $group: {
          _id: "$fotoInfo.loja",
          media: { $avg: "$nota" },
          totalAvaliacoes: { $sum: 1 },
          totalFotos: { $addToSet: "$foto" },
        },
      },
      {
        $project: {
          loja: "$_id",
          media: { $round: ["$media", 2] },
          totalAvaliacoes: 1,
          totalFotos: { $size: "$totalFotos" },
          _id: 0,
        },
      },
      { $sort: { media: -1 } },
    ]);

    res.status(200).json({
      success: true,
      message: "Ranking das lojas gerado com sucesso",
      data: resultado,
    });
  } catch (erro) {
    console.error("Erro ao gerar ranking:", erro);
    res.status(500).json({
      success: false,
      message: "Erro ao gerar ranking das lojas",
    });
  }
};
