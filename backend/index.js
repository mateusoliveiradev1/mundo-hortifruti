import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

// Routes
import authRoutes from "./routes/authRoutes.js";
import usuariosRoutes from "./routes/usuarios.routes.js";
import fotosRoutes from "./routes/fotos.routes.js";
import avaliacoesRoutes from "./routes/avaliacoes.routes.js";
import comentariosRoutes from "./routes/comentarios.routes.js";
import perfilRoutes from "./routes/perfil.routes.js";
import rankingRoutes from "./routes/ranking.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Rotas
app.use("/api/auth", authRoutes);
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/fotos", fotosRoutes);
app.use("/api/avaliacoes", avaliacoesRoutes);
app.use("/api/comentarios", comentariosRoutes);
app.use("/api/perfil", perfilRoutes);
app.use("/api/ranking", rankingRoutes);

// Conexão com MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB conectado com sucesso");
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
  })
  .catch((err) => {
    console.error("Erro ao conectar ao MongoDB:", err.message);
  });
