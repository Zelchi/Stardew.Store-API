import { Repository } from "typeorm";
import { MensagemEntity } from "./MensagemEntity";

export class MensagemRepository {
    private database: Repository<MensagemEntity>;

    constructor(repository: Repository<MensagemEntity>) {
        this.database = repository;
    }

    buscarMenssagens = async (sala: number): Promise<MensagemEntity[]> => {
        try {
            const mensagens = this.database.findBy({ sala: sala });
            return mensagens;
        } catch (error) {
            throw error;
        }
    }

    registraMensagem = async (sala:number,nome:string,conteudo:string): Promise<boolean> => {
        try {
            const mensagemEntity = new MensagemEntity(sala, nome, conteudo);
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