import { Module } from '@nestjs/common';
import { Roles } from 'src/entities/roles.entity';
import { RolesController } from './roles.controller';
import { RoleService } from 'src/roles/roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
    imports: [TypeOrmModule.forFeature([Roles])],
    controllers: [RolesController],
    providers: [RoleService]
})
export class RolesModule { }