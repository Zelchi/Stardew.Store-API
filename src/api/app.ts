import "reflect-metadata";
import express from "express";
import cors from "cors";
import { AppDataSource } from "../database/config/dataSource";

const app = express(); app.use(express.json());

app.use(cors({
    origin: ['https://zelchi.github.io/stardew-shop/', 'http://localhost:5173/'],
    optionsSuccessStatus: 200
}));

import ContaRouter from "./Conta/ContaRouter";
app.use("/conta", ContaRouter);

import MensagemRouter from "./Chat/MensagemRouter";
app.use("/chat", MensagemRouter);

import ProdutoRouter from "./Produtos/ProdutoRouter";
app.use("/produtos", ProdutoRouter);

AppDataSource.initialize().then(() => {
    console.log("Conectado ao banco de dados")
}).catch((error) => {
    console.log("Erro ao conectar ao banco de dados", error)
});

export default app;