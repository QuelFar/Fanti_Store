import { Body, Controller, Delete, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/infrastructure/jwt.guard';
import { ApiBody, ApiConsumes, ApiCreatedResponse, ApiDefaultResponse, ApiOperation, ApiParam, ApiProperty } from '@nestjs/swagger';
import { CriarAgenteUseCase } from '../application/use-cases/criar-agente.usecase';
import { CriarAgenteDto } from '../application/dtos/criar-agente.dto';
import { CriarAgentePapelDto } from '../application/dtos/papel/criar-agente-papel.dto';
import { CriarAgentePapelUseCase } from '../application/use-cases/papel/criar-papel.usecase';
import { ExcluirAgentePapelDto } from '../application/dtos/papel/excluir-agente-papel.dto';
import { ExcluirAgentePapelUseCase } from '../application/use-cases/papel/excluir-papel.usecase';

@UseGuards(JwtAuthGuard)
@Controller('agentes')
export class AgentesController 
{
    constructor(
        private readonly criarAgente: CriarAgenteUseCase,
        private readonly criarAgentePapel: CriarAgentePapelUseCase,
        private readonly excluirAgentePapel: ExcluirAgentePapelUseCase
    ){}

    // #region Criar agente
    @ApiOperation(
    {
        summary: "Registra um novo agente no sistema.",
        description: `
Este endpoint realiza o cadastro de um novo agente.

Os dados informados serão validados antes da criação do agente.
Caso todas as validações sejam atendidas, o agente será persistido na base de dados.

Regras aplicáveis:
- O e-mail deve ser único no sistema;
- Os campos obrigatórios devem ser informados;

Casos em que o agente não será concluído;
- E-mail já cadastrado;
- Dados inválidos ou incompletos.`
    })
    @ApiConsumes("application/json")
    @ApiBody(
    {
        type: CriarAgenteDto,
        description: "Campos necessários para a requisição"
    })
    @ApiCreatedResponse(
    {
        description: "Agente criado com sucesso."
    })
    @Post()
    async create(@Body() dto: CriarAgenteDto)
    {
        return this.criarAgente.execute(dto)
    }
    // #endregion

    // #region Criar Papel
    @ApiOperation(
    {
        summary: "Registra um novo papel para o agente no sistema.",
        description: `
Este endpoint realiza o cadastro de um novo papel para o agente.

Os dados informados serão validados antes da criação do papel do agente.
Caso todas as validações sejam atendidas, o papel do agente será persistido na base de dados.

Regras aplicáveis:
- Os campos obrigatórios devem ser informados;

Casos em que o agente não será concluído;
- Já existir o mesmo papel informado para o agente.
- O papel para o agente não existir na validação.
- Dados inválidos ou incompletos.`
    })
    @ApiConsumes("application/json")
    @ApiBody(
    {
        type: CriarAgentePapelDto,
        description: "Campos necessários para a requisição"
    })
    @ApiCreatedResponse(
    {
        description: "Papel de agente criado com sucesso."
    })
    @Post("/papel")
    async createPapel(@Body() dto: CriarAgentePapelDto)
    {
        return this.criarAgentePapel.execute(dto)
    }
    //#endregion

    // #region Excluir Papel
    @ApiOperation({
        summary: "Remove um papel associado a um agente.",
        description: `
Este endpoint remove um papel previamente associado a um agente.

A exclusão é realizada utilizando os parâmetros informados na URL.

Regras aplicáveis:
- O agente informado deve existir no sistema;
- O papel informado deve estar previamente associado ao agente.

Casos em que a exclusão não será concluída:
- O agente não existir;
- O papel informado não estiver associado ao agente;
- Parâmetros inválidos ou inconsistentes.

Após a exclusão, o agente deixará de possuir o papel informado no sistema.
`
    })
    @ApiParam({
        name: "agenteId",
        type: Number,
        description: "Identificador único do agente."
    })
    @ApiParam({
        name: "papel",
        type: String,
        description: "Nome do papel associado ao agente que será removido."
    })
    @ApiDefaultResponse({
        description: "Papel de agente excluído com sucesso."
    })
    @Delete("/papel/:agenteId/:papel")
    async excluirPapel(
        @Param() dto: ExcluirAgentePapelDto
    )
    {
        return this.excluirAgentePapel.execute(dto)
    }
    // #endregion
}
