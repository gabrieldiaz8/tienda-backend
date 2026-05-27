import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query } from '@nestjs/common';
import { ProductService } from './products.service';
import { ProductEntity } from '../common/entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductCategory } from '../common/enums/product-category.enum';
import { ProductMaterial } from '../common/enums/product-material.enum';
import { Public } from '../common/decorators/public.decorator';
import { GetUserId } from '../common/decorators/getUserId.decorator';
import { PermissionsDecorator, Roles } from '../common/decorators/permission.decorator';
import { Permissions } from '../common/enums/permissions.enum';
import { UserRole } from '../common/enums/user-role.enum';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // Público: ver todos los productos
  @Public()
  @Get()
  async findAll(): Promise<ProductEntity[]> {
    return await this.productService.findAll();
  }

  // Público: ver producto por ID
  @Public()
  @Get(':id')
  async findById(@Param('id') id: number): Promise<ProductEntity | null> {
    return await this.productService.findById(id);
  }

  // Público: filtrar por categoría
  @Public()
  @Get('category/:category')
  async findByCategory(@Param('category') category: ProductCategory): Promise<ProductEntity[]> {
    return await this.productService.findByCategory(category);
  }

  // Público: filtrar por material
  @Public()
  @Get('material/:material')
  async findByMaterial(@Param('material') material: ProductMaterial): Promise<ProductEntity[]> {
    return await this.productService.findByMaterial(material);
  }

  // Público: filtrar por rango de precio
  @Public()
  @Get('price-range')
  async findByPriceRange(@Query('min') min: number, @Query('max') max: number): Promise<ProductEntity[]> {
    return await this.productService.findByPriceRange(min, max);
  }

  // ADMIN (dueño): crear producto
  //@PermissionsDecorator(Permissions.CreateProduct)
  @Roles(UserRole.OWNER)
  @Post()
  async create(@GetUserId() userId: number, @Body() dto: CreateProductDto): Promise<ProductEntity> {
    return await this.productService.create({ ...dto, createdByUserId: userId });
  }

  // ADMIN (dueño): actualizar producto
  //@PermissionsDecorator(Permissions.UpdateProduct)
  @Roles(UserRole.OWNER)
  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateProductDto): Promise<ProductEntity | null> {
    return await this.productService.update(id, dto);
  }

  // ADMIN (dueño): eliminar producto
  @Roles(UserRole.OWNER)
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: number): Promise<void> {
    return await this.productService.delete(id);
  }
}
