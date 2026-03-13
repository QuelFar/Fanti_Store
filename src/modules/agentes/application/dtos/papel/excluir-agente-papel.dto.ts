import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { PapelAgenteEnum } from "src/modules/agentes/infrastructure/orm/agente-papel.orm-entity";

export class ExcluirAgentePapelDto
{
    @ApiProperty({ example: "123" })
    @Type(() => Number)
    @IsNotEmpty({ message: "O campo id de agente não pode ser nulo." })
    @IsNumber({}, { message: "O campo id de agente deve ser do tipo número." })
    agenteId!: number

    @ApiProperty({ example: "Cliente" })
    @IsEnum(PapelAgenteEnum, { message: "O Campo papel de agente deve ser entre Cliente ou Fornecedor." })
    @IsNotEmpty({message : "O campo papel de agente não pode ser nulo." })
    @IsString({ message: "O campo papel de agente deve ser do tipo texto." })
    papel!: PapelAgenteEnum
}