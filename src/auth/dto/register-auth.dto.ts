import { LoginAuthDto } from "./login-auth.dto";
import { UserRole } from "src/common/enums/user-role.enum";

export class RegisterAuthDto extends LoginAuthDto {
    name!: string;

    surname!: string;

    role?: UserRole;

    phone!: string;
}