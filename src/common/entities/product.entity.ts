import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CategoriaEntity } from './categoria.entity';
import { MaterialEntity } from './material.entity';

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

  @Column({ type: 'varchar', nullable: true })
  material: string;

  @Column({ nullable: true })
  materialId: number;

  @ManyToOne(() => MaterialEntity)
  @JoinColumn({ name: 'materialId' })
  materialRel: MaterialEntity;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ default: 0 })
  stock: number;

  @Column()
  createdByUserId: number;
}
