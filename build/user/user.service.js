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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = __importDefault(require("./user.entity"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
function toResponse(user) {
    if (user instanceof Array) {
        let withoutPassword = [];
        user.forEach(e => {
            withoutPassword.push({
                id: e.id,
                login: e.login,
                name: e.name
            });
        });
        return withoutPassword;
    }
    if (user instanceof user_entity_1.default)
        return {
            id: user.id,
            login: user.login,
            name: user.name
        };
}
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async create(createUserDto) {
        const candidate = await this.userRepository.findOne({ where: { login: createUserDto.login } });
        if (candidate)
            throw new common_1.HttpException("User already exists", common_1.HttpStatus.CONFLICT);
        createUserDto.password = bcryptjs_1.default.hashSync(createUserDto.password, 7);
        const idObj = await this.userRepository.createQueryBuilder("user")
            .insert()
            .into(user_entity_1.default)
            .values(createUserDto)
            .execute();
        const result = await this.userRepository.findOne({ where: { id: idObj.raw[0]?.id } });
        return toResponse(result);
    }
    async findAll() {
        const result = await this.userRepository.find();
        return toResponse(result);
    }
    async findOne(id) {
        const result = await this.userRepository.findOne(id);
        if (!result)
            throw new common_1.HttpException("Nani", common_1.HttpStatus.NOT_FOUND);
        return toResponse(result);
    }
    async update(id, updateUserDto) {
        const candidate = await this.userRepository.findOne(id);
        if (!candidate)
            throw new common_1.HttpException("Nani", common_1.HttpStatus.NOT_FOUND);
        if (updateUserDto.password) {
            updateUserDto.password = bcryptjs_1.default.hashSync(updateUserDto.password, 7);
        }
        await this.userRepository.update(id, updateUserDto);
        const result = await this.userRepository.findOne(id);
        return result;
    }
    async remove(id) {
        const result = await this.userRepository
            .createQueryBuilder('user')
            .delete()
            .from(user_entity_1.default)
            .where("id = :id", { id })
            .execute();
        return result;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
