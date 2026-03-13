import { BadRequestException, Injectable } from '@nestjs/common'
import { AgenteOrmEntity } from 'src/modules/agentes/infrastructure/orm/agente.orm-entity'
import { DataSource } from 'typeorm'
import { CriarAgentePfDto } from '../../dtos/pessoa-fisica/criar-agente-pf.dto'
import { AgentePfOrmEntity } from 'src/modules/agentes/infrastructure/orm/agente-pf.orm-entity'
import { AgentePapelOrmEntity, PapelAgenteEnum } from 'src/modules/agentes/infrastructure/orm/agente-papel.orm-entity'

@Injectable()
export class CriarAgentePfUseCase 
{
    constructor(private readonly dataSource: DataSource) {}

    async execute(input: CriarAgentePfDto, userId: number) 
    {
        const email = input.email.trim().toLowerCase()
        const now = new Date()

        const runner = this.dataSource.createQueryRunner()
        await runner.connect()
        await runner.startTransaction()

        try 
        {
            const existing = await runner.manager.findOne(AgenteOrmEntity, { where: { email } })
            if (existing && !existing.deletedAt) 
            {
                throw new BadRequestException('E-mail do agente já cadastrado')
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

            const pf = runner.manager.create(AgentePfOrmEntity, 
            {
                agenteId: savedAgente.id,
                nome: input.nome.trim(),
                apelido: input.apelido?.trim() ?? null,
                nascimento: input.nascimento,
                sexo: input.sexo,
            })
            await runner.manager.save(AgentePfOrmEntity, pf)

            const papel = runner.manager.create(AgentePapelOrmEntity, 
            {
                agenteId: savedAgente.id,
                papel: PapelAgenteEnum.Cliente,
                createdAt: now,
            })
            await runner.manager.save(AgentePapelOrmEntity, papel)

            await runner.commitTransaction()

            return {
                id: savedAgente.id,
                email: savedAgente.email,
                nomeExibicao: savedAgente.nomeExibicao,
                perfil: 'PF',
                papelInicial: PapelAgenteEnum.Cliente,
            }
        } 
        catch (e) 
        {
            await runner.rollbackTransaction()
            throw e
        } 
        finally 
        {
            await runner.release()
        }
    }
}
