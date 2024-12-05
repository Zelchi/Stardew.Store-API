import express from "express";
import "reflect-metadata";
import { AppDataSource } from "../database/config/dataSource";
// import jwt from "jsonwebtoken";

const app = express(); app.use(express.json());

import ContaRouter from "./Conta/ContaRouter";
app.use("/conta", ContaRouter);

// import ChatRouter from "./Chat/ChatRouter";
// app.use("/chat/:sala", ChatRouter);

// app.get("teste", (req, res) => {
//     const token = req.headers.authorization;

//     if (token) {
//         const resultado = jwt.decode(token);

//         const email = resultado?.email;
//     }

//     jwt.verify(token, chaveSecreta);

//     res.send("Teste");
// });

import ProdutoRouter from "./Produtos/ProdutoRouter";
app.use("/produtos", ProdutoRouter);

AppDataSource.initialize().then(() => {
    console.log("Conectado ao banco de dados")
}).catch((error) => {
    console.log("Erro ao conectar ao banco de dados", error)
});

export default app;