import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './modules/auth/auth.module'
import { UserOrmEntity } from './modules/users/infrastructure/orm/user.orm-entity'
import { ConfigModule } from '@nestjs/config'
import { AgentesModule } from './modules/agentes/agentes.module'
import { AgenteOrmEntity } from './modules/agentes/infrastructure/orm/agente.orm-entity'
import { AgentePfOrmEntity } from './modules/agentes/infrastructure/orm/agente-pf.orm-entity'
import { AgentePjOrmEntity } from './modules/agentes/infrastructure/orm/agente-pj.orm-entity'
import { AgentePapelOrmEntity } from './modules/agentes/infrastructure/orm/agente-papel.orm-entity'

@Module(
{
    imports: [
        ConfigModule.forRoot(
        {
            isGlobal: true
        }),
        TypeOrmModule.forRoot(
        {
            type: 'mysql',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT ?? 3306),
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            entities: 
            [
                UserOrmEntity,
                AgenteOrmEntity,
                AgentePfOrmEntity,
                AgentePjOrmEntity,
                AgentePapelOrmEntity
            ],
            logging: ['error', 'schema'],

            // migrations
            migrations: [`${__dirname}/migration/{.ts, *.js}`],
            migrationsRun: true,
        }),
        AuthModule,
        AgentesModule
    ]
})
export class AppModule {}
