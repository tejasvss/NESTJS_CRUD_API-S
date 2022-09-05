import { Roles } from "src/entities/roles.entity";
export declare class CreateUserDto {
    user_name: string;
    email: string;
    mobileNumber: number;
    role: number;
    role_id: Roles;
}
