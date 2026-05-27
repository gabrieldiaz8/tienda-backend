import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto implements Partial<CreateUserDto> {
	name?: string;
	surname?: string;
	email?: string;
	password?: string;
	phone?: string;
	role?: CreateUserDto['role'];
}
