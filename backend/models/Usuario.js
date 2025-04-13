// models/Usuario.js

import mongoose from "mongoose";
import bcrypt from "bcrypt";

const usuarioSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    senha: {
      type: String,
      required: true,
    },
    lojaFavorita: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// 🔐 Criptografar senha antes de salvar
usuarioSchema.pre("save", async function (next) {
  if (!this.isModified("senha")) return next();
  try {
    this.senha = await bcrypt.hash(this.senha, 10);
    next();
  } catch (erro) {
    next(erro);
  }
});

// Método para verificar senha
usuarioSchema.methods.compararSenha = async function (senhaDigitada) {
  return bcrypt.compare(senhaDigitada, this.senha);
};

const Usuario = mongoose.model("Usuario", usuarioSchema);

export default Usuario;
