import { DataSource } from "typeorm";
import ProdutoEntity from "../../api/Produtos/ProdutoEntity";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "src/database/db.sqlite",
    entities: [ProdutoEntity],
    synchronize: true,
});