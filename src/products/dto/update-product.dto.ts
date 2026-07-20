import { IsString, IsOptional, IsNumber, IsEnum, Min } from 'class-validator';
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
  @IsNumber()
  categoriaId?: number;

  @IsOptional()
  @IsEnum(ProductMaterial)
  material?: ProductMaterial;

  @IsOptional()
  @IsNumber()
  @Min(0)
  stock?: number;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
