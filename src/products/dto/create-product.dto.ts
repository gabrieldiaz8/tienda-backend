import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsOptional,
  Min,
} from 'class-validator';
import { ProductCategory } from '../../common/enums/product-category.enum';
import { ProductMaterial } from '../../common/enums/product-material.enum';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsNumber()
  @Min(0)
  price!: number;

  @IsEnum(ProductCategory)
  category!: ProductCategory;

  @IsEnum(ProductMaterial)
  material!: ProductMaterial;

  @IsOptional()
  @IsString()
  subcategory?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
