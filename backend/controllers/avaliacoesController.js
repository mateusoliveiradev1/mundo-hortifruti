import Avaliacao from "../models/Avaliacao.js";

// Criar nova avaliação
async function criarAvaliacao(req, res) {
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
    res.status(500).json({ erro: "Erro ao criar avaliação" });
  }
}

// Listar avaliações (exemplo simples)
async function listarAvaliacoes(req, res) {
  try {
    const avaliacoes = await Avaliacao.find()
      .populate("foto")
      .populate("usuario");
    res.json(avaliacoes);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao listar avaliações" });
  }
}

// 👇 Exportações nomeadas
export { criarAvaliacao, listarAvaliacoes };
