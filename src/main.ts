import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {JwtAuthGuard} from "./auth/jwt-auth-guard";
import {ValidationPipe} from "./pipes/validation.pipe";


async function start() {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('Lesson from ulbi tv')
        .setDescription('Documentation Rest api')
        .setVersion('1.0.0')
        .addTag('ULBI TV')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api', app, document);
    // app.useGlobalGuards([JwtAuthGuard.]);
    // app.useGlobalPipes(new ValidationPipe());
    await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));

}

start();
