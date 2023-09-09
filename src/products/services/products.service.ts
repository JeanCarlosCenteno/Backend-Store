import { Product } from './../entities/product.entity';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dto/product.dto';
import { ProductImage } from '../entities/product-image.entity';


@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepo: Repository<Product>,

        @InjectRepository(ProductImage)
        private readonly productImageRepo: Repository<ProductImage>,
    ) {}
    /*
    async create(createProductDto: CreateProductDto) {
        const product = this.productRepo.create(createProductDto);
        await this.productRepo.save(product)

        return product;
    }*/

    //Crear un producto y agregar Imagenes //El ... Se refiere a exparcir

    async create(ProductDto: CreateProductDto) {
        const { images = [], ...detailsProducts } = ProductDto;

        const product = await this.productRepo.create({
            ...detailsProducts,
            images: images.map((image) => 
            this.productImageRepo.create({ url: image }),
            ), 
        });

        await this.productRepo.save(product);
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
                autor: true,
                category: true,
                proveedor: true,
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
    /*async update(id: number, cambios: CreateProductDto){
        const oldProduct = await this.findOne(id);
        const updateProduct = await this.productRepo.merge(oldProduct, cambios);
        return this.productRepo.save(updateProduct);
    } 
    */
   //Actualizar un producto con imagenes
   async update(id: number, productDto: CreateProductDto){
    const product = await this.productRepo.preload({
       id: id,
       ...productDto, //Para esparciar todos los datos del ProductDto
       images:[] 
    });

    await this.productRepo.save(product);
    return product;
   }
}