import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { InjectRepository } from '@nestjs/typeorm';
import { timingSafeEqual } from 'crypto';
import { Repository } from 'typeorm';
import Board from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}
  async create(createBoardDto: CreateBoardDto) {
    const idObj = await this.boardRepository
      .createQueryBuilder('board')
      .insert()
      .into(Board)
      .values(createBoardDto)
      .execute();
    const result = await this.boardRepository.findOne({
      where: { id: idObj.raw[0]?.id },
    });
    return result;
  }

  async findAll() {
    const result = await this.boardRepository.find();
    return result;
  }

  async findOne(id: string) {
    const result = await this.boardRepository.findOne(id);
    if (!result) throw new HttpException('Nani', HttpStatus.NOT_FOUND);
    return result;
  }

  async update(id: string, updateBoardDto: UpdateBoardDto) {
    const candidate = await this.boardRepository.findOne(id);
    if (!candidate) throw new HttpException('Nani', HttpStatus.NOT_FOUND);
    await this.boardRepository.update(id, { ...updateBoardDto });
    return { message: `Updated` };
  }

  async remove(id: string) {
    await this.boardRepository
      .createQueryBuilder('board')
      .delete()
      .from(Board)
      .where('id = :id', { id })
      .execute();
    return { message: `Deleted` };
  }
}
