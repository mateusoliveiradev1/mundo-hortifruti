// controllers/perfilController.js
import Usuario from "../models/Usuario.js";
import bcrypt from "bcryptjs";

// Obter perfil do usuário autenticado
export const obterPerfil = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id).select("-senha");
    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    res.status(200).json(usuario);
  } catch (erro) {
    res.status(500).json({ mensagem: "Erro ao buscar perfil" });
  }
};

// Atualizar dados do perfil
export const atualizarPerfil = async (req, res) => {
  const { nome, email, senhaAtual, novaSenha } = req.body;

  try {
    const usuario = await Usuario.findById(req.usuario.id);
    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    if (senhaAtual && novaSenha) {
      const senhaCorreta = await bcrypt.compare(senhaAtual, usuario.senha);
      if (!senhaCorreta) {
        return res.status(401).json({ mensagem: "Senha atual incorreta" });
      }

      const salt = await bcrypt.genSalt(10);
      usuario.senha = await bcrypt.hash(novaSenha, salt);
    }

    if (nome) usuario.nome = nome;
    if (email) usuario.email = email;

    await usuario.save();

    res.status(200).json({ mensagem: "Perfil atualizado com sucesso" });
  } catch (erro) {
    res.status(500).json({ mensagem: "Erro ao atualizar perfil" });
  }
};
