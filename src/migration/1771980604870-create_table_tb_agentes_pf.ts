import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTableTbAgentesPf1771980604870 implements MigrationInterface {

    public async up(q: QueryRunner): Promise<void>
    {
        await q.createTable(new Table(
        {
            name: "TB_AGENTES_PF",
            columns: [
                {
                    name: "AGN_IN_ID",
                    type: "integer",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "AGN_PF_ST_NOME",
                    type: "varchar"
                },
                {
                    name: "AGN_PF_ST_APELIDO",
                    type: "varchar",
                    isNullable: true
                },
                {
                    name: "AGN_PF_DT_NASCIMENTO",
                    type: "date"
                },
                {
                    name: "AGN_PF_EN_SEXO",
                    type: "enum",
                    enum: ["Masculino", "Feminino", "Outros"]
                }
            ]
        }))

        await q.createForeignKey(
            "TB_AGENTES_PF",
            new TableForeignKey(
            {
                name: "FK_TB_AGENTES_PF_AGENTE",
                columnNames: ["AGN_IN_ID"],
                referencedTableName: "TB_AGENTES",
                referencedColumnNames: ["AGN_IN_ID"]
            })
        )
    }

    public async down(q: QueryRunner): Promise<void>
    {
        await q.dropForeignKey("TB_AGENTES_PF", "FK_TB_AGENTES_PF_AGENTE")
        await q.dropTable("TB_AGENTES_PF")
    }
}
