import { ContaRepository } from './ContaRepository';
import { ContaEntity} from './ContaEntity';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class ContaServices {
    private database: ContaRepository
    constructor(repository: ContaRepository) {
        this.database = repository;
    };

    async criarConta(nome:string, email:string, senha:string): Promise<boolean> {

        const contaExiste = await this.database.buscarUsuario(email);
        if (contaExiste) {
            return false;
        }

        const senhaUsuario = senha;
        const senhaCriptografada = await bcrypt.hash(senhaUsuario, 8);
        senha = senhaCriptografada;

        if (await this.database.criarConta(nome, email, senha)) {
            return true;
        } else {
            return false;
        }
    }

    async loginConta(email:string, senha:string): Promise<string | null> {

        const usuario = await this.database.buscarUsuario(email);
        if (!usuario || !usuario.senha) {
            return null;
        }

        const resultado = await bcrypt.compare(senha, usuario.senha)

        if (resultado) {
            return jwt.sign({ userId: usuario.id, userNome: usuario.nome }, "BATATA", { expiresIn: "7d" });
        } else {
            return null;
        }
    }
}