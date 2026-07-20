import { Module } from '@nestjs/common';
import { ProductService } from './products.service';
import { ProductController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '../common/entities/product.entity';
import { CategoriaEntity } from '../common/entities/categoria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, CategoriaEntity])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductsModule {}
