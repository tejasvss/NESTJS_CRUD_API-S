import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/dtos/createUser.dto';
import { UpdateUserDto } from 'src/dtos/updateUser.dto';
import { Roles } from 'src/entities/roles.entity';
export declare class UserService {
    private readonly userRepository;
    private readonly roleRepository;
    constructor(userRepository: Repository<User>, roleRepository: Repository<Roles>);
    checkEmail(email: string): Promise<void>;
    checkMobileNumber(mobileNumber: number): Promise<void>;
    checkRoleId(role: number): Promise<Roles>;
    createUser(createUserDto: CreateUserDto): Promise<User>;
    getAllUsers(): Promise<User[]>;
    deleteUserById(user_id: number): Promise<void>;
    getUserById(user_id: number): Promise<User>;
    updateUser(user_id: number, updateUserDto: UpdateUserDto): Promise<User>;
    searchUser(search: string): Promise<User[]>;
}
