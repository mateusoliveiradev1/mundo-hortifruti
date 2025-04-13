import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import conectarDB from "./config/db.js";

// ROTAS
import usuarioRoutes from "./routes/usuarios.routes.js";
import fotoRoutes from "./routes/fotos.routes.js";
import avaliacaoRoutes from "./routes/avaliacoes.routes.js";
import comentarioRoutes from "./routes/comentarios.routes.js";
import perfilRoutes from "./routes/perfil.routes.js";
import rankingRoutes from "./routes/ranking.routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

conectarDB();

// MIDDLEWARES
app.use(cors());
app.use(express.json()); // <- ESSENCIAL para POST funcionar!
app.use("/uploads", express.static("uploads"));

// ROTAS REGISTRADAS
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/fotos", fotoRoutes);
app.use("/api/avaliacoes", avaliacaoRoutes);
app.use("/api/comentarios", comentarioRoutes);
app.use("/api/perfil", perfilRoutes);
app.use("/api/ranking", rankingRoutes);

// INICIAR SERVIDOR
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
