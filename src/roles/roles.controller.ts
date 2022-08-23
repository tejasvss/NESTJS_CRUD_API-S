import {
    Body,
    Controller,
    Get,
    Post,
    Param,
    Delete,
    Put,
    HttpCode,
    HttpStatus,
    Res,
    Query,
    Patch
} from '@nestjs/common';
import { throws } from 'assert';

import { Roles } from 'src/entities/roles.entity';
import { RoleService } from 'src/roles/roles.service';
import { CreateRoleDto } from 'src/dtos/createRole.dto';
import { response } from 'express';
import { Permissions } from 'src/entities/permissions.entity';
import { UpdateRoleDto } from 'src/dtos/updateRole.dto';

@Controller('roles')
export class RolesController {
    constructor(private readonly roleService: RoleService) { }

    @Post('/createRole')
    async createRole(@Res() response, @Body() createRoleDto: CreateRoleDto): Promise<Roles> {
        let roleData = await this.roleService.createRole(createRoleDto);
        return response.status(200).send({ statusCode: 200, message: 'Role created successfully', data: roleData })
    }

    @Get('/getAllRoles')
    async getAllRoles(@Res() response): Promise<Roles[]> {
        let rolesData = await this.roleService.getRoles();
        return response.status(200).send({ statusCode: 200, message: "Roles fetched succesfully", data: rolesData })
    }

    @Put('/updateRole')
    async updateRole(@Res() response, @Query('role_id') role_id: number, @Body() updateRoleDto: UpdateRoleDto): Promise<Roles> {
        let roleData = await this.roleService.updateRole(role_id, updateRoleDto);
        return response.status(200).send({ statusCode: 200, message: "Roles fetched succesfully", data: roleData })
    }

    @Get('/getRole')
    async getRoleById(@Res() response, @Query('role_id') role_id: number): Promise<Roles> {
        let roleData = await this.roleService.getRoleById(role_id);
        return response.status(200).send({ statusCode: 200, message: "Role fetched successfully", data: roleData })
    }
}