import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CriarAgenteDto
{
    @ApiProperty({ example: "user@example.com" })
    @IsNotEmpty({message: "O campo de nome de exibição não pode ser nulo." })
    @IsString({ message: "O campo de nome de exibição deve ser do tipo texto." })
    @MaxLength(255, { message: "O Campo de nome de exibição deve ter no máximo 255 caracteres." })
    nomeExibicao!: string

    @ApiProperty({ example: "João da Silva"})
    @IsNotEmpty({ message: "O Campo de e-mail não pode ser nulo." })
    @IsString({ message: "O Campo de e-mail deve ser do tipo texto." })
    @IsEmail({}, { message: "O Campo de e-mail deve ser do tipo e-mail." })
    @MaxLength(255, { message: "O Campo de e-mail deve ter no máximo 255 caracteres." })
    email!: string
}