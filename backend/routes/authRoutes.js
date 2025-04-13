import express from "express";
import {
  loginUsuario,
  registrarUsuario,
} from "../controllers/authController.js";

const router = express.Router();

// Rota de registro de usuário
router.post("/registrar", registrarUsuario);

// Rota de login de usuário
router.post("/login", loginUsuario);

export default router;
