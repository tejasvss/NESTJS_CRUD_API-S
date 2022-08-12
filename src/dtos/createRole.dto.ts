import { Permissions } from '../entities/permissions.entity';

export class CreateRoleDto {

    role_name: string;

    role_description: string;

    permission_id: Permissions;
}