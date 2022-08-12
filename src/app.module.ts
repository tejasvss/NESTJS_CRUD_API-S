import { Module } from '@nestjs/common';
// import { User } from 'src/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Roles } from './entities/roles.entity';
import { UserModule } from './users/user.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
require("dotenv").config();


@Module({
  imports: [
    UserModule,
    RolesModule,
    PermissionsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: process.env.PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Roles],
      autoLoadEntities: true,
      synchronize: true
    })
  ]
})
export class AppModule { }
