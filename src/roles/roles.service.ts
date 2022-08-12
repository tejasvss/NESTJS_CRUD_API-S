import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from 'src/entities/roles.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from 'src/dtos/createRole.dto';


@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Roles)
        private readonly roleRepository: Repository<Roles>,
    ) { }

    async createRole(createRoleDto: CreateRoleDto): Promise<Roles> {

        const newRole = await this.roleRepository.create(createRoleDto);
        const role = this.roleRepository.save(newRole);
        return role;
    }

    async getRoles(): Promise<Roles[]> {
        const rolesData = await this.roleRepository.find({});
        return rolesData;
    }


}