import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from '../common/entities/product.entity';
import { ProductMaterial } from '../common/enums/product-material.enum';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async create(productData: Partial<ProductEntity>): Promise<ProductEntity> {
    const product = this.productRepository.create(productData);
    return await this.productRepository.save(product);
  }

  async findAll(): Promise<ProductEntity[]> {
    return await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.categoria', 'categoria')
      .orderBy('categoria.nombre', 'ASC')
      .addOrderBy(
        `CASE product.material
          WHEN 'Plata925' THEN 1
          WHEN 'Oro' THEN 2
          WHEN 'Bañados en Plata' THEN 3
          WHEN 'Acero Blanco' THEN 4
          WHEN 'Acero Dorado' THEN 5
          WHEN 'Acero Quirurgico' THEN 6
          WHEN 'Otro' THEN 7
        END`, 'ASC')
      .getMany();
  }

  async findById(id: number): Promise<ProductEntity | null> {
    return await this.productRepository.findOne({
      where: { id },
      relations: ['categoria'],
    });
  }

  async update(
    id: number,
    updateData: Partial<ProductEntity>,
  ): Promise<ProductEntity | null> {
    await this.productRepository.update(id, updateData);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }

  async findByCategory(categoriaId: number): Promise<ProductEntity[]> {
    return await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.categoria', 'categoria')
      .where('product.categoriaId = :categoriaId', { categoriaId })
      .orderBy(
        `CASE product.material
          WHEN 'Plata925' THEN 1
          WHEN 'Oro' THEN 2
          WHEN 'Bañados en Plata' THEN 3
          WHEN 'Acero Blanco' THEN 4
          WHEN 'Acero Dorado' THEN 5
          WHEN 'Acero Quirurgico' THEN 6
          WHEN 'Otro' THEN 7
        END`, 'ASC')
      .getMany();
  }

  async findByMaterial(material: ProductMaterial): Promise<ProductEntity[]> {
    return await this.productRepository.find({ where: { material }, relations: ['categoria'] });
  }

  async findByPriceRange(min: number, max: number): Promise<ProductEntity[]> {
    return await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.categoria', 'categoria')
      .where('product.price BETWEEN :min AND :max', { min, max })
      .addOrderBy(
        `CASE product.material
          WHEN 'Plata925' THEN 1
          WHEN 'Oro' THEN 2
          WHEN 'Bañados en Plata' THEN 3
          WHEN 'Acero Blanco' THEN 4
          WHEN 'Acero Dorado' THEN 5
          WHEN 'Acero Quirurgico' THEN 6
          WHEN 'Otro' THEN 7
        END`, 'ASC')
      .getMany();
  }
}
