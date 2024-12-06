import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ContaEntity } from "../Conta/ContaEntity";

@Entity()

export class ProdutoEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    nome?: string;
    @Column()
    valor?: number;
    @Column()
    quantidade?: number;
    @Column()
    imagem?: string;
    @Column()
    dataCriacao?: Date;
    @ManyToOne(() => ContaEntity, conta => conta.inventario)
    conta?: ContaEntity;
}