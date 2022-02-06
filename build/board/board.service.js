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
exports.BoardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const board_entity_1 = __importDefault(require("./board.entity"));
let BoardService = class BoardService {
    constructor(boardRepository) {
        this.boardRepository = boardRepository;
    }
    async create(createBoardDto) {
        const idObj = await this.boardRepository.createQueryBuilder("board")
            .insert()
            .into(board_entity_1.default)
            .values(createBoardDto)
            .execute();
        const result = await this.boardRepository.findOne({ where: { id: idObj.raw[0]?.id } });
        return result;
    }
    async findAll() {
        const result = await this.boardRepository.find();
        return result;
    }
    async findOne(id) {
        const result = await this.boardRepository.findOne(id);
        if (!result)
            throw new common_1.HttpException("Nani", common_1.HttpStatus.NOT_FOUND);
        return result;
    }
    async update(id, updateBoardDto) {
        const candidate = await this.boardRepository.findOne(id);
        if (!candidate)
            throw new common_1.HttpException("Nani", common_1.HttpStatus.NOT_FOUND);
        await this.boardRepository.update(id, { ...updateBoardDto });
        return { message: `Updated` };
    }
    async remove(id) {
        await this.boardRepository
            .createQueryBuilder('board')
            .delete()
            .from(board_entity_1.default)
            .where("id = :id", { id })
            .execute();
        return { message: `Deleted` };
    }
};
BoardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(board_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BoardService);
exports.BoardService = BoardService;
