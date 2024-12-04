import express from "express";
import { ProdutoController } from "./ProdutoController";

const router = express.Router();

const produtoController = new ProdutoController();

router.get("/info", (req, res) => produtoController.mostraProdutos(req, res));
router.get("/:id", (req, res) => produtoController.mostraProdutoPorId(req, res));
router.post("/criar", (req, res) => produtoController.criaProduto(req, res));
router.put("/atualizar/:id", (req, res) => produtoController.atualizarProduto(req, res));
router.delete("/deletar/:id", (req, res) => produtoController.deletarProduto(req, res));

export default router;