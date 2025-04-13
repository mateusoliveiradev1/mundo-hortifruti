import express from "express";
import {
  enviarFoto,
  buscarFotos,
  deletarFoto,
} from "../controllers/fotosController.js";
import autenticar from "../middlewares/autenticar.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

// Enviar uma nova foto (com autenticação e upload)
router.post("/", autenticar, upload.single("imagem"), enviarFoto);

// Buscar todas as fotos públicas
router.get("/", buscarFotos);

// Deletar uma foto (apenas dono pode deletar)
router.delete("/:id", autenticar, deletarFoto);

export default router;
