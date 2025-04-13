import mongoose from "mongoose";

const fotoSchema = new mongoose.Schema(
  {
    legenda: {
      type: String,
      required: true,
    },
    loja: {
      type: String,
      required: true,
    },
    imagemUrl: {
      type: String,
      required: true,
    },
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    comentarios: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comentario",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Foto", fotoSchema);
