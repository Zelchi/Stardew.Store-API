import { ProdutoRepository } from './ProdutoRepository';
import { ProdutoEntity } from './ProdutoEntity';

export class ProdutoServices {
    private database: ProdutoRepository
    constructor(repository: ProdutoRepository) {
        this.database = repository; 
    };

    async visualizarProdutos(nome:string, userId:number): Promise<ProdutoEntity[] | null> {
        return await this.database.visualizarProdutos(nome, userId);
    }

    async criarProduto(nome:string, valor:number, quantidade:number): Promise<ProdutoEntity> {
        return this.database.criarProduto(nome, valor, quantidade);
    }

    async atualizarProduto(userId:number, id:number, nome:string, valor:number, quantidade:number): Promise<ProdutoEntity | null> {
        return await this.database.atualizarProduto(userId, id, nome, valor, quantidade);
    }

    async deletarProduto(id: number): Promise<ProdutoEntity | null> {
       const produtoDeletado = await this.database.deletarProduto(id);
       return produtoDeletado;
    }
}