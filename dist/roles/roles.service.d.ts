import { Roles } from 'src/entities/roles.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from 'src/dtos/createRole.dto';
import { Permissions } from 'src/entities/permissions.entity';
import { UpdateRoleDto } from 'src/dtos/updateRole.dto';
import { User } from 'src/entities/user.entity';
export declare class RoleService {
    private readonly roleRepository;
    private readonly permissionRepository;
    private readonly userRepository;
    constructor(roleRepository: Repository<Roles>, permissionRepository: Repository<Permissions>, userRepository: Repository<User>);
    createRole(createRoleDto: CreateRoleDto): Promise<Roles>;
    getRoles(): Promise<Roles[]>;
    getRoleById(role_id: number): Promise<Roles>;
    updateRole(role_id: number, updateRoleDto: UpdateRoleDto): Promise<Roles>;
    deleteServiceById(role_id: any): Promise<void>;
}
