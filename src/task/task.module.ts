import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import Task from './task.entity';
import User from '../user/user.entity';
import Board from '../board/board.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
  imports: [TypeOrmModule.forFeature([Task, User, Board]), AuthModule],
})
export class TaskModule {}
