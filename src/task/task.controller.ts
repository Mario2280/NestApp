import { Controller, Get, Post, Body, Param, Delete, Put, Header, ParseUUIDPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ValidationPipe } from '../validation.pipe';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Post()
  async create(@Body(new ValidationPipe()) createTaskDto: CreateTaskDto) {
    return await this.taskService.create(createTaskDto);
  }

  @Get()
  async findAll() {
    return await this.taskService.findAll();
  }

  @Get(':id')
  @Header('Content-Type', 'application/json')
  async findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return await this.taskService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string, @Body(new ValidationPipe()) updateTaskDto: UpdateTaskDto) {
    return await this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  async remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return await this.taskService.remove(id);
  }
}
