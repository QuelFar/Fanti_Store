import { IsDateString, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator'
import { SexoPF } from '../../../infrastructure/orm/agente-pf.orm-entity'

export class CriarAgentePfDto 
{
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    nomeExibicao!: string

    @IsEmail()
    email!: string

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    nome!: string

    @IsOptional()
    @IsString()
    @MaxLength(255)
    apelido?: string

    @IsDateString()
    nascimento!: string // YYYY-MM-DD

    @IsEnum(SexoPF)
    sexo!: SexoPF
}
