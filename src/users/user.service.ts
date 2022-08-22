import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
        private readonly roleRepository: Repository<Roles>
    ) { }


    async checkEmail(email: string): Promise<void> {
        let checkEmail = await this.userRepository.findOne({ where: { email: email } })
        if (checkEmail) throw new BadRequestException("Your entered email is already taken")
    }

    async checkMobileNumber(mobileNumber: number): Promise<void> {
        let checkMobileNumber = await this.userRepository.findOne({ where: { mobileNumber: mobileNumber } })
        if (checkMobileNumber) throw new BadRequestException("Your entered mobileNumber is already taken")
    }

    async checkRoleId(role: number): Promise<Roles> {
        let checkRoleId = await this.roleRepository.findOne({ where: { role_id: role } });
        if (!checkRoleId) throw new BadRequestException("Your entered role_id is invalid")
        return checkRoleId;
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        let { role, email, mobileNumber } = createUserDto;
        await this.checkEmail(email);
        await this.checkMobileNumber(mobileNumber);

        createUserDto.role_id = await this.checkRoleId(role)
        const newUser = await this.userRepository.create(createUserDto);
        const user = this.userRepository.save(newUser);
        return user;
    }

    async getAllUsers(): Promise<User[]> {
        const users = await this.userRepository.find({ relations: { role_id: true }, order: { user_id: 'ASC' } });
        if (!users) {
            throw new NotFoundException(`No data found`)
        }
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
        const { user_name, mobileNumber, email, role } = updateUserDto;
        const checkUser = await this.getUserById(user_id);

        if (email) {
            let checkEmail = await this.userRepository.findOne({ where: { email: email } });
            if (checkEmail && checkEmail.user_id != user_id) throw new BadRequestException("Your entered email is already taken by another account")
        }

        if (mobileNumber) {
            let checkMobileNumber = await this.userRepository.findOne({ where: { mobileNumber: mobileNumber } })
            if (checkMobileNumber && checkMobileNumber.user_id != user_id) throw new BadRequestException("Your entered mobileNumber is already taken by another account")
        }

        if (role) {
            checkUser.role_id = await this.checkRoleId(role);
        }

        checkUser.user_name = user_name;
        checkUser.email = email;
        checkUser.mobileNumber = mobileNumber;
        await this.userRepository.save(checkUser);
        return await this.getUserById(user_id);
    }

    //Searching_User
    async searchUser(search: string): Promise<User[]> {

        console.log({ search })
        let allUsers = await this.getAllUsers();
        let data = []

        if (search) {
            for (const user of allUsers) {
                if (user.user_name.includes(search) || user.email.includes(search)) {
                    data.push(user)
                }
            }
        }
        return data;
    }
}