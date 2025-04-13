// routes/usuariosRoutes.js
import express from "express";
import {
  cadastrarUsuario,
  loginUsuario,
  editarPerfil,
} from "../controllers/usuariosController.js";
import autenticar from "../middlewares/autenticar.js";

const router = express.Router();

router.post("/cadastrar", cadastrarUsuario);
router.post("/login", loginUsuario);
router.put("/editar", autenticar, editarPerfil);

export default router;
