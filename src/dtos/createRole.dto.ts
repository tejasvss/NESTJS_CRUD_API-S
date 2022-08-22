import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { Permissions } from '../entities/permissions.entity';

export class CreateRoleDto {

    @IsNotEmpty()
    role_name: string;
    @IsNotEmpty()
    role_description: string;
    @IsNotEmpty()
    permission_Ids: number[];
    permissions: Permissions[];
}