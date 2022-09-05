import { Permissions } from "src/entities/permissions.entity";
export declare class UpdateRoleDto {
    role_name: string;
    role_description: string;
    permission_Ids: number[];
    permissions: Permissions[];
}
