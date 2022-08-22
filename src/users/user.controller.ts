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
    Query
} from '@nestjs/common';
import { throws } from 'assert';
import { response } from 'express';
import { CreateUserDto } from 'src/dtos/createUser.dto';
import { UpdateUserDto } from 'src/dtos/updateUser.dto';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/users/user.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UserService) { }

    @Post('/createUser')
    async createUser(@Res() response, @Body() createUserDto: CreateUserDto): Promise<User> {
        let data = await this.userService.createUser(createUserDto);
        return response.status(200).send({ statusCode: 200, message: "User created success", data: data })
    }

    @Get('/getAllUsers')
    async getAllUsers(@Res() response): Promise<User[]> {
        let data = await this.userService.getAllUsers();
        return response.status(200).send({ statusCode: 200, message: "User fetched successfully", data: data })
    }

    @Delete('deleteUser')
    async deleteUserById(@Res() response, @Query('user_id') user_id: number): Promise<void> {
        let data = await this.userService.deleteUserById(user_id);
        return response.status(200).send({ statusCode: 200, message: "User record deleted successfully", data: {} })
    }

    @Get('/getUser')
    async getUserById(@Res() response, @Query('user_id') user_id: number): Promise<User> {
        let data = await this.userService.getUserById(user_id);
        return response.status(200).json({ statusCode: 200, message: 'user fetched successfully', data: data })
    }

    @Put('/updateUser')
    async updateUserById(@Query('user_id') user_id: number, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        return this.userService.updateUser(user_id, updateUserDto);
    }

    @Get('/searchUser')
    async searchUser(@Res() response, @Query('search') search: string): Promise<User> {
        const usersData = await this.userService.searchUser(search);
        return response.status(200).send({ statusCode: 200, message: "user fetched successfully", data: usersData })
    }
}