import {Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {UsuarioEntity} from './usuario.entity';
import {InjectRepository} from '@nestjs/typeorm';
// 1 Controlador
// 2 Servicio
// 3 Modulo
// 4 Importar servicio contolador en el modulo
// 5 Importar modulo en el modulo principal

@Injectable()
export class UsuarioService {
    constructor( // Inyección de Dependencias
        @InjectRepository(UsuarioEntity)
        private repositorio: Repository<UsuarioEntity>
    ) {
    }
    crearUno(nuevoUsuario:UsuarioEntity){
        return this.repositorio.save(nuevoUsuario)
    }
}