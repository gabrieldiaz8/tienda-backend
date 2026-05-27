import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto implements Partial<CreateProductDto> {
	name?: string;
	price?: number;
	description?: string;
	category?: CreateProductDto['category'];
	material?: CreateProductDto['material'];
}
