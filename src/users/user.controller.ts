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
import { CreateUserDto } from 'src/dtos/createUser.dto';
import { UpdateUserDto } from 'src/dtos/updateUser.dto';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/users/user.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UserService) { }

    @Post('/createUser')
    async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.createUser(createUserDto);
    }

    @Get('/getAllUsers')

    async getAllUsers(): Promise<User[]> {
        return this.userService.getAllUsers();
    }

    @Delete('deleteUser/:id')
    async deleteUserById(@Param('id') id: number): Promise<void> {
        return this.userService.deleteUserById(id)
    }

    @Get('/getUser/:id')
    @HttpCode(HttpStatus.OK)
    async getUserById(@Res() response, @Param('id') id: number): Promise<User> {
        const resp = await this.userService.getUserById(id);
        return response.status(200).json({ status: 1, message: 'user fetched successfully', data: resp })
    }

    @Put('/updateUser/:id')
    @HttpCode(HttpStatus.OK)
    async updateUserById(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        return this.userService.updateUser(id, updateUserDto);
    }

}