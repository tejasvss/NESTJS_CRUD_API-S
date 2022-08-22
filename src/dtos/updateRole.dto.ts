import { IsArray, IsNotEmpty } from "class-validator";
import { Permissions } from "src/entities/permissions.entity";

export class UpdateRoleDto {
    role_name: string;

    role_description: string;

    @IsArray()
    permission_Ids: number[];

    permissions: Permissions[];

}