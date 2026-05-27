import { UserRole } from 'src/common/enums/user-role.enum';

export class CreateUserDto {
	name!: string;
	surname!: string;
	email!: string;
	password!: string;
	phone!: string;
	role?: UserRole;
}
