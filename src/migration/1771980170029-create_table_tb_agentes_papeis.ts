import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTableTbAgentesPapeis1771980170029 implements MigrationInterface {

    public async up(q: QueryRunner): Promise<void> 
    {
        await q.createTable(new Table(
        {
            name: "TB_AGENTES_PAPEIS",
            columns: [
                {
                    name: "AGN_IN_ID",
                    type: "integer",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "PAP_EN_PAPEL",
                    isPrimary: true,
                    type: "enum",
                    enum: ["Cliente", "Fornecedor"]
                },
                {
                    name: "PAP_DT_CRIADO",
                    type: "datetime",
                    default: "CURRENT_TIMESTAMP"
                },
            ]
        }))

        await q.createForeignKey(
            "TB_AGENTES_PAPEIS",
            new TableForeignKey(
            {
                name: "FK_TB_AGENTES_PAPEIS_AGENTE",
                columnNames: ["AGN_IN_ID"],
                referencedTableName: "TB_AGENTES",
                referencedColumnNames: ["AGN_IN_ID"]
            })
        )
    }

    public async down(q: QueryRunner): Promise<void>
    {
        await q.dropForeignKey("TB_AGENTES_PAPEIS", "FK_TB_AGENTES_PAPEIS")
        await q.dropTable("TB_AGENTES_PAPEIS")
    }

}
