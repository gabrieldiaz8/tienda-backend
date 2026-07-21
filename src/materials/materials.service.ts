import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MaterialEntity } from '../common/entities/material.entity';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';

const INITIAL_MATERIALS = [
  { nombre: 'Plata925', orden: 1 },
  { nombre: 'Oro', orden: 2 },
  { nombre: 'Bañados en Plata', orden: 3 },
  { nombre: 'Acero Blanco', orden: 4 },
  { nombre: 'Acero Dorado', orden: 5 },
  { nombre: 'Acero Quirurgico', orden: 6 },
  { nombre: 'Otro', orden: 7 },
];

@Injectable()
export class MaterialsService implements OnModuleInit {
  constructor(
    @InjectRepository(MaterialEntity)
    private readonly materialRepository: Repository<MaterialEntity>,
  ) {}

  async onModuleInit(): Promise<void> {
    const count = await this.materialRepository.count();
    if (count > 0) return;

    const materials = this.materialRepository.create(INITIAL_MATERIALS);
    await this.materialRepository.save(materials);
  }

  async create(dto: CreateMaterialDto): Promise<MaterialEntity> {
    const material = this.materialRepository.create(dto);
    return await this.materialRepository.save(material);
  }

  async findAll(): Promise<MaterialEntity[]> {
    return await this.materialRepository.find({ order: { orden: 'ASC' } });
  }

  async findActive(): Promise<MaterialEntity[]> {
    return await this.materialRepository.find({
      where: { activo: true },
      order: { orden: 'ASC' },
    });
  }

  async findById(id: number): Promise<MaterialEntity | null> {
    return await this.materialRepository.findOne({ where: { id } });
  }

  async update(id: number, dto: UpdateMaterialDto): Promise<MaterialEntity> {
    const material = await this.findById(id);
    if (!material) {
      throw new NotFoundException('Material no encontrado');
    }
    await this.materialRepository.update(id, dto);
    return (await this.findById(id))!;
  }

  async remove(id: number): Promise<void> {
    const material = await this.findById(id);
    if (!material) {
      throw new NotFoundException('Material no encontrado');
    }
    await this.materialRepository.delete(id);
  }
}
