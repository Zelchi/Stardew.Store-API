import { Repository, Like } from "typeorm";
import { ProdutoEntity } from "./ProdutoEntity";
import { ContaEntity } from "../Conta/ContaEntity";

export class ProdutoRepository {
    private produtoRepository: Repository<ProdutoEntity>;
    private contaRepository: Repository<ContaEntity>;

    constructor(produtoRepository: Repository<ProdutoEntity>, contaRepository: Repository<ContaEntity>) {
        this.produtoRepository = produtoRepository;
        this.contaRepository = contaRepository;
    }

    visualizarProdutos = async (nome: string, userId:number): Promise<ProdutoEntity[]> => {
        let where: any = {};

        if (userId) where.criador = { id: userId };
        if (nome) where.nome = Like(`%${nome}%`);

        return await this.produtoRepository.find({ where });
    }

    criarProduto = async (userId: number, nome:string, valor:number, quantidade:number): Promise<ProdutoEntity> => {
        try {
            const conta = await this.contaRepository.findOne({ where: { id: userId } });
            if (!conta) {
                throw console.log("Conta não encontrada");
            }

            if (valor === null || valor === undefined) {
                throw console.log("O valor do produto não pode ser nulo");
            }

            const produto = new ProdutoEntity(conta, nome, valor, quantidade);
            return await this.produtoRepository.save(produto);
        } catch (error) {
            throw error;
        }
    }

    atualizarProduto = async (userId: number, id: number, nome?: string, valor?: number, quantidade?: number): Promise<ProdutoEntity | null> => {
        try {
            const produtoAtualizado = await this.produtoRepository.findOne({ where: { id, criador: { id: userId } } });

            if (!produtoAtualizado) {
                throw console.log("Produto não encontrado ou você não tem permissão para atualizá-lo");
            }

            if (nome) produtoAtualizado.nome = nome;
            if (valor !== undefined) produtoAtualizado.valor = valor;
            if (quantidade !== undefined) produtoAtualizado.quantidade = quantidade;

            return await this.produtoRepository.save(produtoAtualizado);
        } catch (error) {
            throw error;
        }
    }

    deletarProduto = async (id: number): Promise<ProdutoEntity | null> => {
        try {
            const produto = await this.produtoRepository.findOneBy({ id });
            const produtoDeletado = await this.produtoRepository.delete({ id });
            return produto;
        } catch (error) {
            throw error;
        }
    }
}