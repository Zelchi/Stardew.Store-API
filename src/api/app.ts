import "reflect-metadata";
import express from "express";
import cors from "cors";
import { AppDataSource } from "../database/config/dataSource";

const app = express();
app.use(express.json());

const allowedOrigins = "https://stardew.store";
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    }
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