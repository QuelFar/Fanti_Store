import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, Unique } from 'typeorm'
import { AgenteOrmEntity } from './agente.orm-entity'

export enum PapelAgenteEnum
{
    Cliente = 'Cliente',
    Fornecedor = 'Fornecedor',
}

@Entity({ name: 'TB_AGENTES_PAPEIS' })
export class AgentePapelOrmEntity 
{
    @PrimaryColumn({ name: 'AGN_IN_ID', type: 'int' })
    agenteId!: number

    @PrimaryColumn({ name: 'PAP_EN_PAPEL', type: 'enum', enum: PapelAgenteEnum })
    papel!: PapelAgenteEnum

    @Column({ name: 'PAP_DT_CRIADO', type: 'datetime' })
    createdAt!: Date

    @ManyToOne(() => AgenteOrmEntity, { onDelete: 'NO ACTION' })
    @JoinColumn({ name: 'AGN_IN_ID', referencedColumnName: 'id' })
    agente!: AgenteOrmEntity
}
