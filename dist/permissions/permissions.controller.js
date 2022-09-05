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
exports.PermissionsController = void 0;
const common_1 = require("@nestjs/common");
const permissions_service_1 = require("./permissions.service");
const createPermission_dto_1 = require("../dtos/createPermission.dto");
const updatePermission_dto_1 = require("../dtos/updatePermission.dto");
let PermissionsController = class PermissionsController {
    constructor(permissionsService) {
        this.permissionsService = permissionsService;
    }
    async createPermission(response, createPermissionDto) {
        let permissionsData = await this.permissionsService.createPermission(createPermissionDto);
        return response.status(200).send({ status: 200, Message: 'Permissions created successfully', Data: permissionsData });
    }
    async getAllPermissions(response) {
        let permissionsData = await this.permissionsService.getAllPermissions();
        return response.status(200).send({ status: 200, Message: "Permissions fetched succesfully", Data: permissionsData });
    }
    async updatePermissionById(response, permission_id, updatePermissionDto) {
        let data = await this.permissionsService.updatePermission(permission_id, updatePermissionDto);
        return response.status(200).send({ status: 200, Message: "Permissions updated succesfully", Data: data });
    }
    async getPermissionById(response, permission_id) {
        let permissionData = await this.permissionsService.getPermissionById(permission_id);
        return response.status(200).send({ status: 200, Message: 'Permission fetched successfully', Data: permissionData });
    }
    async deletePermissionById(response, permission_id) {
        let data = await this.permissionsService.deletePermissionById(permission_id);
        return response.status(200).send({ statusCode: 200, message: "Permission record deleted successfully", data: {} });
    }
};
__decorate([
    (0, common_1.Post)('/createPermission'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, createPermission_dto_1.CreatePermissionDto]),
    __metadata("design:returntype", Promise)
], PermissionsController.prototype, "createPermission", null);
__decorate([
    (0, common_1.Get)('/getAllPermissions'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PermissionsController.prototype, "getAllPermissions", null);
__decorate([
    (0, common_1.Put)('/updatePermission/:permission_id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('permission_id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, updatePermission_dto_1.UpdatePermissionDto]),
    __metadata("design:returntype", Promise)
], PermissionsController.prototype, "updatePermissionById", null);
__decorate([
    (0, common_1.Get)('/getPermission'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('permission_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], PermissionsController.prototype, "getPermissionById", null);
__decorate([
    (0, common_1.Delete)('/deletePermission'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('permission_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], PermissionsController.prototype, "deletePermissionById", null);
PermissionsController = __decorate([
    (0, common_1.Controller)('permissions'),
    __metadata("design:paramtypes", [permissions_service_1.PermissionsService])
], PermissionsController);
exports.PermissionsController = PermissionsController;
//# sourceMappingURL=permissions.controller.js.map