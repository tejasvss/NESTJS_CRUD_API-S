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
exports.RoleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const roles_entity_1 = require("../entities/roles.entity");
const typeorm_2 = require("typeorm");
const permissions_entity_1 = require("../entities/permissions.entity");
const user_entity_1 = require("../entities/user.entity");
let RoleService = class RoleService {
    constructor(roleRepository, permissionRepository, userRepository) {
        this.roleRepository = roleRepository;
        this.permissionRepository = permissionRepository;
        this.userRepository = userRepository;
    }
    async createRole(createRoleDto) {
        let { permission_Ids, role_name } = createRoleDto;
        let checkRole = await this.roleRepository.findOne({ where: { role_name: role_name } });
        if (checkRole)
            throw new common_1.BadRequestException("Your entered role_name is already taken.Try another");
        let permissionData = await this.permissionRepository.find({ where: { permission_id: (0, typeorm_2.In)(permission_Ids) } });
        console.log("permissionData", permissionData);
        let data = createRoleDto;
        data.permissions = permissionData;
        const newRole = await this.roleRepository.create(createRoleDto);
        const roles = await this.roleRepository.save(newRole);
        return roles;
    }
    async getRoles() {
        const rolesData = await this.roleRepository.find({ order: { role_id: 'ASC' } });
        return rolesData;
    }
    async getRoleById(role_id) {
        const rolesData = await this.roleRepository.findOne({ where: { role_id: role_id } });
        if (!rolesData) {
            throw new common_1.NotFoundException(`For your entered role_id ${role_id}.No data found`);
        }
        return rolesData;
    }
    async updateRole(role_id, updateRoleDto) {
        const { role_name, role_description, permission_Ids } = updateRoleDto;
        const checkRole = await this.getRoleById(role_id);
        let permissionData = await this.permissionRepository.find({ where: { permission_id: (0, typeorm_2.In)(permission_Ids) } });
        if (!permissionData.length)
            throw new common_1.BadRequestException("No permissions found for permissions_Ids");
        if (role_name) {
            let checkRoleName = await this.roleRepository.findOne({ where: { role_name: role_name } });
            if (checkRoleName && checkRoleName.role_id != role_id) {
                throw new common_1.BadRequestException("Your entered role_name is already taken by another role_id");
            }
        }
        checkRole.permissions = permissionData;
        checkRole.role_name = role_name;
        checkRole.role_description = role_description;
        await this.roleRepository.save(checkRole);
        return await this.getRoleById(role_id);
    }
    async deleteServiceById(role_id) {
        let usersData = await this.userRepository.find({ where: { role_id } });
        usersData = JSON.parse(JSON.stringify(usersData));
        let modifyData = await Promise.all(usersData.map(async (user) => {
            user.role_id = null;
            user = await this.userRepository.save(user);
            console.log({ user });
            return user;
        }));
        const response = await this.roleRepository.delete(role_id);
        console.log(response);
        if (response.affected == 0) {
            throw new common_1.NotFoundException(`For your entered role_id: ${role_id} no data found`);
        }
    }
};
RoleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(roles_entity_1.Roles)),
    __param(1, (0, typeorm_1.InjectRepository)(permissions_entity_1.Permissions)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], RoleService);
exports.RoleService = RoleService;
//# sourceMappingURL=roles.service.js.map