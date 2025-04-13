import express from "express";
import {
  atualizarPerfil,
  obterPerfil,
} from "../controllers/perfilController.js";
import autenticar from "../middlewares/autenticar.js";

const router = express.Router();

// Rota para obter perfil do usuário logado
router.get("/", autenticar, obterPerfil);

// Rota para atualizar o perfil do usuário logado
router.put("/", autenticar, atualizarPerfil);

export default router;
