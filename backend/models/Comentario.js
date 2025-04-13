import mongoose from "mongoose";

const comentarioSchema = new mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    foto: { type: mongoose.Schema.Types.ObjectId, ref: "Foto", required: true },
    texto: { type: String, required: true },
  },
  { timestamps: true }
);

const Comentario = mongoose.model("Comentario", comentarioSchema);

export default Comentario;
