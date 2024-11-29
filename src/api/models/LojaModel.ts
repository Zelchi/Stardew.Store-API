import { Produto } from './ProdutoModel';

export interface Loja {
    id?: number;
    nome: string;
    produtos: Produto[];
}