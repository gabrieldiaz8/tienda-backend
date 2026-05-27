import { ProductCategory } from 'src/common/enums/product-category.enum';
import { ProductMaterial } from 'src/common/enums/product-material.enum';

export class CreateProductDto {
	name!: string;
	price!: number;
	description!: string;
	category!: ProductCategory;
	material!: ProductMaterial;
}
