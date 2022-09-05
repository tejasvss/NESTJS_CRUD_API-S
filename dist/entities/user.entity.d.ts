import { Roles } from './roles.entity';
export declare class User {
    user_id: number;
    user_name: string;
    email: string;
    mobileNumber: number;
    created_at: Date;
    updated_at: Date;
    role_id: Roles;
}
