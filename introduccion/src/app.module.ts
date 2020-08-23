import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {HttpJuegoModule} from "./http/http-juego.module";
import { UsuarioModule } from './usuario/usuario.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario/usuario.entity";


@Module({
  imports: [
      //AQUI OTROS MODULOS
    HttpJuegoModule,
    UsuarioModule,
    TypeOrmModule
        .forRoot({
          name: 'default', // nombre conexión
          type: 'mysql', // mysql postgres
          host: 'localhost', // ip
          port: 32769, // puerto
          username: 'israel', // usuario
          password: '12345678', // password
          database: 'ejemplo', //  Base de Datos
          entities: [  // TODAS LAS ENTIDADES
        //    UsuarioEntity
          ],
          synchronize: false, // Actualiza el esquema de la base de datos
          dropSchema: false, // Eliminar Datos y el Esquema de base de datos
        }),


  ],
  controllers: [AppController],
  providers: [AppService ],
})
export class AppModule {}
