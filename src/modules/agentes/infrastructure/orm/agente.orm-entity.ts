import { Entity, PrimaryGeneratedColumn, Column, Index, OneToOne, JoinColumn, ManyToOne } from 'typeorm'
import { UserOrmEntity } from '../../../users/infrastructure/orm/user.orm-entity'
import { AgentePfOrmEntity } from './agente-pf.orm-entity'
import { AgentePjOrmEntity } from './agente-pj.orm-entity'

@Entity({ name: 'TB_AGENTES' })
export class AgenteOrmEntity
{
    @PrimaryGeneratedColumn({ name: 'AGN_IN_ID' })
    id!: number

    // vínculo opcional com usuário
    @Column({ name: 'USER_IN_ID', type: 'int', nullable: true })
    userId!: number | null

    @ManyToOne(() => UserOrmEntity, { nullable: true })
    @JoinColumn({ name: 'USER_IN_ID', referencedColumnName: 'id' })
    user?: UserOrmEntity | null

    @Column({ name: 'AGN_ST_NOME_EXIBICAO', type: 'varchar' })
    nomeExibicao!: string

    @Column({ name: 'AGN_ST_EMAIL', type: 'varchar' })
    email!: string

    @Column({ name: 'AGN_BO_ATIVO', type: 'boolean' })
    ativo!: boolean

    @Column({ name: 'AGN_DT_CRIADO', type: 'datetime' })
    createdAt!: Date

    @Column({ name: 'AGN_DT_ALTERADO', type: 'datetime' })
    updatedAt!: Date

    @Column({ name: 'AGN_DT_EXCLUIDO', type: 'datetime', nullable: true })
    deletedAt!: Date | null

    // Perfis 1:1 (opcionais controlados pelo caso de uso)
    @OneToOne(() => AgentePfOrmEntity, (pf) => pf.agente, { cascade: false })
    pf?: AgentePfOrmEntity

    @OneToOne(() => AgentePjOrmEntity, (pj) => pj.agente, { cascade: false })
    pj?: AgentePjOrmEntity
}
