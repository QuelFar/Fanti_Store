import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import 'reflect-metadata'

async function bootstrap() 
{
    const app = await NestFactory.create(AppModule)
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))
    
    const config = new DocumentBuilder()
        .setTitle('API')
        .setDescription('Fanti Store - Documentação API')
        .setVersion('1.0')
        .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('swagger', app, document)

    await app.listen(3000)
}

bootstrap()

