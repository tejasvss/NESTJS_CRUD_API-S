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
exports.PermissionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const permissions_entity_1 = require("../entities/permissions.entity");
const typeorm_2 = require("typeorm");
let PermissionsService = class PermissionsService {
    constructor(permissionsRepository) {
        this.permissionsRepository = permissionsRepository;
    }
    async createPermission(createPermissionDto) {
        let { permission_name } = createPermissionDto;
        let checkPermission = await this.permissionsRepository.findOne({ where: { permission_name: permission_name } });
        if (checkPermission)
            throw new common_1.BadRequestException("Your entered permission name is already exists.Try another");
        const newPermission = await this.permissionsRepository.create(createPermissionDto);
        const permission = this.permissionsRepository.save(newPermission);
        return permission;
    }
    async getAllPermissions() {
        const permissionsData = await this.permissionsRepository.find({ order: { permission_id: 'ASC' } });
        return permissionsData;
    }
    async getPermissionById(permission_id) {
        const permissionData = await this.permissionsRepository.findOne({ where: { permission_id: permission_id } });
        if (!permissionData) {
            throw new common_1.NotFoundException(`For your entered ${permission_id} permission_id no data found`);
        }
        return permissionData;
    }
    async updatePermission(permission_id, updatePermissionDto) {
        const { permission_name, permission_description } = updatePermissionDto;
        const checkPermission = await this.getPermissionById(permission_id);
        let checkPermissionName = await this.permissionsRepository.findOne({ where: { permission_name: permission_name } });
        if (checkPermissionName && checkPermissionName.permission_id != permission_id) {
            throw new common_1.BadRequestException("Your entered permission name is already taken.Try another");
        }
        checkPermission.permission_name = permission_name;
        checkPermission.permission_description = permission_description;
        await this.permissionsRepository.save(checkPermission);
        return checkPermission;
    }
    async deletePermissionById(permission_id) {
        const response = await this.permissionsRepository.delete(permission_id);
        console.log(response);
        if (response.affected == 0) {
            throw new common_1.NotFoundException(`For your entered permission_id: ${permission_id} no data found`);
        }
    }
};
PermissionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(permissions_entity_1.Permissions)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PermissionsService);
exports.PermissionsService = PermissionsService;
//# sourceMappingURL=permissions.service.js.map