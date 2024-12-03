import express from "express";
import ProdutoController from "./ProdutoController";

const router = express.Router();

router.get("/info", new ProdutoController().mostraProdutos);
router.get("/:id", new ProdutoController().mostraProdutoPorId);
router.post("/criar", new ProdutoController().criaProduto);
router.put("/atualizar/:id", new ProdutoController().atualizaProduto);
router.delete("/deletar/:id", new ProdutoController().deletaProduto);

export default router;