import express from "express";
import "reflect-metadata";
import { AppDataSource } from "../database/config/dataSource";

const app = express(); app.use(express.json());

import ProdutoRouter from "./Produtos/ProdutoRouter";
app.use("/produtos", ProdutoRouter);

AppDataSource.initialize().then(() => {
    console.log("Conectado ao banco de dados")
}).catch((error) => {
    console.log("Erro ao conectar ao banco de dados", error)
});

export default app;