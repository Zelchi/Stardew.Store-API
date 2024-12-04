import { Produto } from './ProdutoModel';
import { ProdutoRepository } from './ProdutoRepository';
import { ProdutoEntity} from './ProdutoEntity';

export class ProdutoServices {
    private database: ProdutoRepository
    constructor(repository: ProdutoRepository) {
        this.database = repository; 
    };

    async visualizarProdutos(): Promise<ProdutoEntity[] | any> {
        const listaProdutos = await this.database.visualizarProdutos();
        return listaProdutos;
    }

    async visualizarProdutoPorId(id: number): Promise<ProdutoEntity | any> {
        const produto = await this.database.visualizarProdutoPorId(id);
        return produto;
    }

    async criarProduto(produto: Produto): Promise<void> {
        this.database.criarProduto(produto);
    }

    async atualizarProduto(id: number, produto: Produto): Promise<ProdutoEntity | any> {
        const novoProduto: any = {};

        if (produto.nome !== undefined && produto.nome !== null) {
            novoProduto.nome = produto.nome;
        }

        if (produto.valor !== undefined && produto.valor !== null) {
            novoProduto.valor = produto.valor;
        }

        if (produto.quantidade !== undefined && produto.quantidade !== null) {
            novoProduto.quantidade = produto.quantidade;
        }

        const produtoAtualizado = await this.database.atualizarProduto(id, novoProduto);
        return produtoAtualizado;
    }

    async deletarProduto(id: number): Promise<ProdutoEntity | any> {
       const produtoDeletado = await this.database.deletarProduto(id);
       return produtoDeletado;
    }
}