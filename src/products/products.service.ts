import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from '../common/entities/product.entity';

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
      .leftJoinAndSelect('product.materialRel', 'materialRel')
      .orderBy('categoria.nombre', 'ASC')
      .addOrderBy('materialRel.orden', 'ASC')
      .getMany();
  }

  async findById(id: number): Promise<ProductEntity | null> {
    return await this.productRepository.findOne({
      where: { id },
      relations: ['categoria', 'materialRel'],
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
      .leftJoinAndSelect('product.materialRel', 'materialRel')
      .where('product.categoriaId = :categoriaId', { categoriaId })
      .orderBy('materialRel.orden', 'ASC')
      .getMany();
  }

  async findByMaterial(materialId: number): Promise<ProductEntity[]> {
    return await this.productRepository.find({
      where: { materialId },
      relations: ['categoria', 'materialRel'],
    });
  }

  async findByPriceRange(min: number, max: number): Promise<ProductEntity[]> {
    return await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.categoria', 'categoria')
      .leftJoinAndSelect('product.materialRel', 'materialRel')
      .where('product.price BETWEEN :min AND :max', { min, max })
      .addOrderBy('materialRel.orden', 'ASC')
      .getMany();
  }
}
