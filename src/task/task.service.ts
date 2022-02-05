import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Board from '../board/board.entity';
import User from '../user/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import Task from './task.entity';

@Injectable()
export class TaskService {

  constructor(@InjectRepository(Task) private readonly taskRepository: Repository<Task>,
              @InjectRepository(Board) private readonly boardRepository: Repository<Board>,
              @InjectRepository(User) private readonly userRepository: Repository<User>) { }

  async create(createTaskDto: CreateTaskDto) {
    const result = await this.taskRepository.createQueryBuilder("task")
      .insert()
      .into(Task)
      .values(createTaskDto)
      .execute();
    return result.raw[0]?.id;
  }

  async findAll() {
    const result = await this.taskRepository.find();
    return result;
  }

  async findOne(id: string) {
    const result = await this.taskRepository.findOne(id);
    if (!result) throw new HttpException("Nani", HttpStatus.NOT_FOUND);
    return result;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const candidate = await this.taskRepository.findOne(id);
    if (!candidate) throw new HttpException("Nani", HttpStatus.NOT_FOUND);
    if (updateTaskDto.boardId) {
      const candidate = await this.boardRepository.findOne({where:{id: updateTaskDto.boardId}});
      if(!candidate) throw new HttpException("Nani boardId", HttpStatus.NOT_FOUND);
    }
    if (updateTaskDto.userId) {
      const candidate = await this.userRepository.findOne({where:{id: updateTaskDto.userId}});
      if(!candidate) throw new HttpException("Nani userId", HttpStatus.NOT_FOUND);
    }
    await this.taskRepository.update(id, updateTaskDto);
    const sql = this.taskRepository.createQueryBuilder("task")
      .update(Task)
      .set(updateTaskDto)
      .where('id = :id', { id }).getSql();
    return sql;
  }

  async remove(id: string) {
    const result = await this.taskRepository
      .createQueryBuilder('task')
      .delete()
      .from(Task)
      .where("id = :id", { id })
      .execute();
    return result;
  }
}
