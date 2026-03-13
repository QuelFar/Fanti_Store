import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, MinLength } from 'class-validator'

export class LoginDto 
{
  @ApiProperty({ example: "user@example.com" })
  @IsEmail()
  email!: string

  @ApiProperty({ example: "Senha@123" })
  @ApiProperty({ description: "Senha mínima de 8 caracteres" })
  @MinLength(8, { message: "Senha mínima de 8 caracteres"})
  password!: string
}