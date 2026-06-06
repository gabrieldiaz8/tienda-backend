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
import { extname } from 'path';
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
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
      storage: new CloudinaryStorage({
        cloudinary: cloudinary,
        params: async (_req, file) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname).replace('.', '');
          return {
            folder: 'tienda',
            format: ext,
            public_id: uniqueSuffix,
          };
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
    const url = (file as any).secure_url || (file as any).path || file.path;
    return { imageUrl: url };
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
