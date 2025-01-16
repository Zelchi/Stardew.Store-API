import { Repository } from "typeorm";
import { MensagemEntity } from "./MensagemEntity";
import { ContaEntity } from "../Conta/ContaEntity";

export class MensagemRepository {
    private mensagemRepository: Repository<MensagemEntity>;
    private contaRepository: Repository<ContaEntity>;

    constructor(mensagemRepository: Repository<MensagemEntity>, contaRepository: Repository<ContaEntity>) {
        this.mensagemRepository = mensagemRepository;
        this.contaRepository = contaRepository;
    }

    buscarMenssagens = async (sala: number): Promise<MensagemEntity[]> => {
        try {
            const mensagens = this.mensagemRepository.findBy({ sala: sala });
            return mensagens;
        } catch (error) {
            throw error;
        }
    }

    registraMensagem = async (userId: number, sala: number, nome: string, conteudo: string): Promise<boolean> => {
        try {
            const conta = await this.contaRepository.findOne({ where: { id: userId } });
            if (!conta) {
                throw console.log("Conta não encontrada");
            }
            const mensagem = new MensagemEntity(conta, sala, nome, conteudo);
            await this.mensagemRepository.save(mensagem);
            return true;
        } catch (error) {
            throw error;
        }
    }

    deletaMensagem = async (idSala: number, idMsg: number): Promise<boolean> => {
        try {
            await this.mensagemRepository.delete({ sala: idSala, id: idMsg });
            return true;
        } catch (error) {
            throw error;
        }
    }
}