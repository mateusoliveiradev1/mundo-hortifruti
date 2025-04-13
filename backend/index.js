// index.js com conexão e rotas configuradas
// index.js

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import conectarDB from "./config/db.js";

import usuarioRoutes from "./routes/usuarios.routes.js";
import fotoRoutes from "./routes/fotos.routes.js";
import avaliacaoRoutes from "./routes/avaliacoes.routes.js";
import comentarioRoutes from "./routes/comentarios.routes.js";
import rankingRoutes from "./routes/ranking.routes.js";
import perfilRoutes from "./routes/perfil.routes.js";

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conecta ao MongoDB
conectarDB();

// Rotas principais
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/fotos", fotoRoutes);
app.use("/api/avaliacoes", avaliacaoRoutes);
app.use("/api/comentarios", comentarioRoutes);
app.use("/api/ranking", rankingRoutes);
app.use("/api/perfil", perfilRoutes);

// Porta
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
