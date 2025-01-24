import express from "express";
import { ContaController } from "./ContaController";

const router = express.Router();

const contaController = new ContaController();

router.post("/criar", (req, res) => contaController.criarConta(req, res));
router.post("/login", (req, res) => contaController.loginConta(req, res));

router.use((req, res, next) => {contaController.Autenticacao(req, res, next)});
router.get("/info", (req, res) => contaController.infoConta(req, res));

export default router;