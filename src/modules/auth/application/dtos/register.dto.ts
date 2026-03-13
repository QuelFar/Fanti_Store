import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'

export class RegisterDto
{
    @ApiProperty({ example: "João da Silva" })
    @IsNotEmpty({ message: "Nome obrigatório"})
    name!: string

    @ApiProperty({ example: "user@example.com" })
    @IsEmail({}, {message: "E-mail é obrigatório"})
    email!: string

    @ApiProperty({ example: "Senha@123" })
    @ApiProperty({ description: "Senha deve ter no mínimo 8 caracteres" })
    @MinLength(8, {message: "Senha deve ter no mínimo 8 caracteres"})
    password!: string
}
