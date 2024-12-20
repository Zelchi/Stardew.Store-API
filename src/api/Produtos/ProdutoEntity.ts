import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ContaEntity } from "../Conta/ContaEntity";

@Entity()

export class ProdutoEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    nome: string;
    @Column()
    valor: number;
    @Column()
    quantidade: number;
    @Column({ nullable: true }) 
    imagem: string;
    @Column()
    dataCriacao: Date;
    @ManyToOne(() => ContaEntity, (conta) => conta.id)
    @JoinColumn({ name: "criador" })
    criador!: ContaEntity;

    constructor(
        nome: string,
        valor: number,
        quantidade: number,
    ) {
        this.nome = nome;
        this.valor = valor;
        this.quantidade = quantidade;
        this.imagem = "";
        this.dataCriacao = new Date();
    }
}