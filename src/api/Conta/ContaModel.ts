import { Produto } from "../Produtos/ProdutoModel";

export interface Conta {
    id?: number;
    nome: string;
    email: string;
    senha: string;
    saldo?: number;
    inventario?: Produto[];
}

export class ValidacaoConta {
    static isValid(conta: Conta): boolean {
        if (!conta.nome || !conta.email || !conta.senha) {
            return false;
        }
        return true;
    }
}