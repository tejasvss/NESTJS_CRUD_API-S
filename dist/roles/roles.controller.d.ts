import { Roles } from 'src/entities/roles.entity';
import { RoleService } from 'src/roles/roles.service';
import { CreateRoleDto } from 'src/dtos/createRole.dto';
import { UpdateRoleDto } from 'src/dtos/updateRole.dto';
export declare class RolesController {
    private readonly roleService;
    constructor(roleService: RoleService);
    createRole(response: any, createRoleDto: CreateRoleDto): Promise<Roles>;
    getAllRoles(response: any): Promise<Roles[]>;
    updateRole(response: any, role_id: number, updateRoleDto: UpdateRoleDto): Promise<Roles>;
    getRoleById(response: any, role_id: number): Promise<Roles>;
    deleteServiceById(response: any, role_id: number): Promise<void>;
}
