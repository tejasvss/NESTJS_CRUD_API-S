import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permissions } from 'src/entities/permissions.entity';
import { Repository } from 'typeorm';
import { CreatePermissionDto } from 'src/dtos/createPermission.dto';


@Injectable()
export class PermissionsService {
    constructor(
        @InjectRepository(Permissions)
        private readonly permissionsRepository: Repository<Permissions>,
    ) { }

    async createPermission(createPermissionDto: CreatePermissionDto): Promise<Permissions> {
        const newPermission = await this.permissionsRepository.create(createPermissionDto);
        const permission = this.permissionsRepository.save(newPermission);
        return permission;
    }

    async getAllPermissions(): Promise<Permissions[]> {
        const permissionsData = await this.permissionsRepository.find({});
        return permissionsData;
    }

}