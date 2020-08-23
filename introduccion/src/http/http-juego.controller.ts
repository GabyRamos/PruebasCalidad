import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Header,
    HttpCode,
    Param,
    Post,
    Query,
    Req,
    Res,
    Headers
} from "@nestjs/common";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {MascotaCreateDto} from "./dto/mascota.create-dto";
import {validate, ValidationError} from "class-validator";
// http://localhost:3001/juegos-http
//juego-http --> segmento de red
//tenemos definido la IP, el puerto y el la parte del url --falta el metodo
//@Controller("juego-http")
@Controller("juegos-http")
export class HttpJuegoController {

//falta el metodo

    @Get("hola2")
    @HttpCode(201)
    holaGet(){
        throw new BadRequestException("No envia nada")
        return "Hola Get! :D";
    }

    @Post("hola")
    @HttpCode(202)
    holaPost(){
        return "Hola POST! :D";
    }

    @Delete("hola")
    @HttpCode(204)
   @Header("cache-control","none")
    @Header("EPN","Probando las cosas")
    holaDelete(){
        return "Hola DELETE! :D";
    }

    // http://localhost:3001/juegos-http/parametros-ruta/10/gestion/15
@Get("/parametros-ruta/:edad/gestion/:altura")
ParametrosRutaEjemplo(
    //@Param() --> decorador que hace la magia
    @Param() parametrosRuta

){
console.log("Parametros", parametrosRuta);
//validar si es un numero
    isNaN(parametrosRuta.edad) // 'ABC' true
    isNaN(parametrosRuta.altura) //  1234 false
    // throw new BadRequestException('No son numeros')
    const edad = Number(parametrosRuta.edad);
    const altura = Number(parametrosRuta.altura);
    return edad + altura;
}

    @Get('parametros-consulta')
    parametrosConsulta(
        @Query() parametrosDeConsulta //lo que quiero recibir @Query es 
    ) {
        console.log(parametrosDeConsulta.a);
        console.log(parametrosDeConsulta.b);
        const tieneNombreYApellido = parametrosDeConsulta.a != undefined && parametrosDeConsulta.b != undefined;
        console.log('parametrosDeConsulta', parametrosDeConsulta);
        if (tieneNombreYApellido) {
            return parametrosDeConsulta.a + ' ' + parametrosDeConsulta.b;
        } else {
            return '= )';
        }
    }

    @Post('parametros-cuerpo')
    @HttpCode(200)
    async parametrosCuerpo(
        @Body() parametrosDeCuerpo
    ) {
        // Promesas
        const mascotaValida = new MascotaCreateDto();
        mascotaValida.casada = parametrosDeCuerpo.casada;
        mascotaValida.edad = parametrosDeCuerpo.edad;
        mascotaValida.ligada = parametrosDeCuerpo.ligada;
        mascotaValida.nombre = parametrosDeCuerpo.nombre;
        mascotaValida.peso = parametrosDeCuerpo.peso;
        try {
            const errores: ValidationError[] = await validate(mascotaValida);
            if (errores.length > 0) {
                console.error('Errores: ', errores);
                throw new BadRequestException('Error validando');
            } else {
                const mensajeCorrecto = {
                    mensaje: 'Se creo correctamente'
                };
                return mensajeCorrecto;
            }
        } catch (e) {
            console.error('Error', e);
            throw new BadRequestException('Error validando');
        }
    }
    @Get('guardarCookieInsegura')
    guardarCookieInsegura(
        @Query() parametrosConsulta,
        @Req() req, //  request - PETICION
        @Res() res // response - RESPUESTA
    ) {
        res.cookie(
            'galletaInsegura', // nombre
            'Tengo hambre', // valor
        );
        const mensaje = {
            mensaje: 'ok'
        };
        // return mensaje; // NO SE PUEDE USAR RETURN CUANDO SE USA @Res() OJO !!!
        res.send(mensaje); // METODO EXPRESSJS
    }

    @Get('guardarCookieSegura')
    guardarCookieSegura(
        @Query() parametrosConsulta,
        @Req() req, //  request - PETICION
        @Res() res // response - RESPUESTA
    ) {
        res.cookie(
            'galletaSegura', // nombre
            'Web :3', // valor
            {
                secure: true
            }
        );
        const mensaje = {
            mensaje: 'ok'
        };
        // return mensaje; // NO SE PUEDE USAR RETURN CUANDO SE USA @Res() OJO !!!
        res.send(mensaje); // METODO EXPRESSJS
    }

    @Get('mostrarCookies')
    mostrarCookies(
        @Req() req
    ) {
        const mensaje = {
            sinFirmar: req.cookies,
            firmadas: req.signedCookies
        };
        return mensaje;
    }

    @Get('guardarCookieFirmada')
    public guardarCookieFirmada(
        @Res() res,
        @Headers() headers // peticion - request
    ) {
        // ENCRIPCION DE LA POLIBURGUER CON EL ALGORITMO Q YO QUIERO
        console.log('Headers', headers);

        res.header('Cabecera','Dinamica'); // respuesta - response

        res.cookie('firmada', 'poliburguer', {signed: true});
        res.cookie('firmada1', 'poliburguer1', {signed: true});
        res.cookie('firmada2', 'poliburguer2', {signed: true});
        res.cookie('firmada3', 'poliburguer3', {signed: true});
        res.cookie('firmada4', 'poliburguer4', {signed: true});




        const mensaje = {
            mensaje: 'ok'
        };
        res.send(mensaje);
    }

    // 1 Guardar Cookie Insegura
    // 2 Guardar Cookie Segura
    // 3 Mostrar Cookies



}