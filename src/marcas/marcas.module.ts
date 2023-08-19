import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Marca } from "./entities/marca.entity";
import { MarcasService } from "./services/marcas.service";
import { MarcasController } from './controller/marcas.controller';


@Module({
    imports: [TypeOrmModule.forFeature([Marca])],
    providers: [MarcasService],
    //aqui los servicios
    controllers:[MarcasController],
    //aqui los controladores
    
})
export class MarcasModule{}
