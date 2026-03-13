import { Entity, Column, OneToOne, JoinColumn, PrimaryColumn } from 'typeorm'
import { AgenteOrmEntity } from './agente.orm-entity'

export enum SexoPF
{
    Masculino = 'Masculino',
    Feminino = 'Feminino',
    Outros = 'Outros',
}

@Entity({ name: 'TB_AGENTES_PF' })
export class AgentePfOrmEntity
{
    @PrimaryColumn({ name: 'AGN_IN_ID', type: 'int' })
    agenteId!: number

    @OneToOne(() => AgenteOrmEntity, (agente) => agente.pf, { onDelete: 'NO ACTION' })
    @JoinColumn({ name: 'AGN_IN_ID', referencedColumnName: 'id' })
    agente!: AgenteOrmEntity

    @Column({ name: 'AGN_PF_ST_NOME', type: 'varchar' })
    nome!: string

    @Column({ name: 'AGN_PF_ST_APELIDO', type: 'varchar', nullable: true })
    apelido!: string | null

    @Column({ name: 'AGN_PF_DT_NASCIMENTO', type: 'date' })
    nascimento!: string

    @Column({ name: 'AGN_PF_EN_SEXO', type: 'enum', enum: SexoPF })
    sexo!: SexoPF
}
