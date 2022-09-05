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
exports.RolesController = void 0;
const common_1 = require("@nestjs/common");
const roles_service_1 = require("./roles.service");
const createRole_dto_1 = require("../dtos/createRole.dto");
const updateRole_dto_1 = require("../dtos/updateRole.dto");
let RolesController = class RolesController {
    constructor(roleService) {
        this.roleService = roleService;
    }
    async createRole(response, createRoleDto) {
        let roleData = await this.roleService.createRole(createRoleDto);
        return response.status(200).send({ statusCode: 200, message: 'Role created successfully', data: roleData });
    }
    async getAllRoles(response) {
        let rolesData = await this.roleService.getRoles();
        return response.status(200).send({ statusCode: 200, message: "Roles fetched succesfully", data: rolesData });
    }
    async updateRole(response, role_id, updateRoleDto) {
        let roleData = await this.roleService.updateRole(role_id, updateRoleDto);
        return response.status(200).send({ statusCode: 200, message: "Roles fetched succesfully", data: roleData });
    }
    async getRoleById(response, role_id) {
        let roleData = await this.roleService.getRoleById(role_id);
        return response.status(200).send({ statusCode: 200, message: "Role fetched successfully", data: roleData });
    }
    async deleteServiceById(response, role_id) {
        const data = await this.roleService.deleteServiceById(role_id);
        return response.status(200).send({ statusCode: 200, message: "Role deleted successfully", data: {} });
    }
};
__decorate([
    (0, common_1.Post)('/createRole'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, createRole_dto_1.CreateRoleDto]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "createRole", null);
__decorate([
    (0, common_1.Get)('/getAllRoles'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "getAllRoles", null);
__decorate([
    (0, common_1.Put)('/updateRole'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('role_id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, updateRole_dto_1.UpdateRoleDto]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "updateRole", null);
__decorate([
    (0, common_1.Get)('/getRole'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('role_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "getRoleById", null);
__decorate([
    (0, common_1.Delete)('/deleteRole'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('role_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "deleteServiceById", null);
RolesController = __decorate([
    (0, common_1.Controller)('roles'),
    __metadata("design:paramtypes", [roles_service_1.RoleService])
], RolesController);
exports.RolesController = RolesController;
//# sourceMappingURL=roles.controller.js.map