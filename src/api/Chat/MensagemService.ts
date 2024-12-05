import { MensagemRepository } from './MensagemRepository';
import { Mensagem } from './MensagemModel';

export class MensagemServices {
    private database: MensagemRepository
    constructor(repository: MensagemRepository) {
        this.database = repository;
    };

    async visualizarMensagens(id: number): Promise<Mensagem[]> {
        const mensagens = await this.database.buscarMenssagens(id);
        return mensagens;
    }

    async enviarMensagem(mensagem: Mensagem): Promise<boolean> {
        if (await this.database.registraMensagem(mensagem)) {
            return true;
        } else {
            return false;
        }
    }

    async deletarMensagem(id: number): Promise<boolean> {
        if (await this.database.deletaMensagem(id)) {
            return true;
        } else {
            return false;
        }
    }
}