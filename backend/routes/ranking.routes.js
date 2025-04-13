import express from "express";
import { obterRankingLojas } from "../controllers/rankingController.js";

const router = express.Router();

router.get("/", obterRankingLojas);

export default router;
