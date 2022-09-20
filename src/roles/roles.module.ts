import { Module } from '@nestjs/common';
import { Roles } from 'src/entities/roles.entity';
import { RolesController } from './roles.controller';
import { RoleService } from 'src/roles/roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permissions } from 'src/entities/permissions.entity';
import { User } from 'src/entities/user.entity';


@Module({
    imports: [TypeOrmModule.forFeature([Roles, Permissions, User])],
    controllers: [RolesController],
    providers: [RoleService]
})
export class RolesModule { }