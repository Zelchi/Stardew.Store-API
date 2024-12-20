import { PrimaryGeneratedColumn, Column, Entity, OneToMany, ManyToOne, ManyToMany, JoinColumn} from "typeorm";
import { ContaEntity } from "../Conta/ContaEntity";

@Entity()

export class MensagemEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    sala: number;
    @Column()
    nomeUsuario: string;
    @Column()
    conteudo: string;
    @Column()
    dataCriacao: Date;
    @ManyToOne(() => ContaEntity, (conta) => conta.id)
    @JoinColumn({ name: "criador" })
    criador!: ContaEntity;

    constructor(
        sala: number,
        nomeUsuario: string,
        conteudo: string,
    ) {
        this.sala = sala;
        this.nomeUsuario = nomeUsuario;
        this.conteudo = conteudo;
        this.dataCriacao = new Date();
    }
}