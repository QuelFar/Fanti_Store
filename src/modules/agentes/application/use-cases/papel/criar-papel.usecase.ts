import { BadRequestException, ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AgentePapelOrmEntity } from "src/modules/agentes/infrastructure/orm/agente-papel.orm-entity";
import { QueryFailedError, Repository } from "typeorm";
import { CriarAgentePapelDto } from "../../dtos/papel/criar-agente-papel.dto";
import { AgenteOrmEntity } from "src/modules/agentes/infrastructure/orm/agente.orm-entity";

@Injectable()
export class CriarAgentePapelUseCase
{
    constructor(
        @InjectRepository(AgentePapelOrmEntity)
        private readonly agentePapelRepo: Repository<AgentePapelOrmEntity>,
        @InjectRepository(AgenteOrmEntity)
        private readonly agenteRepo: Repository<AgenteOrmEntity>
    ) {}

    async execute(input: CriarAgentePapelDto)
    {
        const {agenteId , papel} = input
        const now = new Date()

        const agente = await this.agenteRepo.findOne({ where: { id: agenteId }})

        if(!agente)
        {
            throw new BadRequestException("Agente não encontrado.")
        }

        try
        {
            await this.agentePapelRepo.insert(
            {
                agenteId,
                papel,
                createdAt: now
            })

            return {
                message: "Papel de agente criado com sucesso",
                detail: `O papel de ${papel} foi cadastrado para o agente ${agente?.nomeExibicao}`
            }
        }
        catch (error: any)
        {
            if (error instanceof QueryFailedError)
            {
                const driverError: any = error.driverError

                if (driverError?.code === "ER_DUP_ENTRY" || driverError?.errno === 1062)
                {
                    throw new ConflictException(
                        `O agente ${agente.nomeExibicao} já possui o papel ${papel}`
                    )
                }
            }

            throw error
        }
    }
}