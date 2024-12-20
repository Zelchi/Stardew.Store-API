import { Like, Repository } from "typeorm";
import { ProdutoEntity } from "./ProdutoEntity";

export class ProdutoRepository {
    private database: Repository<ProdutoEntity>;

    constructor(repository: Repository<ProdutoEntity>) {
        this.database = repository;
    }

    visualizarProdutos = async (nome: string, userId:number): Promise<ProdutoEntity[]> => {
        let where: any = {};

        if (userId) where.criador = { id: userId };
        if (nome) where.nome = Like(`%${nome}%`);

        return await this.database.find({ where });
    }

    criarProduto = async (nome: string, valor: number, quantidade: number): Promise<ProdutoEntity> => {
        try {
            const produto = new ProdutoEntity(nome, valor, quantidade);
            return await this.database.save(produto);
        } catch (error) {
            throw error;
        }
    }

    atualizarProduto = async (userId: number, id: number, nome?: string, valor?: number, quantidade?: number): Promise<ProdutoEntity | null> => {
        try {
            const produtoAtualizado = await this.database.findOne({ where: { id, criador: { id: userId } as ProdutoEntity } });

            if (!produtoAtualizado) {
                return null;
            }

            if (nome) {
                produtoAtualizado.nome = nome;
            }
            if (valor) {
                produtoAtualizado.valor = valor;
            }
            if (quantidade) {
                produtoAtualizado.quantidade = quantidade;
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
            const produtoDeletado = await this.database.delete({ id });
            return produto;
        } catch (error) {
            throw error;
        }
    }
}