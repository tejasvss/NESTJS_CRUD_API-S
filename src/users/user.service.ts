import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/dtos/createUser.dto';
import { UpdateUserDto } from 'src/dtos/updateUser.dto';
import { Roles } from 'src/entities/roles.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Roles)
        private readonly rolesRepository: Repository<Roles>
    ) { }



    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const newUser = await this.userRepository.create(createUserDto);
        const user = this.userRepository.save(newUser);
        return user;
    }

    async getAllUsers(): Promise<User[]> {
        const users = await this.userRepository.find({ relations: { role_id: true } });
        return users;
    }

    async deleteUserById(user_id: number): Promise<void> {
        const response = await this.userRepository.delete(user_id);
        console.log(response)

        if (response.affected == 0) {
            throw new NotFoundException(`For your entered ${user_id} no data found`)
        }
    }

    async getUserById(user_id: number): Promise<User> {
        const user = await this.userRepository.findOne({ where: { user_id: user_id }, relations: { role_id: true } })
        if (!user) {
            throw new NotFoundException(`For your entered ${user_id} no data found`)
        }
        return user;
    }

    async updateUser(user_id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const { user_name, mobileNumber, email } = updateUserDto;
        const checkUser = await this.getUserById(user_id);

        checkUser.user_name = user_name;
        checkUser.email = email;
        checkUser.mobileNumber = mobileNumber;

        await this.userRepository.save(checkUser);
        return checkUser;
    }

}