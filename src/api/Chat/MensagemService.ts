import { MensagemRepository } from './MensagemRepository';
import { MensagemEntity } from './MensagemEntity';

export class MensagemServices {
    private database: MensagemRepository
    constructor(repository: MensagemRepository) {
        this.database = repository;
    };

    async visualizarMensagens(id: number): Promise<MensagemEntity[]> {
        const mensagens = await this.database.buscarMenssagens(id);
        return mensagens;
    }

    async enviarMensagem(sala: number, nome: string, conteudo: string): Promise<boolean> {
        if (await this.database.registraMensagem(sala, nome, conteudo)) {
            return true;
        } else {
            return false;
        }
    }

    async deletarMensagem(idSala: number, idMsg: number): Promise<boolean> {
        if (await this.database.deletaMensagem(idSala, idMsg)) {
            return true;
        } else {
            return false;
        }
    }
}