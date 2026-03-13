import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { UserOrmEntity, UserEnumStatus } from '../../../users/infrastructure/orm/user.orm-entity'

@Injectable()
export class LoginUserUseCase 
{
    constructor(
        @InjectRepository(UserOrmEntity)
        private readonly usersRepo: Repository<UserOrmEntity>,
        private readonly jwt: JwtService,
    ) {}

    async execute(emailRaw: string, password: string) 
    {
        const email = emailRaw.trim().toLowerCase()

        const user = await this.usersRepo.findOne({ where: { email } })

        if (!user || user.deletedAt) 
        {
            throw new UnauthorizedException('Credenciais inválidas')
        }

        if (user.status !== UserEnumStatus.Ativo)
        {
            throw new ForbiddenException('Usuário não encontrasse ativo, favor entrar em contato com o administrador do sistema.')
        }

        const ok = await bcrypt.compare(password, user.passwordHash)
        if (!ok) throw new UnauthorizedException('Credenciais inválidas')

        user.lastLoginAt = new Date()
        await this.usersRepo.save(user)

        const payload = { 
            sub: user.id, 
            name: user.name,
            email: user.email, 
            role: user.role
        }
        const accessToken = await this.jwt.signAsync(payload)

        return { accessToken }
    }
}
