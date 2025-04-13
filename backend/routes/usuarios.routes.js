// 📌 Login de usuário
router.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado." });
    }

    const senhaValida = await usuario.compararSenha(senha);
    if (!senhaValida) {
      return res.status(401).json({ erro: "Senha incorreta." });
    }

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    res.json({
      token,
      usuario: {
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email,
        lojaFavorita: usuario.lojaFavorita,
      },
    });
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao fazer login." });
  }
});

export default router;
