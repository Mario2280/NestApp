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
exports.TaskController = void 0;
const common_1 = require("@nestjs/common");
const task_service_1 = require("./task.service");
const create_task_dto_1 = require("./dto/create-task.dto");
const update_task_dto_1 = require("./dto/update-task.dto");
const validation_pipe_1 = require("../validation.pipe");
const typeorm_1 = require("@nestjs/typeorm");
const board_entity_1 = __importDefault(require("../board/board.entity"));
const typeorm_2 = require("typeorm");
const jwt_auth_guard_1 = require("../auth/jwt.auth-guard");
let TaskController = class TaskController {
    constructor(taskService, boardRepository) {
        this.taskService = taskService;
        this.boardRepository = boardRepository;
    }
    async create(boardId, createTaskDto) {
        const candidate = await this.boardRepository.findOne(boardId);
        if (!candidate)
            throw new common_1.HttpException("Board doesnt exist", common_1.HttpStatus.NOT_FOUND);
        const result = await this.taskService.create(createTaskDto);
        return result;
    }
    async findAll(boardId) {
        const candidate = await this.boardRepository.findOne(boardId);
        if (!candidate)
            throw new common_1.HttpException("Board doesnt exist", common_1.HttpStatus.NOT_FOUND);
        return await this.taskService.findAll();
    }
    async findOne(boardId, id) {
        const candidate = await this.boardRepository.findOne(boardId);
        if (!candidate)
            throw new common_1.HttpException("Board doesnt exist", common_1.HttpStatus.NOT_FOUND);
        return await this.taskService.findOne(id);
    }
    async update(boardId, id, updateTaskDto) {
        const candidate = await this.boardRepository.findOne(boardId);
        if (!candidate)
            throw new common_1.HttpException("Board doesnt exist", common_1.HttpStatus.NOT_FOUND);
        return await this.taskService.update(id, updateTaskDto);
    }
    async remove(boardId, id) {
        const candidate = await this.boardRepository.findOne(boardId);
        if (!candidate)
            throw new common_1.HttpException("Board doesnt exist", common_1.HttpStatus.NOT_FOUND);
        return await this.taskService.remove(id);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Param)('boardId', new common_1.ParseUUIDPipe({ version: '4' }))),
    __param(1, (0, common_1.Body)(new validation_pipe_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_task_dto_1.CreateTaskDto]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    (0, common_1.Header)('Content-Type', 'application/json'),
    __param(0, (0, common_1.Param)('boardId', new common_1.ParseUUIDPipe({ version: '4' }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(':id'),
    (0, common_1.Header)('Content-Type', 'application/json'),
    __param(0, (0, common_1.Param)('boardId', new common_1.ParseUUIDPipe({ version: '4' }))),
    __param(1, (0, common_1.Param)('id', new common_1.ParseUUIDPipe({ version: '4' }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('boardId', new common_1.ParseUUIDPipe({ version: '4' }))),
    __param(1, (0, common_1.Param)('id', new common_1.ParseUUIDPipe({ version: '4' }))),
    __param(2, (0, common_1.Body)(new validation_pipe_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_task_dto_1.UpdateTaskDto]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('boardId', new common_1.ParseUUIDPipe({ version: '4' }))),
    __param(1, (0, common_1.Param)('id', new common_1.ParseUUIDPipe({ version: '4' }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "remove", null);
TaskController = __decorate([
    (0, common_1.Controller)('boards/:boardId/tasks'),
    __param(1, (0, typeorm_1.InjectRepository)(board_entity_1.default)),
    __metadata("design:paramtypes", [task_service_1.TaskService,
        typeorm_2.Repository])
], TaskController);
exports.TaskController = TaskController;
