import fs from 'fs/promises';
import * as path from 'path';
import { Produto } from '../models/ProdutoModel';

const filePath = path.join(__dirname, '../../../produtos.json');

export class ProdutoServices {

    async pegarTodosProdutos(): Promise<Produto[]> {
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data) as Produto[];
    }

    async pegaProdutoPorId(id: number): Promise<Produto | undefined> {
        const produtos = await this.pegarTodosProdutos();
        return produtos.find(produto => produto.id === id);
    }

    async criarProduto(produto: Produto): Promise<void> {
        const produtos = await this.pegarTodosProdutos();

        const lastId = produtos[produtos.length - 1]?.id || 0;
        produto.id = lastId + 1;

        produtos.push(produto);
        await fs.writeFile(filePath, JSON.stringify(produtos, null, 2));
    }

    async atualizarProduto(id: number, produto: Produto): Promise<Produto> {
        const produtos = await this.pegarTodosProdutos();
        const index = produtos.findIndex(produto => produto.id === id);
        if (index === -1) {
            throw new Error('Produto não encontrado');
        }

        const produtoSalvo = produtos[index];
        if (!produtoSalvo) throw new Error('Batata Frita');

        if (produto.nome) {
            produtoSalvo.nome = produto.nome;
        }
        if (produto.valor) {
            produtoSalvo.valor = produto.valor;
        }
        if (produto.quantidade) {
            produtoSalvo.quantidade = produto.quantidade;
        }
        
        await fs.writeFile(filePath, JSON.stringify(produtos, null, 2));

        return produtoSalvo;
    }

    async deletarProduto(id: number): Promise<void> {
        const produtos = await this.pegarTodosProdutos();
        const index = produtos.findIndex(produto => produto.id === id);
        if (index === -1) {
            return;
        }
        produtos.splice(index, 1);
        await fs.writeFile(filePath, JSON.stringify(produtos, null, 2));
    }
}