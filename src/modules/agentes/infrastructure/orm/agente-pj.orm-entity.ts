import { Entity, Column, OneToOne, JoinColumn, PrimaryColumn, Index } from 'typeorm'
import { AgenteOrmEntity } from './agente.orm-entity'

@Entity({ name: 'TB_AGENTES_PJ' })
export class AgentePjOrmEntity 
{
    @PrimaryColumn({ name: 'AGN_IN_ID', type: 'int' })
    agenteId!: number

    @OneToOne(() => AgenteOrmEntity, (agente) => agente.pj, { onDelete: 'NO ACTION' })
    @JoinColumn({ name: 'AGN_IN_ID', referencedColumnName: 'id' })
    agente!: AgenteOrmEntity

    @Column({ name: 'AGN_PJ_ST_RAZAO_SOCIAL', type: 'varchar' })
    razaoSocial!: string

    @Column({ name: 'AGN_PJ_ST_NOME_FANTASIA', type: 'varchar' })
    nomeFantasia!: string

    @Index({ unique: true })
    @Column({ name: 'AGN_PJ_ST_CNPJ', type: 'varchar' })
    cnpj!: string
}
