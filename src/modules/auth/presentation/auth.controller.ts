import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { RegisterDto } from '../application/dtos/register.dto'
import { LoginDto } from '../application/dtos/login.dto'
import { RegisterUserUseCase } from '../application/use-cases/register-user.usecase'
import { LoginUserUseCase } from '../application/use-cases/login-user.usecase'
import { JwtAuthGuard } from '../infrastructure/jwt.guard'
import { ApiBody, ApiConsumes, ApiCreatedResponse, ApiOperation, ApiResponse } from '@nestjs/swagger'

@Controller('auth')
export class AuthController
{
    constructor(
        private readonly registerUser: RegisterUserUseCase,
        private readonly loginUser: LoginUserUseCase,
    ) {}

    // #region register - Registrar usuário.
    @ApiOperation(
    {
        summary: 'Registra um novo usuário no sistema.',
        description: `
Esta operação realiza o cadastro de um novo usuário.

Os dados informados serão validados antes da criação do registro. 
Caso todas as validações sejam atendidas, o usuário será persistido na base de dados e suas informações serão retornadas na resposta.

Regras aplicáveis:
- O e-mail deve ser único no sistema;
- Os campos obrigatórios devem ser informados;
- O usuário será criado com status inicial definido pela regra de negócio (ex.: "Ativo").

Casos em que o registro não será concluído:
- E-mail já cadastrado;
- Dados inválidos ou incompletos.
`
    })
    @ApiConsumes('application/json')
    @ApiBody(
    {
        type: RegisterDto,
        description: 'Campos necessários para a requisição'
    })
    @ApiCreatedResponse(
    {
        description: 'Usuário criado com sucesso.'
    })
    @Post('register')
    async register(@Body() dto: RegisterDto) 
    {
        return this.registerUser.execute(dto)
    }
    // #endregion

    // #region login - Realizar o login
    @ApiOperation({
    summary: 'Autentica um usuário e retorna um access token.',
    description: `
Esta operação valida as credenciais de um usuário previamente registrado.

Se as credenciais forem válidas e o usuário estiver com status **"Ativo"**, a API retornará um **access token (JWT)** que deverá ser utilizado para autenticação nas demais rotas protegidas.

Casos em que a autenticação não será concedida:
- Usuário inexistente;
- Credenciais inválidas;
- Usuário com status diferente de "Ativo".
`
    })
    @ApiConsumes('application/json')
    @ApiBody({
        type: LoginDto,
        description: 'Campos necessários para a requisição'
    })
    @ApiResponse({
        status: 200,
        description: 'Resposta de sucesso'
    })
    @Post('login')
    async login(@Body() dto: LoginDto) 
    {
        return this.loginUser.execute(dto.email, dto.password)
    }
    // #endregion

    // #region me - Visualizar informações do usuário autenticado.
    @UseGuards(JwtAuthGuard)
    @Get('me')
    me(@Req() req: any) 
    {
        return req.user
    }
    // #endregion
}
