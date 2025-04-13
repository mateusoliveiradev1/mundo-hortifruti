import express from "express";
import { obterRanking } from "../controllers/rankingController.js";

const router = express.Router();

// Rota para obter o ranking das lojas
router.get("/", obterRanking);

export default router;
