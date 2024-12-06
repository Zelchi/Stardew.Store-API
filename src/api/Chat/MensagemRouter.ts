import express from "express";
import { MensagemController } from "./MensagemController";

const router = express.Router();

const mensagemController = new MensagemController();

router.use((req, res, next) => {mensagemController.Autenticacao(req, res, next)});

router.get("/mensagens/:sala", (req, res) => mensagemController.visualizarMensagens(req, res));
router.post("/enviar/:sala", (req, res) => mensagemController.enviarMensagem(req, res));
router.delete("/deletar/:sala/:id", (req, res) => mensagemController.deletarMensagem(req, res));

export default router;