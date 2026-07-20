import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoriaEntity } from '../common/entities/categoria.entity';
import { Roles } from '../common/decorators/permission.decorator';
import { UserRole } from '../common/enums/user-role.enum';
import { Public } from '../common/decorators/public.decorator';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Roles(UserRole.SUPER_ADMIN)
  @Post()
  async create(@Body() dto: CreateCategoryDto): Promise<CategoriaEntity> {
    return await this.categoriesService.create(dto);
  }

  @Public()
  @Get()
  async findAll(): Promise<CategoriaEntity[]> {
    return await this.categoriesService.findAll();
  }

  @Public()
  @Get('active')
  async findActive(): Promise<CategoriaEntity[]> {
    return await this.categoriesService.findActive();
  }

  @Public()
  @Get(':id')
  async findById(@Param('id') id: number): Promise<CategoriaEntity | null> {
    return await this.categoriesService.findById(id);
  }

  @Roles(UserRole.SUPER_ADMIN)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateCategoryDto,
  ): Promise<CategoriaEntity> {
    return await this.categoriesService.update(id, dto);
  }

  @Roles(UserRole.SUPER_ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return await this.categoriesService.remove(id);
  }
}
