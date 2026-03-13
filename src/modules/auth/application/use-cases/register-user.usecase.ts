import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { UserOrmEntity, UserEnumRole, UserEnumStatus } from '../../../users/infrastructure/orm/user.orm-entity'

type Input = 
{
    name: string
    email: string
    password: string
    role?: UserEnumRole
}

@Injectable()
export class RegisterUserUseCase 
{
    constructor(
        @InjectRepository(UserOrmEntity)
        private readonly usersRepo: Repository<UserOrmEntity>,
    ) {}

    async execute(input: Input) 
    {
        const email = input.email.trim().toLowerCase()

        const exists = await this.usersRepo.findOne({ where: { email } })
        if ((exists && !exists.deletedAt) || (exists?.status == UserEnumStatus.Ativo)) 
        {
            throw new BadRequestException('E-mail já cadastrado')
        }

        const now = new Date()
        const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS ?? 12)
        const passwordHash = await bcrypt.hash(input.password, saltRounds)

        const role = UserEnumRole.Usuario
        
        const user = this.usersRepo.create(
        {
            name: input.name.trim(),
            email,
            passwordHash,
            status: UserEnumStatus.Ativo,
            role,
            lastLoginAt: null,
            createdAt: now,
            updatedAt: now,
            deletedAt: null,
        })

        const saved = await this.usersRepo.save(user)

        return {
            id: saved.id,
            name: saved.name,
            email: saved.email,
            status: saved.status,
            role: saved.role,
            createdAt: saved.createdAt,
        }
    }
}
