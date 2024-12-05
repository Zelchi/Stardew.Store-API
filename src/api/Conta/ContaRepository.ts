import { Repository } from "typeorm";
import { ContaEntity } from "./ContaEntity";
import { Conta } from "./ContaModel";

export class ContaRepository {
    private database: Repository<ContaEntity>;

    constructor(repository: Repository<ContaEntity>) {
        this.database = repository;
    }

    gerarConta = (conta: Conta) => {
        const contaEntity = new ContaEntity();

        contaEntity.nome = conta.nome;
        contaEntity.email = conta.email;
        contaEntity.senha = conta.senha;
        contaEntity.saldo = 0;
        contaEntity.inventario = [];

        contaEntity.dataCriacao = new Date();

        return contaEntity;
    }

    criarConta = async (conta: Conta): Promise<boolean> => {
        try {
            const contaEntity = this.gerarConta(conta);
            await this.database.save(contaEntity);
            return true;
        } catch (error) {
            throw error;
        }
    }

    buscarUsuario = async (conta: Conta): Promise<ContaEntity | null> => {
        try {
            const usuario = await this.database.findOneBy({ email: conta.email });
            return usuario;
        } catch (error) {
            throw error;
        }
    }
}