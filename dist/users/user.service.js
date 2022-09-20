"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../entities/user.entity");
const typeorm_2 = require("typeorm");
const roles_entity_1 = require("../entities/roles.entity");
let UserService = class UserService {
    constructor(userRepository, roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }
    async checkEmail(email) {
        let checkEmail = await this.userRepository.findOne({ where: { email: email } });
        if (checkEmail)
            throw new common_1.BadRequestException("Your entered email is already taken");
    }
    async checkMobileNumber(mobileNumber) {
        let checkMobileNumber = await this.userRepository.findOne({ where: { mobileNumber: mobileNumber } });
        if (checkMobileNumber)
            throw new common_1.BadRequestException("Your entered mobileNumber is already taken");
    }
    async checkRoleId(role) {
        let checkRoleId = await this.roleRepository.findOne({ where: { role_id: role } });
        if (!checkRoleId)
            throw new common_1.BadRequestException("Your entered role_id is invalid");
        return checkRoleId;
    }
    async createUser(createUserDto) {
        let { role, email, mobileNumber, role_id } = createUserDto;
        await this.checkEmail(email);
        await this.checkMobileNumber(mobileNumber);
        if (role) {
            createUserDto.role_id = await this.checkRoleId(role);
        }
        const newUser = await this.userRepository.create(createUserDto);
        const user = this.userRepository.save(newUser);
        return user;
    }
    async getAllUsers() {
        const users = await this.userRepository.find({ relations: { role_id: true }, order: { user_id: 'ASC' } });
        if (!users) {
            throw new common_1.NotFoundException(`No data found`);
        }
        return users;
    }
    async deleteUserById(user_id) {
        const response = await this.userRepository.delete(user_id);
        console.log(response);
        if (response.affected == 0) {
            throw new common_1.NotFoundException(`For your entered ${user_id} no data found`);
        }
    }
    async getUserById(user_id) {
        const user = await this.userRepository.findOne({ where: { user_id: user_id }, relations: { role_id: true } });
        if (!user) {
            throw new common_1.NotFoundException(`For your entered ${user_id} no data found`);
        }
        return user;
    }
    async updateUser(user_id, updateUserDto) {
        const { user_name, mobileNumber, email, role } = updateUserDto;
        const checkUser = await this.getUserById(user_id);
        if (email) {
            let checkEmail = await this.userRepository.findOne({ where: { email: email } });
            if (checkEmail && checkEmail.user_id != user_id)
                throw new common_1.BadRequestException("Your entered email is already taken by another account");
        }
        if (mobileNumber) {
            let checkMobileNumber = await this.userRepository.findOne({ where: { mobileNumber: mobileNumber } });
            if (checkMobileNumber && checkMobileNumber.user_id != user_id)
                throw new common_1.BadRequestException("Your entered mobileNumber is already taken by another account");
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
    async searchUser(search) {
        console.log({ search });
        let allUsers = await this.getAllUsers();
        let data = [];
        if (search) {
            for (const user of allUsers) {
                if (user.user_name.includes(search) || user.email.includes(search)) {
                    data.push(user);
                }
            }
        }
        return data;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(roles_entity_1.Roles)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map