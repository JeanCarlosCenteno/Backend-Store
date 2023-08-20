import { Product } from './../entities/product.entity';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dto/product.dto';


@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepo: Repository<Product>,
    ) {}

    async create(createProductDto: CreateProductDto) {
        const product = this.productRepo.create(createProductDto);
        await this.productRepo.save(product)

        return product;
    }
    //Encontrar un registro
    //findOne(id:number) {
        //return this.productRepo.findOneBy({ id });
    //}

    //Encontrar un registro con relaciones
    findOne(id: number){
        return this.productRepo.findOne({
            where: { id },
            relations: {
                autor: true
            },
        });

    }
    //Mostrar todos los registros
    findAll(){
        return this.productRepo.find({
            order: { id: 'ASC' },
        });
    }

    //Eliminar un registro 
    async remove(id: number){
        const product = await this.findOne(id);
        await this.productRepo.remove(product);
        return 'Producto eliminado con exito!';
    }

    //Actualizar un producto
    async update(id: number, cambios: CreateProductDto){
        const oldProduct = await this.findOne(id);
        const updateProduct = await this.productRepo.merge(oldProduct, cambios);
        return this.productRepo.save(updateProduct);
    }
}