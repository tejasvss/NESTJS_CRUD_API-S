import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { Roles } from "src/entities/roles.entity";

export class CreateUserDto {
    @IsNotEmpty()
    @MinLength(3)
    user_name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    mobileNumber: number;

    @IsNotEmpty()
    role: number;

    role_id: Roles;
}