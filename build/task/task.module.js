"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskModule = void 0;
const common_1 = require("@nestjs/common");
const task_service_1 = require("./task.service");
const task_controller_1 = require("./task.controller");
const typeorm_1 = require("@nestjs/typeorm");
const task_entity_1 = __importDefault(require("./task.entity"));
const user_entity_1 = __importDefault(require("../user/user.entity"));
const board_entity_1 = __importDefault(require("../board/board.entity"));
const auth_module_1 = require("../auth/auth.module");
let TaskModule = class TaskModule {
};
TaskModule = __decorate([
    (0, common_1.Module)({
        controllers: [task_controller_1.TaskController],
        providers: [task_service_1.TaskService],
        imports: [typeorm_1.TypeOrmModule.forFeature([task_entity_1.default, user_entity_1.default, board_entity_1.default]), auth_module_1.AuthModule]
    })
], TaskModule);
exports.TaskModule = TaskModule;
