import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MaterialsService } from './materials.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { MaterialEntity } from '../common/entities/material.entity';
import { Roles } from '../common/decorators/permission.decorator';
import { UserRole } from '../common/enums/user-role.enum';
import { Public } from '../common/decorators/public.decorator';

@Controller('materials')
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

  @Roles(UserRole.SUPER_ADMIN)
  @Post()
  async create(@Body() dto: CreateMaterialDto): Promise<MaterialEntity> {
    return await this.materialsService.create(dto);
  }

  @Public()
  @Get()
  async findAll(): Promise<MaterialEntity[]> {
    return await this.materialsService.findAll();
  }

  @Public()
  @Get('active')
  async findActive(): Promise<MaterialEntity[]> {
    return await this.materialsService.findActive();
  }

  @Public()
  @Get(':id')
  async findById(@Param('id') id: number): Promise<MaterialEntity | null> {
    return await this.materialsService.findById(id);
  }

  @Roles(UserRole.SUPER_ADMIN)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateMaterialDto,
  ): Promise<MaterialEntity> {
    return await this.materialsService.update(id, dto);
  }

  @Roles(UserRole.SUPER_ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return await this.materialsService.remove(id);
  }
}
