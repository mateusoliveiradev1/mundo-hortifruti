import express from "express";
import {
  criarFoto,
  listarFotos,
  obterFotoPorId,
} from "../controllers/fotosController.js";
import { autenticar } from "../middlewares/autenticar.js";

const router = express.Router();

// 📤 Enviar nova foto (proteção com autenticação)
router.post("/", autenticar, criarFoto);

// 📄 Listar todas as fotos
router.get("/", listarFotos);

// 🔍 Obter foto por ID
router.get("/:id", obterFotoPorId);

export default router;
