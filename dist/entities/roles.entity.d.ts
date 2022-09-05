import { Permissions } from './permissions.entity';
export declare class Roles {
    role_id: number;
    role_name: string;
    role_description: string;
    created_at: Date;
    updated_at: Date;
    permissions: Permissions[];
}
