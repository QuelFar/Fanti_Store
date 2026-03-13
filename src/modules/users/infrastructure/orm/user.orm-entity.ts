import { Entity, PrimaryGeneratedColumn, Column, Index, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm'

export enum UserEnumStatus
{
    Ativo = 'Ativo',
    Bloqueado = 'Bloqueado',
    Inativo = 'Inativo',
}

export enum UserEnumRole
{
    Administrador = 'Administrador',
    Usuario = 'Usuario',
}

@Entity({ name: 'TB_USUARIOS' })
export class UserOrmEntity
{
    @PrimaryGeneratedColumn({ name: 'USER_IN_ID' })
    id!: number

    @Column({ name: 'USER_ST_NOME', type: 'varchar' })
    name!: string

    @Column({ name: 'USER_ST_EMAIL', type: 'varchar' })
    email!: string

    @Column({ name: 'USER_ST_PASSWORD', type: 'varchar' })
    passwordHash!: string

    @Column({ name: 'USER_EN_STATUS', type: 'enum', enum: UserEnumStatus })
    status!: UserEnumStatus

    @Column({ name: 'USER_EN_ROLE', type: 'enum', enum: UserEnumRole })
    role!: UserEnumRole

    @Column({ name: 'USER_DT_ULTIMO_LOGIN', type: 'datetime', nullable: true })
    lastLoginAt!: Date | null

    @CreateDateColumn({ name: "USER_ST_CRIADO", type: "datetime" })
    createdAt!: Date

    @UpdateDateColumn({ name: 'USER_DT_ALTERADO', type: 'datetime' })
    updatedAt!: Date

    @DeleteDateColumn({ name: 'USER_DT_EXCLUIDO', type: 'datetime', nullable: true })
    deletedAt!: Date | null
}
