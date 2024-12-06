import { PrimaryGeneratedColumn, Column, Entity, OneToMany, ManyToOne, ManyToMany} from "typeorm";
import { ContaEntity } from "../Conta/ContaEntity";

@Entity()

export class MensagemEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    sala!: number;
    @Column()
    nomeUsuario?: string;
    @Column()
    conteudo!: string;
    @Column()
    dataCriacao!: Date;
    @ManyToMany(() => ContaEntity, conta => conta.id)
    conta!: ContaEntity[];
}