import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTableTbAgentesPj1771981201629 implements MigrationInterface {

    public async up(q: QueryRunner): Promise<void>
    {
        await q.createTable(new Table(
        {
            name: "TB_AGENTES_PJ",
            columns: [
                {
                    name: "AGN_IN_ID",
                    type: "integer",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "AGN_PJ_ST_RAZAO_SOCIAL",
                    type: "varchar"
                },
                {
                    name: "AGN_PJ_ST_NOME_FANTASIA",
                    type: "varchar"
                },
                {
                    name: "AGN_PJ_ST_CNPJ",
                    type: "varchar"
                },
            ]
        }))

        await q.createForeignKey(
            "TB_AGENTES_PJ",
            new TableForeignKey(
            {
                name: "FK_TB_AGENTES_PJ_AGENTE",
                columnNames: ["AGN_IN_ID"],
                referencedTableName: "TB_AGENTES",
                referencedColumnNames: ["AGN_IN_ID"]
            })
        )
    }

    public async down(q: QueryRunner): Promise<void>
    {
        await q.dropForeignKey("TB_AGENTES_PJ", "FK_TB_AGENTES_PJ_AGENTE")
        await q.dropTable("TB_AGENTES_PJ")
    }

}
