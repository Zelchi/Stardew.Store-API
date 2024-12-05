import { PrimaryGeneratedColumn, Column, Entity, OneToMany} from "typeorm";

@Entity()

export class MensagemEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    sala!: number;
    @Column()
    nomeUsuario!: string;
    @Column()
    conteudo!: string;
    @Column()
    dataCriacao!: Date;
}