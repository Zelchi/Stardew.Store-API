import { Repository } from "typeorm";
import { MensagemEntity } from "./MensagemEntity";
import { Mensagem } from "./MensagemModel";

export class MensagemRepository {
    private database: Repository<MensagemEntity>;

    constructor(repository: Repository<MensagemEntity>) {
        this.database = repository;
    }

    criarRegistroMensagem = (mensagem: Mensagem) => {
        const mensagemEntity = new MensagemEntity();

        mensagemEntity.nomeUsuario = mensagem.nomeUsuario ? mensagem.nomeUsuario : 'Anônimo';
        mensagemEntity.sala = mensagem.sala;
        mensagemEntity.conteudo = mensagem.conteudo;
        mensagemEntity.dataCriacao = new Date();

        return mensagemEntity;
    }

    buscarMenssagens = async (sala: number): Promise<Mensagem[]> => {
        try {
            const mensagens = this.database.findBy({ sala: sala });
            return mensagens;
        } catch (error) {
            throw error;
        }
    }

    registraMensagem = async (mensagem: Mensagem): Promise<boolean> => {
        try {
            const mensagemEntity = this.criarRegistroMensagem(mensagem);
            await this.database.save(mensagemEntity);
            return true;
        } catch (error) {
            throw error;
        }
    }

    deletaMensagem = async (idSala: number, idMsg: number): Promise<boolean> => {
        try {
            await this.database.delete({ sala: idSala, id: idMsg });
            return true;
        } catch (error) {
            throw error;
        }
    }
}