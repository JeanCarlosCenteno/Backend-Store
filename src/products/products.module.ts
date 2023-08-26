import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductsController } from './controllers/products.controller';
import { ProductService } from './services/products.service';
import { ProductImage } from './entities/product-image.entity';
import { CategoryController } from './controllers/category.controller';
import { CategoryService } from './services/category.service';
import { Category } from './entities/category.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductImage, Category])],
  controllers: [ProductsController, CategoryController],
  providers: [ProductService, CategoryService],
})
export class ProductsModule {}
