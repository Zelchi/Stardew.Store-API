import { Request, Response, NextFunction } from "express";
import { MensagemServices } from "./MensagemService";
import { MensagemRepository } from "./MensagemRepository";
import { AppDataSource } from "../../database/config/dataSource";
import { ValidacaoMensagem } from "./MensagemModel";
import jwt from "jsonwebtoken";

const mensagemRepository = new MensagemRepository(AppDataSource.getRepository("MensagemEntity"));
const mensagemServices = new MensagemServices(mensagemRepository);

export class MensagemController {

    Autenticacao = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const pegaToken = req.headers.authorization;
        const token = pegaToken?.split(" ")[1];

        if (!token) {
            res.status(401).send("Token não informado ou mal formatado");
            return;
        }

        jwt.verify(token, "BATATA", (err) => {
            if (err) {
                console.log("Token inválido");
                res.status(401).send("Token inválido");
                return;
            } else {
                console.log("Token válido");
                next();
            }
        });
    }

    visualizarMensagens = async (req: Request, res: Response): Promise<void> => {
        const sala = Number(req.params.sala);

        if (sala === undefined || sala === null || isNaN(sala)) {
            res.status(400).send("Sala não encontrada");
        } else {
            const mensagens = await mensagemServices.visualizarMensagens(sala);
            res.status(200).send(mensagens);
        }
    }

    enviarMensagem = async (req: Request, res: Response): Promise<void> => {
        const sala = Number(req.params.sala);
        
        const conteudo = req.body.conteudo;
        
        const nomeUsuario = req.body.nome;
        
        const msgUsuario = { nomeUsuario, sala, conteudo };

        if (msgUsuario.conteudo === undefined) {
            res.status(400).send("Mensagem não informada");
        }
        if (msgUsuario.sala === undefined || msgUsuario.sala === null || isNaN(msgUsuario.sala)) {
            res.status(400).send("Sala não encontrada");
        }

        if (ValidacaoMensagem.isValid(msgUsuario)) {
            await mensagemServices.enviarMensagem(msgUsuario)
            res.status(201).send("Mensagem enviada com sucesso");
        } else {
            res.status(400).send("Erro ao enviar mensagem");
        }
    }

    deletarMensagem = async (req: Request, res: Response): Promise<void> => {
        const idSala = Number(req.params.sala);
        const idMsg = Number(req.params.id);

        if (idMsg === undefined || idSala === undefined) {
            res.status(400).send("Id da mensagem não informado");
        }

        if (await mensagemServices.deletarMensagem(idSala, idMsg)) {
            res.status(200).send("Mensagem deletada com sucesso");
        } else {
            res.status(400).send("Erro ao deletar mensagem");
        }
    }

}