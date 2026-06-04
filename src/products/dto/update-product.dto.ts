import { IsString, IsOptional, IsNumber, IsEnum, Min } from 'class-validator';
import { ProductCategory } from '../../common/enums/product-category.enum';
import { ProductMaterial } from '../../common/enums/product-material.enum';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @IsOptional()
  @IsEnum(ProductCategory)
  category?: ProductCategory;

  @IsOptional()
  @IsEnum(ProductMaterial)
  material?: ProductMaterial;

  @IsOptional()
  @IsString()
  subcategory?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
