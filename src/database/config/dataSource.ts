import { DataSource } from "typeorm";
import { ProdutoEntity } from "../../api/Produtos/ProdutoEntity";
import { ContaEntity } from "../../api/Conta/ContaEntity";
import { MensagemEntity } from "../../api/Chat/MensagemEntity";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "src/database/db.sqlite",
    entities: [ProdutoEntity, ContaEntity, MensagemEntity],
    synchronize: true,
});