import { Repository } from "typeorm";
import { ProdutoEntity } from "./ProdutoEntity";
import { Produto } from "./ProdutoModel";

export class ProdutoRepository {
    private database: Repository<ProdutoEntity>;

    constructor(repository: Repository<ProdutoEntity>) {
        this.database = repository;
    }

    gerarProduto = (produto: Produto) => {
        const produtoEntity = new ProdutoEntity();

        produtoEntity.nome = produto.nome;
        produtoEntity.valor = produto.valor;
        produtoEntity.quantidade = produto.quantidade;

        produtoEntity.dataCriacao = new Date();

        return produtoEntity;
    }

    visualizarProdutos = async (): Promise<ProdutoEntity[]> => {
        try {
            const resposta = await this.database.find();
            return resposta;
        } catch (error) {
            throw error;
        }
    }

    visualizarProdutoPorId = async (id: number): Promise<ProdutoEntity | null> => {
        try {
            const produto = await this.database.findOneBy({ id });
            return produto;
        } catch (error) {
            throw error;
        }
    }

    criarProduto = async (produto: Produto): Promise<ProdutoEntity> => {
        try {
            const resposta = this.gerarProduto(produto);
            const respostaSalva = await this.database.save(resposta);
            return respostaSalva;
        } catch (error) {
            throw error;
        }
    }

    atualizarProduto = async (id: number, produto: Produto): Promise<ProdutoEntity | null> => {
        try {
            const produtoAtualizado = await this.database.findOneBy({ id });

            if (!produtoAtualizado) {
                return null;
            }

            if (produto.nome) {
                produtoAtualizado.nome = produto.nome;
            }
            if (produto.valor) {
                produtoAtualizado.valor = produto.valor;
            }
            if (produto.quantidade) {
                produtoAtualizado.quantidade = produto.quantidade;
            }

            const produtoSalvo = await this.database.save(produtoAtualizado);
            return produtoSalvo;
        } catch (error) {
            throw error;
        }
    }


    deletarProduto = async (id: number): Promise<ProdutoEntity | null> => {
        try {
            const produto = await this.database.findOneBy({ id });
            console.log(produto);
            const produtoDeletado = await this.database.delete({ id });
            console.log(produtoDeletado);

            return produto;
        } catch (error) {
            throw error;
        }
    }
}