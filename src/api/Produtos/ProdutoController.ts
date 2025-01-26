import { Request, Response } from 'express';
import { ProdutoServices } from './ProdutoService';
import { ProdutoRepository } from './ProdutoRepository';
import { AppDataSource } from '../../database/config/dataSource';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const produtoRepository = new ProdutoRepository(AppDataSource.getRepository("ProdutoEntity"), AppDataSource.getRepository("ContaEntity"));
const produtoServices = new ProdutoServices(produtoRepository);

export class ProdutoController {

    Autenticacao = (req: Request, res: Response, next: any): void => {
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

    pegarUserAutorizado = async (req: Request, res: Response): Promise<object> => {
        const pegaToken = req.headers.authorization;
        const token = pegaToken?.split(" ")[1];

        return jwt.decode(token as string) as { userId: number, userNome: string };
    }

    mostraProdutos = async (req: Request, res: Response): Promise<void> => {
        const criador:any = await this.pegarUserAutorizado(req, res);
        const { userId } = criador;
        const { nome } = req.body;
        const nomeProduto = String(nome);

        const produtos = await produtoServices.visualizarProdutos(nomeProduto, userId);

        if (produtos) {
            res.status(200).send(produtos);
        } else {
            res.status(404).send("Produto não encontrado");
        }
    }

    criaProduto = async (req: Request, res: Response): Promise<void> => {
        const criador:any = await this.pegarUserAutorizado(req, res);
        const { userId } = criador;
        const { nome, valor, quantidade } = req.body;

        if (nome === undefined || valor === undefined || quantidade === undefined) {
            res.status(400).send("Dados não informados");
            return;
        }

        if (await produtoServices.criarProduto(userId, nome, valor, quantidade)) {
            res.status(201).send();
        } else {
            res.status(400).send();
        }
    }

    atualizarProduto = async (req: Request, res: Response): Promise<void> => {
        const criador:any = await this.pegarUserAutorizado(req, res);
        const { userId } = criador;
        const { id, nome, valor, quantidade } = req.body;

        if (id !== undefined) {
            const produtoAtualizado = await produtoServices.atualizarProduto(userId, id, nome, valor, quantidade);
            res.status(200).send(produtoAtualizado);
        } else {
            res.status(400).send("Produto não encontrado");
        }
    }

    deletarProduto = async (req: Request, res: Response): Promise<void> => {
        let { id } = req.params;
        const idProduto = Number(id);

        if (idProduto === undefined || isNaN(idProduto) || idProduto <= 0) {
            res.status(400).send("Produto não encontrado");
        } else {
            const produtoDeletado = await produtoServices.deletarProduto(idProduto);
            res.status(200).send(produtoDeletado);
        }
    }
}