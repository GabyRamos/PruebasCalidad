import {Module} from '@nestjs/common';
import {HttpJuegoController} from "./http-juego.controller";

//@ --> decorador : son para poder decir que clase son que cosa
@Module({
        imports: [],
        controllers:[HttpJuegoController],
        providers:[],
    })

export class HttpJuegoModule {

}