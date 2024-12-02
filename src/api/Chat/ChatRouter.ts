import express from "express";
import ChatController from "./ChatController";

const router = express.Router();

router.get("/ver", new ChatController().mostraMensagens);
router.post("/enviar", new ChatController().enviarMensagem);
router.put("/editar/:id", new ChatController().atualizarMensagem);
router.delete("/deletar/:id", new ChatController().deletarMensagem);

export default router;
