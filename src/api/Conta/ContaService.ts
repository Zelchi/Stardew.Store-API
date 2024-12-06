import { Conta } from './ContaModel';
import { ContaRepository } from './ContaRepository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class ContaServices {
    private database: ContaRepository
    constructor(repository: ContaRepository) {
        this.database = repository;
    };

    async criarConta(conta: Conta): Promise<boolean> {

        const contaExiste = await this.database.buscarUsuario(conta);
        if (contaExiste) {
            return false;
        }

        const senhaUsuario = conta.senha;
        const senhaCriptografada = await bcrypt.hash(senhaUsuario, 8);
        conta.senha = senhaCriptografada;

        if (await this.database.criarConta(conta)) {
            return true;
        } else {
            return false;
        }
    }

    async loginConta(conta: Conta): Promise<string | null> {

        const usuario = await this.database.buscarUsuario(conta);
        if (!usuario || !usuario.senha) {
            return null;
        }

        const resultado = await bcrypt.compare(conta.senha, usuario.senha)

        if (resultado) {
            const chave = "BATATA";
            return jwt.sign({ email: usuario?.email }, chave, { expiresIn: "1h" });
        } else {
            return null;
        }
    }
}