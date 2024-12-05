import { Request, Response } from "express";
import { MensagemServices } from "./MensagemService";
import { MensagemRepository } from "./MensagemRepository";
import { AppDataSource } from "../../database/config/dataSource";
import { ValidacaoMensagem } from "./MensagemModel";

const chatRepository = new MensagemRepository(AppDataSource.getRepository("ChatEntity"));
const chatServices = new MensagemServices(chatRepository);

export class ChatController {

    visualizarMensagens = async (req: Request, res: Response): Promise<void> => {
        const sala = Number(req.params.sala);

        if (sala === undefined || sala === null || isNaN(sala)) {
            res.status(400).send("Sala não encontrada");
        } else {
            const mensagens = await chatServices.visualizarMensagens(sala);
            res.status(200).send(mensagens);
        }
    }

    enviarMensagem = async (req: Request, res: Response): Promise<void> => {
        const sala = Number(req.params.sala);
        const conteudo = req.body.conteudo;
        const nome = req.body.nome;
        const msgUsuario = { nome, sala, conteudo };

        if (msgUsuario.conteudo === undefined) {
            res.status(400).send("Mensagem não informada");
        }
        if (msgUsuario.sala === undefined || msgUsuario.sala === null || isNaN(msgUsuario.sala)) {
            res.status(400).send("Sala não encontrada");
        }

        if (ValidacaoMensagem.isValid(msgUsuario)) {
            await chatServices.enviarMensagem(msgUsuario)
            res.status(201).send("Mensagem enviada com sucesso");
        } else {
            res.status(400).send("Erro ao enviar mensagem");
        }
    }

    deletarMensagem = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.body;
        if (id === undefined) {
            res.status(400).send("Id da mensagem não informado");
        }

        if (await chatServices.deletarMensagem(id)) {
            res.status(200).send("Mensagem deletada com sucesso");
        } else {
            res.status(400).send("Erro ao deletar mensagem");
        }
    }

}