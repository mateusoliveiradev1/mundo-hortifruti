// routes/perfil.routes.js

import express from "express";
import {
  atualizarPerfil,
  obterPerfil,
} from "../controllers/perfilController.js";
import autenticar from "../middlewares/autenticar.js";

const router = express.Router();

// Rota GET para obter dados do perfil do usuário autenticado
router.get("/", autenticar, obterPerfil);

// Rota PUT para atualizar dados do perfil do usuário autenticado
router.put("/", autenticar, atualizarPerfil);

export default router;
