import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator'

export class CriarAgentePjDto 
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
    razaoSocial!: string

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    nomeFantasia!: string

    @IsNotEmpty()
    @IsString()
    @MaxLength(32)
    cnpj!: string
}
