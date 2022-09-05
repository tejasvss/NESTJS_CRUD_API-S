import { Permissions } from 'src/entities/permissions.entity';
import { PermissionsService } from 'src/permissions/permissions.service';
import { CreatePermissionDto } from 'src/dtos/createPermission.dto';
import { UpdatePermissionDto } from 'src/dtos/updatePermission.dto';
export declare class PermissionsController {
    private readonly permissionsService;
    constructor(permissionsService: PermissionsService);
    createPermission(response: any, createPermissionDto: CreatePermissionDto): Promise<Permissions>;
    getAllPermissions(response: any): Promise<Permissions[]>;
    updatePermissionById(response: any, permission_id: number, updatePermissionDto: UpdatePermissionDto): Promise<Permissions>;
    getPermissionById(response: any, permission_id: number): Promise<Permissions>;
    deletePermissionById(response: any, permission_id: number): Promise<void>;
}
