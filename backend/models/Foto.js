import mongoose from "mongoose";

const fotoSchema = new mongoose.Schema(
  {
    imagem: { type: String, required: true },
    legenda: { type: String },
    loja: { type: String, required: true },
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },
  },
  { timestamps: true }
);

const Foto = mongoose.model("Foto", fotoSchema);

export default Foto;
