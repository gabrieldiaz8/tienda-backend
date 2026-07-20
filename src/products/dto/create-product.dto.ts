import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsOptional,
  Min,
} from 'class-validator';
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

  @IsNumber()
  categoriaId!: number;

  @IsEnum(ProductMaterial)
  material!: ProductMaterial;

  @IsOptional()
  @IsNumber()
  @Min(0)
  stock?: number;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
