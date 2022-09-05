import { CreateUserDto } from 'src/dtos/createUser.dto';
import { UpdateUserDto } from 'src/dtos/updateUser.dto';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/users/user.service';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UserService);
    createUser(response: any, createUserDto: CreateUserDto): Promise<User>;
    getAllUsers(response: any): Promise<User[]>;
    deleteUserById(response: any, user_id: number): Promise<void>;
    getUserById(response: any, user_id: number): Promise<User>;
    updateUserById(user_id: number, updateUserDto: UpdateUserDto): Promise<User>;
    searchUser(response: any, search: string): Promise<User>;
}
