import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ProductCategory } from '../enums/product-category.enum';
import { ProductMaterial } from '../enums/product-material.enum';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'varchar' })
  category: ProductCategory;

  @Column({ type: 'varchar' })
  material: ProductMaterial;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ nullable: true })
  subcategory: string;

  @Column()
  createdByUserId: number;
}
