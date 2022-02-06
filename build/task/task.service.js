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
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const board_entity_1 = __importDefault(require("../board/board.entity"));
const user_entity_1 = __importDefault(require("../user/user.entity"));
const task_entity_1 = __importDefault(require("./task.entity"));
let TaskService = class TaskService {
    constructor(taskRepository, boardRepository, userRepository) {
        this.taskRepository = taskRepository;
        this.boardRepository = boardRepository;
        this.userRepository = userRepository;
    }
    async create(createTaskDto) {
        if (createTaskDto.boardId) {
            const candidate = await this.boardRepository.findOne({ where: { id: createTaskDto.boardId } });
            if (!candidate)
                throw new common_1.HttpException("Nani boardId", common_1.HttpStatus.NOT_FOUND);
        }
        if (createTaskDto.userId) {
            const candidate = await this.userRepository.findOne({ where: { id: createTaskDto.userId } });
            if (!candidate)
                throw new common_1.HttpException("Nani userId", common_1.HttpStatus.NOT_FOUND);
        }
        const idObj = await this.taskRepository.createQueryBuilder("task")
            .insert()
            .into(task_entity_1.default)
            .values(createTaskDto)
            .execute();
        const result = await this.taskRepository.findOne({ where: { id: idObj.raw[0]?.id } });
        return result;
    }
    async findAll() {
        const result = await this.taskRepository.find();
        return result;
    }
    async findOne(id) {
        const result = await this.taskRepository.findOne(id);
        if (!result)
            throw new common_1.HttpException("Nani", common_1.HttpStatus.NOT_FOUND);
        return result;
    }
    async update(id, updateTaskDto) {
        const candidate = await this.taskRepository.findOne(id);
        if (!candidate)
            throw new common_1.HttpException("Nani", common_1.HttpStatus.NOT_FOUND);
        if (updateTaskDto.boardId) {
            const candidate = await this.boardRepository.findOne({ where: { id: updateTaskDto.boardId } });
            if (!candidate)
                throw new common_1.HttpException("Nani boardId", common_1.HttpStatus.NOT_FOUND);
        }
        if (updateTaskDto.userId) {
            const candidate = await this.userRepository.findOne({ where: { id: updateTaskDto.userId } });
            if (!candidate)
                throw new common_1.HttpException("Nani userId", common_1.HttpStatus.NOT_FOUND);
        }
        await this.taskRepository.update(id, { ...updateTaskDto });
        const sql = this.taskRepository.createQueryBuilder("task")
            .update(task_entity_1.default)
            .set(updateTaskDto)
            .where('id = :id', { id }).getSql();
        return sql;
    }
    async remove(id) {
        const result = await this.taskRepository
            .createQueryBuilder('task')
            .delete()
            .from(task_entity_1.default)
            .where("id = :id", { id })
            .execute();
        return result;
    }
};
TaskService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.default)),
    __param(1, (0, typeorm_1.InjectRepository)(board_entity_1.default)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], TaskService);
exports.TaskService = TaskService;
