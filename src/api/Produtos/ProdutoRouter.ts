import express from "express";
import { ProdutoController } from "./ProdutoController";

const router = express.Router();

const produtoController = new ProdutoController();

router.use((req, res, next) => {produtoController.Autenticacao(req, res, next)});
router.get("/info", (req, res) => produtoController.mostraProdutos(req, res));
router.post("/criar", (req, res) => produtoController.criaProduto(req, res));
router.put("/atualizar/:id", (req, res) => produtoController.atualizarProduto(req, res));
router.delete("/deletar/:id", (req, res) => produtoController.deletarProduto(req, res));

export default router;