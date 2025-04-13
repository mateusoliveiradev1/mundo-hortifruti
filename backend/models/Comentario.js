import mongoose from "mongoose";

const comentarioSchema = new mongoose.Schema(
  {
    texto: {
      type: String,
      required: true,
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

export default mongoose.model("Comentario", comentarioSchema);
