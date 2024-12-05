import { Request, Response } from "express";
import { ContaServices } from "./ContaService";
import { ContaRepository } from "./ContaRepository";
import { AppDataSource } from "../../database/config/dataSource";

const contaRepository = new ContaRepository(AppDataSource.getRepository("ContaEntity"));
const contaServices = new ContaServices(contaRepository);

export class ContaController {

    criarConta = async (req: Request, res: Response): Promise<void> => {
        const { nome, email, senha } = req.body;
        const conta = { nome, email, senha };

        if (conta.nome === undefined || conta.email === undefined || conta.senha === undefined) {
            res.status(400).send("Dados não informados");
        }

        if (await contaServices.criarConta(conta)) {
            res.status(201).send("Conta criada com sucesso");
        } else {
            res.status(400).send("Erro ao criar conta");
        }
    }

    loginConta = async (req: Request, res: Response): Promise<void> => {
        const { email, senha } = req.body;
        const conta = { nome: "", email, senha };

        if (conta.email === undefined || conta.senha === undefined) {
            res.status(400).send("Email ou senha não informados");
        }

        const token = contaServices.loginConta(conta);

        if (token) {
            res.status(200).send(token);
        } else {
            res.status(401).send();
        }
    }
}