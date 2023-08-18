import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(
  //   AppModule,
  //   {
  //     transport: Transport.GRPC,
  //     options: {
  //       package: 'app',
  //       protoPath: join(process.cwd(), 'src/post/app.proto'),
  //       url: '0.0.0.0:5002', //configService.get('GRPC_CONNECT_URL'),
  //     },
  //   },
  // );
  // // await app.listenAsync(); // Start the microservice
  // app.useGlobalPipes(new ValidationPipe());
  // console.log('Post is listening');
  // await app.listen();
  
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
