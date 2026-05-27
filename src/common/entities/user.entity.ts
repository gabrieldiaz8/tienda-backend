import { PrimaryGeneratedColumn } from 'typeorm/browser/decorator/columns/PrimaryGeneratedColumn.js';
import { UserRole } from '../enums/user-role.enum';
import { Column } from 'typeorm';

export class UserEntity {
   @PrimaryGeneratedColumn({name: 'id'})
    id: number;

    @Column({ name: 'name' })
    name: string;

    @Column({ name: 'surname' })
    surname: string;

	@Column()
	usuario: string;

    @Column()
    password: string

	@Column({
		type: 'enum',
		enum: UserRole,
		default: UserRole.OWNER,
	})
	role: UserRole;

    /*@Column({ name: 'birth_date' })
    birthDate: Date;

    @Column({ name: 'phone_number' })
    phone: string;

    @Column()
    email: string;*/


    

}
