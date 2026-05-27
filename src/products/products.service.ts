import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from '../common/entities/product.entity';
import { ProductCategory } from '../common/enums/product-category.enum';
import { ProductMaterial } from '../common/enums/product-material.enum';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  // Crear producto
  async create(productData: Partial<ProductEntity>): Promise<ProductEntity> {
    const product = this.productRepository.create(productData);
    return await this.productRepository.save(product);
  }

  // Obtener todos los productos
  async findAll(): Promise<ProductEntity[]> {
    return await this.productRepository.find();
  }

  // Obtener producto por ID
  async findById(id: number): Promise<ProductEntity | null> {
    return await this.productRepository.findOne({ where: { id } });
  }

  // Actualizar producto
  async update(id: number, updateData: Partial<ProductEntity>): Promise<ProductEntity | null> {
    await this.productRepository.update(id, updateData);
    return this.findById(id);
  }

  // Eliminar producto
  async delete(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }

  // Filtrar por categoría
  async findByCategory(category: ProductCategory): Promise<ProductEntity[]> {
    return await this.productRepository.find({ where: { category } });
  }

  // Filtrar por material
  async findByMaterial(material: ProductMaterial): Promise<ProductEntity[]> {
    return await this.productRepository.find({ where: { material } });
  }

  // Buscar por rango de precio
  async findByPriceRange(min: number, max: number): Promise<ProductEntity[]> {
    return await this.productRepository
      .createQueryBuilder('product')
      .where('product.price BETWEEN :min AND :max', { min, max })
      .getMany();
  }
}
