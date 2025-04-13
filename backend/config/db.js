// Conexão com MongoDB Atlas
import mongoose from "mongoose";

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB conectado com sucesso");
  } catch (erro) {
    console.error("❌ Erro ao conectar ao MongoDB:", erro.message);
    process.exit(1);
  }
};

export default conectarDB;
