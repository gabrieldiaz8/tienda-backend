import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ProductMaterial } from '../enums/product-material.enum';
import { CategoriaEntity } from './categoria.entity';

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

  @Column({ nullable: true })
  categoriaId: number;

  @ManyToOne(() => CategoriaEntity)
  @JoinColumn({ name: 'categoriaId' })
  categoria: CategoriaEntity;

  @Column({ type: 'varchar', nullable: true })
  category: string;

  @Column({ type: 'varchar' })
  material: ProductMaterial;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ default: 0 })
  stock: number;

  @Column()
  createdByUserId: number;
}
