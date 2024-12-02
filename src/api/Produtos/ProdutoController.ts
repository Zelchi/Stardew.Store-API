import { Request, Response } from 'express';
import { ProdutoServices } from './ProdutoService';
import { ValidacaoProduto } from './ProdutoModel';

export default class ProdutoController {
    async mostraProdutos(req: Request, res: Response): Promise<void> {
        const produtos = await new ProdutoServices().pegarTodosProdutos();
        res.json(produtos);
    }

    async mostraProdutoPorId(req: Request, res: Response): Promise<void> {
        const id = req.params.id ? parseInt(req.params.id) : 0;
        const produto = await new ProdutoServices().pegaProdutoPorId(id);
        if (produto) {
            res.json(produto);
        } else {
            res.status(404).end();
        }
    }

    async criaProduto(req: Request, res: Response): Promise<void> {
        const { nome, valor, quantidade } = req.body;
        const produto = { nome, valor, quantidade };

        if (ValidacaoProduto.isValid(produto)) {
            await new ProdutoServices().criarProduto(produto);
            res.status(201).send();
        } else {
            res.status(400).send();
        }
    }

    async atualizarProduto(req: Request, res: Response): Promise<void> {
        const id = req.params.id ? parseInt(req.params.id) : 0;
        const { nome, valor, quantidade } = req.body;
        const produto = { nome, valor, quantidade };

        try {
            const novoProduto = await new ProdutoServices().atualizarProduto(id, produto);
            res.status(200).send(novoProduto);
        }
        catch (error: any) {
            res.status(400).send(error.message);
        }
    }

    async deletaProduto(req: Request, res: Response): Promise<void> {
        const id = req.params.id ? parseInt(req.params.id) : 0;
        const produto = await new ProdutoServices().pegaProdutoPorId(id);
        await new ProdutoServices().deletarProduto(id);
        res.status(200).send(produto).end();
    }
}