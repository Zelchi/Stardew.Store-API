import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from "typeorm";
import { ProdutoEntity } from "../Produtos/ProdutoEntity";
import { MensagemEntity } from "../Chat/MensagemEntity";

@Entity()

export class ContaEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    nome?: string;
    @Column()
    email?: string;
    @Column()
    senha?: string;
    @Column({ nullable: true }) 
    imagem?: string;
    @Column()
    saldo?: number;
    @Column()
    dataCriacao?: Date;

    @OneToMany(() => ProdutoEntity, (produto) => produto.dono)
    produtos!: ProdutoEntity[];
    @OneToMany(() => MensagemEntity, (mensagem) => mensagem.conteudo)
    mensagens!: MensagemEntity[];
}