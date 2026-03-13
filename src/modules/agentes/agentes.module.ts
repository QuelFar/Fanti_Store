import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgentesController } from './presentation/agentes.controller';
import { AgenteOrmEntity } from './infrastructure/orm/agente.orm-entity';
import { AgentePfOrmEntity } from './infrastructure/orm/agente-pf.orm-entity';
import { AgentePjOrmEntity } from './infrastructure/orm/agente-pj.orm-entity';
import { AgentePapelOrmEntity } from './infrastructure/orm/agente-papel.orm-entity';
import { CriarAgentePjUseCase } from './application/use-cases/pessoa-juridica/criar-agente-pj.usecase';
import { CriarAgenteUseCase } from './application/use-cases/criar-agente.usecase';
import { CriarAgentePfUseCase } from './application/use-cases/pessoa-fisica/criar-agente-pf.usecase';
import { CriarAgentePapelUseCase } from './application/use-cases/papel/criar-papel.usecase';
import { ExcluirAgentePapelUseCase } from './application/use-cases/papel/excluir-papel.usecase';

@Module(
{
    imports: 
    [
        TypeOrmModule.forFeature(
        [
            AgenteOrmEntity,
            AgentePfOrmEntity,
            AgentePjOrmEntity,
            AgentePapelOrmEntity,
        ]),
    ],
    controllers: [AgentesController],
    providers: [
        // Agente
        CriarAgenteUseCase, 
        
        // Papel
        CriarAgentePapelUseCase,
        ExcluirAgentePapelUseCase,
        
        // Agente PF
        CriarAgentePfUseCase, 
        
        // Agente PJ
        CriarAgentePjUseCase, 
    ],
})
export class AgentesModule {}
