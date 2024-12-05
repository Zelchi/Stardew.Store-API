import express from "express";
import { ChatController } from "./MensagemController";

const router = express.Router();

const chatController = new ChatController();

// Usuario
router.get("/mensagens", (req, res) => chatController.visualizarMensagens(req, res));
router.post("/enviar", (req, res) => chatController.enviarMensagem(req, res));
router.delete("/deletar/:id", (req, res) => chatController.deletarMensagem(req, res));