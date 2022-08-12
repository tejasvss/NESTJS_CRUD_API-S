import { Module } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UsersController } from './user.controller';
import { UserService } from 'src/users/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from 'src/entities/roles.entity';


@Module({
    imports: [TypeOrmModule.forFeature([User, Roles])],
    controllers: [UsersController],
    providers: [UserService]
})
export class UserModule { }