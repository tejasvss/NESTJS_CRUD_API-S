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
    Res
} from '@nestjs/common';
import { throws } from 'assert';

import { Roles } from 'src/entities/roles.entity';
import { RoleService } from 'src/roles/roles.service';
import { CreateRoleDto } from 'src/dtos/createRole.dto';
import { response } from 'express';

@Controller('roles')
export class RolesController {
    constructor(private readonly roleService: RoleService) { }

    @Post('/createRole')
    async createRole(@Res() response, @Body() createRoleDto: CreateRoleDto): Promise<Roles> {
        let roleData = await this.roleService.createRole(createRoleDto);
        return response.status(200).send({ status: 1, Message: 'Role created successfully', Data: roleData })
    }

    @Get('/getAllRoles')
    async getAllRoles(@Res() response): Promise<Roles[]> {
        let rolesData = await this.roleService.getRoles();
        return response.status(200).send({ status: 1, Message: "Roles fetched succesfully", Data: rolesData })
    }
}