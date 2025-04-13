import express from "express";
import { avaliarFoto } from "../controllers/avaliacoesController.js";
import autenticar from "../middlewares/autenticar.js";

const router = express.Router();

// Avaliar uma foto
router.post("/:fotoId", autenticar, avaliarFoto);

export default router;
