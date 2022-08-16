import { IsNotEmpty } from 'class-validator';
import { Permissions } from '../entities/permissions.entity';

export class CreateRoleDto {

    role_name: string;

    role_description: string;

    @IsNotEmpty()
    permission_id: Permissions;
}