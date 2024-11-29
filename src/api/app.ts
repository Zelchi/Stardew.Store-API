import express from "express";
import ProdutoRouter from "./routes/ProdutoRouter";

const app = express();
app.use(express.json());

app.use("/produtos", ProdutoRouter);

export default app;