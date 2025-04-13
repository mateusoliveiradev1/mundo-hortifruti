// routes/fotos.routes.js
import express from "express";
import {
  enviarFoto,
  buscarFotos,
  deletarFoto,
} from "../controllers/fotosController.js";
import { verificarToken } from "../middlewares/verificarToken.js";

const router = express.Router();

router.post("/enviar", verificarToken, enviarFoto);
router.get("/", buscarFotos);
router.delete("/:id", verificarToken, deletarFoto);

export default router;
