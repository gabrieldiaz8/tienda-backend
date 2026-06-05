import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { ProductService } from './products.service';
import { ProductEntity } from '../common/entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductCategory } from '../common/enums/product-category.enum';
import { ProductMaterial } from '../common/enums/product-material.enum';
import { Public } from '../common/decorators/public.decorator';
import { GetUserId } from '../common/decorators/getUserId.decorator';
import { Roles } from '../common/decorators/permission.decorator';
import { UserRole } from '../common/enums/user-role.enum';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Public()
  @Get()
  async findAll(): Promise<ProductEntity[]> {
    return await this.productService.findAll();
  }

  @Public()
  @Get(':id')
  async findById(@Param('id') id: number): Promise<ProductEntity | null> {
    return await this.productService.findById(id);
  }

  @Public()
  @Get('category/:category')
  async findByCategory(
    @Param('category') category: ProductCategory,
  ): Promise<ProductEntity[]> {
    return await this.productService.findByCategory(category);
  }

  @Public()
  @Get('material/:material')
  async findByMaterial(
    @Param('material') material: ProductMaterial,
  ): Promise<ProductEntity[]> {
    return await this.productService.findByMaterial(material);
  }

  @Public()
  @Get('price-range')
  async findByPriceRange(
    @Query('min') min: number,
    @Query('max') max: number,
  ): Promise<ProductEntity[]> {
    return await this.productService.findByPriceRange(min, max);
  }

  @Roles(UserRole.OWNER, UserRole.SUPER_ADMIN)
  @Post()
  async create(
    @GetUserId() userId: number,
    @Body() dto: CreateProductDto,
  ): Promise<ProductEntity> {
    return await this.productService.create({
      ...dto,
      createdByUserId: userId,
    });
  }

  @Roles(UserRole.OWNER, UserRole.SUPER_ADMIN)
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: join(process.cwd(), 'uploads'),
        filename: (_req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (_req, file, callback) => {
        if (!file.mimetype.match(/^image\//)) {
          callback(new Error('Solo se permiten imágenes'), false);
          return;
        }
        callback(null, true);
      },
    }),
  )
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return { imageUrl: `/uploads/${file.filename}` };
  }

  @Roles(UserRole.OWNER, UserRole.SUPER_ADMIN)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateProductDto,
  ): Promise<ProductEntity | null> {
    return await this.productService.update(id, dto);
  }

  @Roles(UserRole.OWNER, UserRole.SUPER_ADMIN)
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: number): Promise<void> {
    return await this.productService.delete(id);
  }
}
