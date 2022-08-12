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

import { Permissions } from 'src/entities/permissions.entity';
import { PermissionsService } from 'src/permissions/permissions.service';
import { CreatePermissionDto } from 'src/dtos/createPermission.dto';
import { response } from 'express';

@Controller('permissions')
export class PermissionsController {
    constructor(private readonly permissionsService: PermissionsService) { }

    @Post('/createPermission')
    async createPermission(@Res() response, @Body() createPermissionDto: CreatePermissionDto): Promise<Permissions> {
        let permissionsData = await this.permissionsService.createPermission(createPermissionDto);
        return response.status(200).send({ status: 1, Message: 'Permissions created successfully', Data: permissionsData })
    }

    @Get('/getAllPermissions')
    async getAllPermissions(@Res() response): Promise<Permissions[]> {
        let permissionsData = await this.permissionsService.getAllPermissions();
        return response.status(200).send({ status: 1, Message: "Permissions fetched succesfully", Data: permissionsData })
    }
}