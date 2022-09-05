import { Permissions } from 'src/entities/permissions.entity';
import { Repository } from 'typeorm';
import { CreatePermissionDto } from 'src/dtos/createPermission.dto';
import { UpdatePermissionDto } from 'src/dtos/updatePermission.dto';
export declare class PermissionsService {
    private readonly permissionsRepository;
    constructor(permissionsRepository: Repository<Permissions>);
    createPermission(createPermissionDto: CreatePermissionDto): Promise<Permissions>;
    getAllPermissions(): Promise<Permissions[]>;
    getPermissionById(permission_id: number): Promise<Permissions>;
    updatePermission(permission_id: number, updatePermissionDto: UpdatePermissionDto): Promise<Permissions>;
    deletePermissionById(permission_id: number): Promise<void>;
}
