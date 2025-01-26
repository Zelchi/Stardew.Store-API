import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ContaServices } from "./ContaService";
import { ContaRepository } from "./ContaRepository";
import { AppDataSource } from "../../database/config/dataSource";
import dotenv from "dotenv";
dotenv.config();

const contaRepository = new ContaRepository(AppDataSource.getRepository("ContaEntity"));
const contaServices = new ContaServices(contaRepository);

export class ContaController {

    Autenticacao = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const pegaToken = req.headers.authorization;
        const token = pegaToken?.split(" ")[1];

        if (!token) {
            res.status(401).send("Token não informado ou mal formatado");
            return;
        }

        jwt.verify(token, process.env.JWT_SECRET!, (err) => {
            if (err) {
                res.status(401).send("Token inválido");
                return;
            } else {
                next();
            }
        });
    }

    criarConta = async (req: Request, res: Response): Promise<void> => {
        const { nome, email, senha } = req.body;

        if (
            nome === undefined ||
            nome.length < 3 ||
            email === undefined ||
            email.length < 3 ||
            senha === undefined ||
            senha.length < 6
        ) {
            res.status(400).send("Dados não informados");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            res.status(401).send("Email inválido");
            return;
        }
        if (await contaServices.criarConta(nome, email, senha)) {
            res.status(200).send("Conta criada com sucesso");
            return;
        } else {
            res.status(409).send("Conta já existe");
            return;
        }
    }

    loginConta = async (req: Request, res: Response): Promise<void> => {
        const { email, senha } = req.body;
        const conta = { nome: "", email, senha };

        if (conta.email === undefined || conta.senha === undefined) {
            res.status(400).send("Email ou senha não informados");
            return;
        }

        const token = await contaServices.loginConta(email, senha);

        if (token) {
            res.status(200).send(token);
            return;
        } else {
            res.status(401).send("Conta não encontrada");
            return;
        }
    }

    infoConta = async (req: Request, res: Response): Promise<void> => {
        const pegaToken = req.headers.authorization;
        const token = pegaToken?.split(" ")[1];

        if (!token) {
            res.status(401).send("Token não informado ou mal formatado");
            return;
        }

        jwt.verify(token, process.env.JWT_SECRET!, async (err, decoded) => {
            if (err) {
                res.status(401).send("Token inválido");
                return;
            } else {
                const { userId } = decoded as { userId: string };
                const usuario = await contaRepository.buscarUsuarioPorId(Number(userId));

                if (usuario) {
                    res.status(200).send(usuario);
                    return;
                } else {
                    res.status(404).send("Usuário não encontrado");
                    return;
                }
            }
        });
    }
}