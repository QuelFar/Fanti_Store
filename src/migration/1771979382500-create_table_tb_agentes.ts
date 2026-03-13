import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTableTbAgentes1771979382500 implements MigrationInterface {

    public async up(q: QueryRunner): Promise<void> 
    {
        await q.createTable(new Table(
        {
            name: "TB_AGENTES",
            columns: 
            [
                {
                    name: "AGN_IN_ID",
                    type: "integer",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "USER_IN_ID",
                    type: "integer",
                    isNullable: true
                },
                {
                    name: "AGN_ST_NOME_EXIBICAO",
                    type: "varchar",
                },
                {
                    name: "AGN_ST_EMAIL",
                    type: "varchar",
                },
                {
                    name: "AGN_BO_ATIVO",
                    type: "boolean",
                },
                {
                    name: "AGN_DT_CRIADO",
                    type: "datetime",
                    default: "CURRENT_TIMESTAMP"
                },
                {
                    name: "AGN_DT_ALTERADO",
                    type: "datetime",
                    default: "CURRENT_TIMESTAMP",
                    onUpdate: "CURRENT_TIMESTAMP"
                },
                {
                    name: "AGN_DT_EXCLUIDO",
                    type: "datetime",
                    isNullable: true
                },
            ]
        }))

        await q.createForeignKey(
            "TB_AGENTES",
            new TableForeignKey(
            {
                name: "FK_TB_AGENTES_USER",
                columnNames: ["USER_IN_ID"],
                referencedTableName: "TB_USUARIOS",
                referencedColumnNames: ["USER_IN_ID"]
            })
        )
    }

    public async down(q: QueryRunner): Promise<void>
    {
        await q.dropForeignKey("TB_AGENTES", "FK_TB_AGENTES_USER")
        await q.dropTable("TB_AGENTES")
    }

}
