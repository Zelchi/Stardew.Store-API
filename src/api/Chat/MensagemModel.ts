export interface Mensagem {
    id?: number;
    sala: number;
    nomeUsuario?: string;
    conteudo: string;
    dataCriacao?: Date;
}

export class ValidacaoMensagem {
    static isValid(mensagem: Mensagem): boolean {
        if (!mensagem.nomeUsuario || !mensagem.sala || !mensagem.conteudo) {
            return false;
        }
        return true;
    }
}