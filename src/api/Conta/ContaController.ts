import bcrypt from "bcrypt";
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

        let senhaInput = conta.senha; //batata123
        senhaInput = bcrypt.hash(senhaInput, 8);
        conta.senha = senhaInput;

        if (await contaServices.criarConta(conta)) {
            res.status(201).send();
        } else {
            res.status(400).send();
        }
    }

    loginConta = async (req: Request, res: Response): Promise<void> => {
        const { email, senha } = req.body;
        const conta = { email, senha };

        const token = contaServices.loginConta(conta);

        if (token) {
            res.status(200).send(token);
        } else {
            res.status(401).send();
        }
    }
}