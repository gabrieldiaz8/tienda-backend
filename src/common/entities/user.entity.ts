import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserRole } from '../enums/user-role.enum';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column({ unique: true })
  usuario: string;

  @Column()
  password: string;

  @Column({ type: 'varchar', default: UserRole.OWNER })
  role: UserRole;
}
