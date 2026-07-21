import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('materials')
export class MaterialEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nombre: string;

  @Column({ default: true })
  activo: boolean;

  @Column({ default: 0 })
  orden: number;
}
