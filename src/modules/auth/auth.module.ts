import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { UserOrmEntity } from '../users/infrastructure/orm/user.orm-entity'
import { JwtStrategy } from './infrastructure/jwt.strategy'
import { RegisterUserUseCase } from './application/use-cases/register-user.usecase'
import { LoginUserUseCase } from './application/use-cases/login-user.usecase'
import { AuthController } from './presentation/auth.controller'

@Module(
{
    imports: 
    [
        ConfigModule,
        TypeOrmModule.forFeature([UserOrmEntity]),
        JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => (
        {
            secret: config.get<string>('JWT_SECRET'),
            signOptions: { expiresIn: '24h' },
        }),
        }),
    ],
    controllers: [AuthController],
    providers: [JwtStrategy, RegisterUserUseCase, LoginUserUseCase],
})
export class AuthModule {}
