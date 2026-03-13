import { BadRequestException, Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AgenteOrmEntity } from '../../../infrastructure/orm/agente.orm-entity'
import { AgentePjOrmEntity } from '../../../infrastructure/orm/agente-pj.orm-entity'
import { AgentePapelOrmEntity, PapelAgenteEnum } from '../../../infrastructure/orm/agente-papel.orm-entity'
import { CriarAgentePjDto } from '../../dtos/pessoa-juridica/criar-agente-pj.dto'

@Injectable()
export class CriarAgentePjUseCase 
{
    constructor(private readonly dataSource: DataSource) {}

    async execute(input: CriarAgentePjDto, userId: number) 
    {
        const email = input.email.trim().toLowerCase()
        const cnpj = input.cnpj.trim()
        const now = new Date()

        const runner = this.dataSource.createQueryRunner()
        await runner.connect()
        await runner.startTransaction()

        try
        {
            const existingEmail = await runner.manager.findOne(AgenteOrmEntity, { where: { email } })
            if (existingEmail && !existingEmail.deletedAt) 
            {
                throw new BadRequestException('E-mail do agente já cadastrado')
            }

            const existingCnpj = await runner.manager.findOne(AgentePjOrmEntity, { where: { cnpj } })
            if (existingCnpj) 
            {
                throw new BadRequestException('CNPJ já cadastrado')
            }

            const agente = runner.manager.create(AgenteOrmEntity, 
            {
                userId,
                nomeExibicao: input.nomeExibicao.trim(),
                email,
                ativo: true,
                createdAt: now,
                updatedAt: now,
                deletedAt: null,
            })
            const savedAgente = await runner.manager.save(AgenteOrmEntity, agente)

            const pj = runner.manager.create(AgentePjOrmEntity,
            {
                agenteId: savedAgente.id,
                razaoSocial: input.razaoSocial.trim(),
                nomeFantasia: input.nomeFantasia.trim(),
                cnpj,
            })
            await runner.manager.save(AgentePjOrmEntity, pj)

            const papel = runner.manager.create(AgentePapelOrmEntity, 
            {
                agenteId: savedAgente.id,
                papel: PapelAgenteEnum.Fornecedor,
                createdAt: now,
            })
            await runner.manager.save(AgentePapelOrmEntity, papel)

            await runner.commitTransaction()

            return {
                id: savedAgente.id,
                email: savedAgente.email,
                nomeExibicao: savedAgente.nomeExibicao,
                perfil: 'PJ',
                papelInicial: PapelAgenteEnum.Fornecedor,
            }
        } 
        catch (e) 
        {
            await runner.rollbackTransaction()
            throw e
        } finally 
        {
            await runner.release()
        }
    }
}
