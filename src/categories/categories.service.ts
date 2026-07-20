import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriaEntity } from '../common/entities/categoria.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoriaEntity)
    private readonly categoriaRepository: Repository<CategoriaEntity>,
  ) {}

  async create(dto: CreateCategoryDto): Promise<CategoriaEntity> {
    const categoria = this.categoriaRepository.create(dto);
    return await this.categoriaRepository.save(categoria);
  }

  async findAll(): Promise<CategoriaEntity[]> {
    return await this.categoriaRepository.find({ order: { nombre: 'ASC' } });
  }

  async findActive(): Promise<CategoriaEntity[]> {
    return await this.categoriaRepository.find({
      where: { activo: true },
      order: { nombre: 'ASC' },
    });
  }

  async findById(id: number): Promise<CategoriaEntity | null> {
    return await this.categoriaRepository.findOne({ where: { id } });
  }

  async update(id: number, dto: UpdateCategoryDto): Promise<CategoriaEntity> {
    const categoria = await this.findById(id);
    if (!categoria) {
      throw new NotFoundException('Categoría no encontrada');
    }
    await this.categoriaRepository.update(id, dto);
    return (await this.findById(id))!;
  }

  async remove(id: number): Promise<void> {
    const categoria = await this.findById(id);
    if (!categoria) {
      throw new NotFoundException('Categoría no encontrada');
    }
    await this.categoriaRepository.delete(id);
  }
}
