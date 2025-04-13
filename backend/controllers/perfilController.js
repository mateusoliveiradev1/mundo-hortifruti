import Usuario from "../models/Usuario.js";

// GET /api/perfil - Retorna os dados do usuário autenticado
export async function obterPerfil(req, res) {
  try {
    const usuario = await Usuario.findById(req.usuarioId).select("-senha");

    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    res.status(200).json({ sucesso: true, usuario });
  } catch (erro) {
    console.error("Erro ao obter perfil:", erro);
    res.status(500).json({ mensagem: "Erro ao obter perfil" });
  }
}

// PUT /api/perfil - Atualiza dados do usuário autenticado
export async function atualizarPerfil(req, res) {
  try {
    const { nome, email } = req.body;

    const usuarioAtualizado = await Usuario.findByIdAndUpdate(
      req.usuarioId,
      { nome, email },
      { new: true, runValidators: true }
    ).select("-senha");

    if (!usuarioAtualizado) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    res.status(200).json({
      sucesso: true,
      mensagem: "Perfil atualizado com sucesso",
      usuario: usuarioAtualizado,
    });
  } catch (erro) {
    console.error("Erro ao atualizar perfil:", erro);
    res.status(500).json({ mensagem: "Erro ao atualizar perfil" });
  }
}
