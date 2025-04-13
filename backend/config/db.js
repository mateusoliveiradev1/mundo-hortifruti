import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB conectado com sucesso");
  } catch (erro) {
    console.error("❌ Erro ao conectar ao MongoDB:", erro.message);
    process.exit(1);
  }
};

export default conectarDB;
