import mongoose from "mongoose";

const avaliacaoSchema = new mongoose.Schema(
  {
    estrelas: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    foto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Foto",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Avaliacao", avaliacaoSchema);
