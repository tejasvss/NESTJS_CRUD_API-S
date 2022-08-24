import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from 'src/entities/roles.entity';
import { In, Repository } from 'typeorm';
import { CreateRoleDto } from 'src/dtos/createRole.dto';
import { Permissions } from 'src/entities/permissions.entity';
import { UpdateRoleDto } from 'src/dtos/updateRole.dto';


@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Roles)
        private readonly roleRepository: Repository<Roles>,
        @InjectRepository(Permissions)
        private readonly permissionRepository: Repository<Permissions>
    ) { }



    async createRole(createRoleDto: CreateRoleDto): Promise<Roles> {

        let { permission_Ids, role_name } = createRoleDto;

        let checkRole = await this.roleRepository.findOne({ where: { role_name: role_name } })
        if (checkRole) throw new BadRequestException("Your entered role_name is already taken.Try another")

        let permissionData = await this.permissionRepository.find({ where: { permission_id: In(permission_Ids) } })
        console.log("permissionData", permissionData)

        let data = createRoleDto;
        data.permissions = permissionData;
        const newRole = await this.roleRepository.create(createRoleDto);
        const roles = await this.roleRepository.save(newRole);
        return roles;
    }


    async getRoles(): Promise<Roles[]> {
        const rolesData = await this.roleRepository.find({ order: { role_id: 'ASC' } });
        return rolesData;
    }


    async getRoleById(role_id: number): Promise<Roles> {
        const rolesData = await this.roleRepository.findOne({ where: { role_id: role_id } })
        if (!rolesData) {
            throw new NotFoundException(`For your entered role_id ${role_id}.No data found`)
        }
        return rolesData;
    }

    //Updating_Roles
    async updateRole(role_id: number, updateRoleDto: UpdateRoleDto): Promise<Roles> {

        const { role_name, role_description, permission_Ids } = updateRoleDto;
        const checkRole = await this.getRoleById(role_id);

        let permissionData = await this.permissionRepository.find({ where: { permission_id: In(permission_Ids) } });
        if (!permissionData.length) throw new BadRequestException("No permissions found for permissions_Ids")

        if (role_name) {
            let checkRoleName = await this.roleRepository.findOne({ where: { role_name: role_name } });

            if (checkRoleName && checkRoleName.role_id != role_id) {
                throw new BadRequestException("Your entered role_name is already taken by another role_id")
            }
        }

        checkRole.permissions = permissionData;
        checkRole.role_name = role_name;
        checkRole.role_description = role_description;

        await this.roleRepository.save(checkRole);
        return await this.getRoleById(role_id);
    }

    async deleteServiceById(role_id: number): Promise<void> {

        const response = await this.roleRepository.delete(role_id);
        console.log(response)

        if (response.affected == 0) {
            throw new NotFoundException(`For your entered role_id: ${role_id} no data found`)
        }
    }

}