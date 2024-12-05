import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { ProdutoEntity } from "../Produtos/ProdutoEntity";

@Entity()

export class ContaEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    nome!: string;
    @Column()
    email!: string;
    @Column()
    senha!: string;
    @Column()
    saldo!: number;
    @OneToMany(() => ProdutoEntity, produto => produto)
    inventario!: ProdutoEntity[];
    @Column()
    dataCriacao!: Date;
}