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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const createUser_dto_1 = require("../dtos/createUser.dto");
const updateUser_dto_1 = require("../dtos/updateUser.dto");
const user_service_1 = require("./user.service");
let UsersController = class UsersController {
    constructor(userService) {
        this.userService = userService;
    }
    async createUser(response, createUserDto) {
        let data = await this.userService.createUser(createUserDto);
        return response.status(200).send({ statusCode: 200, message: "User created success", data: data });
    }
    async getAllUsers(response) {
        let data = await this.userService.getAllUsers();
        return response.status(200).send({ statusCode: 200, message: "User fetched successfully", data: data });
    }
    async deleteUserById(response, user_id) {
        let data = await this.userService.deleteUserById(user_id);
        return response.status(200).send({ statusCode: 200, message: "User record deleted successfully", data: {} });
    }
    async getUserById(response, user_id) {
        let data = await this.userService.getUserById(user_id);
        return response.status(200).json({ statusCode: 200, message: 'user fetched successfully', data: data });
    }
    async updateUserById(user_id, updateUserDto) {
        return this.userService.updateUser(user_id, updateUserDto);
    }
    async searchUser(response, search) {
        const usersData = await this.userService.searchUser(search);
        return response.status(200).send({ statusCode: 200, message: "user fetched successfully", data: usersData });
    }
};
__decorate([
    (0, common_1.Post)('/createUser'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, createUser_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createUser", null);
__decorate([
    (0, common_1.Get)('/getAllUsers'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Delete)('deleteUser'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUserById", null);
__decorate([
    (0, common_1.Get)('/getUser'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserById", null);
__decorate([
    (0, common_1.Put)('/updateUser'),
    __param(0, (0, common_1.Query)('user_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, updateUser_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUserById", null);
__decorate([
    (0, common_1.Get)('/searchUser'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "searchUser", null);
UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=user.controller.js.map