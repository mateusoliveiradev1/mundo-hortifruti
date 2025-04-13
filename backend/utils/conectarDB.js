import mongoose from "mongoose";

const conectarDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB conectado: ${conn.connection.host}`);
  } catch (erro) {
    console.error(`Erro ao conectar no MongoDB: ${erro.message}`);
    process.exit(1);
  }
};

export default conectarDB;
