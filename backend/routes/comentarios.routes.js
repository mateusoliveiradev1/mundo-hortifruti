import express from "express";
import { comentarFoto } from "../controllers/comentariosController.js";
import autenticar from "../middlewares/autenticar.js";

const router = express.Router();

// Comentar uma foto
router.post("/:fotoId", autenticar, comentarFoto);

export default router;
