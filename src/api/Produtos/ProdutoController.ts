import { Request, Response } from 'express';
import { ProdutoServices } from './ProdutoService';
import { ValidacaoProduto } from './ProdutoModel';
import { ProdutoRepository } from './ProdutoRepository';
import { AppDataSource } from '../../database/config/dataSource';

const produtoRepository = new ProdutoRepository(AppDataSource.getRepository("ProdutoEntity"));
const produtoServices = new ProdutoServices(produtoRepository);

export class ProdutoController {

    mostraProdutos = async (req: Request, res: Response): Promise<void> => {
        let { nome } = req.query;
        const nomeProduto = String(nome);

        const produtos = await produtoServices.visualizarProdutos(nomeProduto);

        if (produtos) {
            res.status(200).send(produtos);
        } else {
            res.status(404).send("Produto não encontrado");
        }
    }

    criaProduto = async (req: Request, res: Response): Promise<void> => {
        const { nome, valor, quantidade } = req.body;
        const produto = { nome, valor, quantidade };

        if (ValidacaoProduto.isValid(produto)) {
            produtoServices.criarProduto(produto);
            res.status(201).send();
        } else {
            res.status(400).send();
        }
    }

    atualizarProduto = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        const { nome, valor, quantidade } = req.body;
        const idProduto = Number(id);
        const produto = { nome, valor, quantidade };

        if (idProduto !== undefined) {
            const produtoAtualizado = await produtoServices.atualizarProduto(idProduto, produto);
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