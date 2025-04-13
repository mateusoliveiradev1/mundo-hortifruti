import mongoose from "mongoose";

const avaliacaoSchema = new mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    foto: { type: mongoose.Schema.Types.ObjectId, ref: "Foto", required: true },
    nota: { type: Number, required: true, min: 1, max: 5 },
  },
  { timestamps: true }
);

const Avaliacao = mongoose.model("Avaliacao", avaliacaoSchema);

export default Avaliacao;
