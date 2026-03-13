import { BadRequestException, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { CriarAgenteDto } from "../dtos/criar-agente.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { AgenteOrmEntity } from "../../infrastructure/orm/agente.orm-entity";

@Injectable()
export class CriarAgenteUseCase
{
    constructor(
        @InjectRepository(AgenteOrmEntity)
        private readonly agentesRepo: Repository<AgenteOrmEntity>
    ){}

    async execute(input: CriarAgenteDto)
    {
        const email = input.email.trim().toLocaleLowerCase()
        const nomeExibicao = input.nomeExibicao.trim()
        const now = new Date()

        try
        {
            const exists = await this.agentesRepo.findOne({ where: { email } })
            if((exists && !exists.deletedAt) || (exists?.ativo == true))
            {
                throw new BadRequestException("Já existe um agente cadastrado com esse e-mail")
            }
            
            const agente = this.agentesRepo.create(
            {
                email,
                nomeExibicao,
                ativo: true,
                createdAt: now,
                updatedAt: now,
                deletedAt: null
            })

            const save = await this.agentesRepo.save(agente)

            return {
                message: "Agente criado com sucesso",
                detail: `O Agente ${save.nomeExibicao} foi cadastrado com sucesso.`
            }
        }
        catch(error: any)
        {
            throw new BadRequestException(
            {
                message: "Erro ao criar agente",
                detail: error.message
            })
        }
    }
    
}