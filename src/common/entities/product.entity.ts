import { PrimaryGeneratedColumn } from 'typeorm/browser/decorator/columns/PrimaryGeneratedColumn.js';
import { ProductCategory } from '../enums/product-category.enum';
import { ProductMaterial } from '../enums/product-material.enum';
import { Column } from 'typeorm';

export class ProductEntity {
    @PrimaryGeneratedColumn({ name: 'id' })
	id: number;

    @Column({ name: 'name' })
    name: string;

    @Column({ name: 'description' })
    description: string;

    @Column({ name: 'price' })
    price: number;

    @Column({ name: 'category' })
    category: ProductCategory;

    @Column({ name: 'material' })
    material: ProductMaterial;

    @Column({ name: 'created_by_user_id' })
    createdByUserId: number;

}