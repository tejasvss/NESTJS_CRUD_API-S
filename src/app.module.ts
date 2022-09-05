import { Module } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from './entities/roles.entity';
import { UserModule } from './users/user.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { Permissions } from './entities/permissions.entity';
import { ConfigModule } from '@nestjs/config';
require("dotenv").config();


@Module({
  imports: [
    UserModule,
    RolesModule,
    PermissionsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOSTNAME,
      port: +process.env.DB_PORTNUMBER,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Roles, Permissions, User],
      autoLoadEntities: true,
      synchronize: true
    })
  ]
})
export class AppModule { }
