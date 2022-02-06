/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Header,
  ParseUUIDPipe,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ValidationPipe } from '../validation.pipe';
import Board from '../board/board.entity';
import { JwtAuthGuard } from '../auth/jwt.auth-guard';

@Controller('boards/:boardId/tasks')
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Param('boardId', new ParseUUIDPipe({ version: '4' })) boardId: string,
    @Body(new ValidationPipe()) createTaskDto: CreateTaskDto,
  ) {
    const candidate = await this.boardRepository.findOne(boardId);
    if (!candidate)
      throw new HttpException('Board doesnt exist', HttpStatus.NOT_FOUND);
    const result = await this.taskService.create(createTaskDto);
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @Header('Content-Type', 'application/json')
  async findAll(
    @Param('boardId', new ParseUUIDPipe({ version: '4' })) boardId: string,
  ) {
    const candidate = await this.boardRepository.findOne(boardId);
    if (!candidate)
      throw new HttpException('Board doesnt exist', HttpStatus.NOT_FOUND);
      const result = await this.taskService.findAll();
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @Header('Content-Type', 'application/json')
  async findOne(
    @Param('boardId', new ParseUUIDPipe({ version: '4' })) boardId: string,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    const candidate = await this.boardRepository.findOne(boardId);
    if (!candidate)
      throw new HttpException('Board doesnt exist', HttpStatus.NOT_FOUND);
      const result = await this.taskService.findOne(id);
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('boardId', new ParseUUIDPipe({ version: '4' })) boardId: string,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body(new ValidationPipe()) updateTaskDto: UpdateTaskDto,
  ) {
    const candidate = await this.boardRepository.findOne(boardId);
    if (!candidate)
      throw new HttpException('Board doesnt exist', HttpStatus.NOT_FOUND);
      const result = await this.taskService.update(id, updateTaskDto);
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(
    @Param('boardId', new ParseUUIDPipe({ version: '4' })) boardId: string,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    const candidate = await this.boardRepository.findOne(boardId);
    if (!candidate)
      throw new HttpException('Board doesnt exist', HttpStatus.NOT_FOUND);
      const result = await this.taskService.remove(id);
    return result;
  }
}
