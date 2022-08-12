import { Module } from '@nestjs/common';
import { Permissions } from 'src/entities/permissions.entity';
import { PermissionsController } from './permissions.controller';
import { PermissionsService } from 'src/permissions/permissions.service';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
    imports: [TypeOrmModule.forFeature([Permissions])],
    controllers: [PermissionsController],
    providers: [PermissionsService]
})
export class PermissionsModule { }