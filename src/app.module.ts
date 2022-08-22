import { Module } from '@nestjs/common';
// import { User } from 'src/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Roles } from './entities/roles.entity';
import { UserModule } from './users/user.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { Permissions } from './entities/permissions.entity';
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
      password: process.env.PASSWORD,
      database: process.env.DB_NAME,
      entities: [Roles, Permissions],
      autoLoadEntities: true,
      synchronize: true
    })
  ]
})
export class AppModule { }
