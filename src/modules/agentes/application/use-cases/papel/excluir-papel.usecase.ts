import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AgentePapelOrmEntity } from "src/modules/agentes/infrastructure/orm/agente-papel.orm-entity";
import { AgenteOrmEntity } from "src/modules/agentes/infrastructure/orm/agente.orm-entity";
import { Repository } from "typeorm";
import { ExcluirAgentePapelDto } from "../../dtos/papel/excluir-agente-papel.dto";

@Injectable()
export class ExcluirAgentePapelUseCase
{
    constructor(
        @InjectRepository(AgentePapelOrmEntity)
        private readonly agentePapelRepo: Repository<AgentePapelOrmEntity>,
        @InjectRepository(AgenteOrmEntity)
        private readonly agenteRepo: Repository<AgenteOrmEntity>
    ) {}

    async execute(input: ExcluirAgentePapelDto)
    {
        const {agenteId, papel} = input

        const agente = await this.agenteRepo.findOne({ where: { id: agenteId }})
        
        if(!agente)
        {
            throw new BadRequestException("Agente não encontrado.")
        }

        try
        {
            const result = await this.agentePapelRepo.delete({ agenteId, papel })

            if (result.affected === 0)
            {
                throw new BadRequestException(
                    `O agente não possui o papel ${papel}`
                )
            }

            return {
                message: "Papel de agente excluído",
                detail: `O agente ${agente.nomeExibicao} não possui mais o papel de ${papel}`
            }
        }
        catch(error: any)
        {
            throw error
        }
    }
}