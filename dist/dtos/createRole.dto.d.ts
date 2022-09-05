import { Permissions } from '../entities/permissions.entity';
export declare class CreateRoleDto {
    role_name: string;
    role_description: string;
    permission_Ids: number[];
    permissions: Permissions[];
}
