import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permissions } from 'src/entities/permissions.entity';
import { Repository } from 'typeorm';
import { CreatePermissionDto } from 'src/dtos/createPermission.dto';
import { UpdatePermissionDto } from 'src/dtos/updatePermission.dto';


@Injectable()
export class PermissionsService {
    constructor(
        @InjectRepository(Permissions)
        private readonly permissionsRepository: Repository<Permissions>,
    ) { }

    async createPermission(createPermissionDto: CreatePermissionDto): Promise<Permissions> {
        let { permission_name } = createPermissionDto;
        let checkPermission = await this.permissionsRepository.findOne({ where: { permission_name: permission_name } })
        if (checkPermission) throw new BadRequestException("Your entered permission name is already exists.Try another")
        const newPermission = await this.permissionsRepository.create(createPermissionDto);
        const permission = this.permissionsRepository.save(newPermission);
        return permission;
    }


    async getAllPermissions(): Promise<Permissions[]> {
        const permissionsData = await this.permissionsRepository.find({ order: { permission_id: 'ASC' } });
        return permissionsData;
    }


    async getPermissionById(permission_id: number): Promise<Permissions> {
        const permissionData = await this.permissionsRepository.findOne({ where: { permission_id: permission_id } })
        if (!permissionData) {
            throw new NotFoundException(`For your entered ${permission_id} permission_id no data found`)
        }
        return permissionData;
    }


    async updatePermission(permission_id: number, updatePermissionDto: UpdatePermissionDto): Promise<Permissions> {
        const { permission_name, permission_description } = updatePermissionDto;
        const checkPermission = await this.getPermissionById(permission_id);

        let checkPermissionName = await this.permissionsRepository.findOne({ where: { permission_name: permission_name } });

        if (checkPermissionName && checkPermissionName.permission_id != permission_id) {
            throw new BadRequestException("Your entered permission name is already taken.Try another")
        }
        checkPermission.permission_name = permission_name;
        checkPermission.permission_description = permission_description;

        await this.permissionsRepository.save(checkPermission);
        return checkPermission;
    }
}