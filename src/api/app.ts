import express from "express";

const app = express();
app.use(express.json());

import ProdutoRouter from "./Produtos/ProdutoRouter";
app.use("/produtos", ProdutoRouter);

import ChatRouter from "./Chat/ChatRouter";
app.use("/chat", ChatRouter);

export default app;