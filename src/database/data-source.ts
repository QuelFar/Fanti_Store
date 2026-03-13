import 'dotenv/config'
import { DataSource } from 'typeorm'
import { UserOrmEntity } from '../modules/users/infrastructure/orm/user.orm-entity'
import { AgenteOrmEntity } from '../modules/agentes/infrastructure/orm/agente.orm-entity'
import { AgentePfOrmEntity } from '../modules/agentes/infrastructure/orm/agente-pf.orm-entity'
import { AgentePjOrmEntity } from '../modules/agentes/infrastructure/orm/agente-pj.orm-entity'
import { AgentePapelOrmEntity } from '../modules/agentes/infrastructure/orm/agente-papel.orm-entity'

export const AppDataSource = new DataSource(
{
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT ?? 3306),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [
        UserOrmEntity,
        AgenteOrmEntity,
        AgentePfOrmEntity,
        AgentePjOrmEntity,
        AgentePapelOrmEntity
    ],
    migrations: ['src/migration/*.ts'],
})