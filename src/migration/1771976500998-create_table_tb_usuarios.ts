import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableTbUsuarios1771976500998 implements MigrationInterface 
{
    public async up(q: QueryRunner): Promise<void> 
    {
        await q.createTable(new Table({
            name: "TB_USUARIOS",
            columns: [
                {
                    name: "USER_IN_ID", 
                    type: "integer",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                { name: "USER_ST_NOME", type: "varchar"},
                { name: "USER_ST_EMAIL", type: "varchar"},
                { name: "USER_ST_PASSWORD", type: "varchar"},
                {
                    name: "USER_EN_STATUS",
                    type: "enum",
                    enum: ["Ativo", "Bloqueado", "Inativo"],
                },
                {
                    name: "USER_EN_ROLE",
                    type: "enum",
                    enum: ["Administrador", "Usuario"],
                },
                {
                    name: "USER_DT_ULTIMO_LOGIN",
                    type: "datetime",
                    isNullable: true,
                },
                {
                    name: "USER_ST_CRIADO",
                    type: "datetime",
                    default: "CURRENT_TIMESTAMP",
                },
                {
                    name: "USER_DT_ALTERADO",
                    type: "datetime",
                    default: "CURRENT_TIMESTAMP",
                    onUpdate: "CURRENT_TIMESTAMP",
                },
                {
                    name: "USER_DT_EXCLUIDO",
                    type: "datetime",
                    isNullable: true,
                },
            ]
        }), true)
    }

    public async down(q: QueryRunner): Promise<void>
    {
        await q.dropTable("TB_USUARIOS", true)
    }
}
