import { Controller, Get, Post, Body, Param, Delete, ParseUUIDPipe, Header, Put } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { ValidationPipe } from '../validation.pipe';

@Controller('boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) { }

  @Post()
  @Header('Content-Type', 'application/json')
  async create(@Body(new ValidationPipe()) createBoardDto: CreateBoardDto) {
    return await this.boardService.create(createBoardDto);
  }

  @Get()
  findAll() {
    return this.boardService.findAll();
  }

  @Get(':id')
  @Header('Content-Type', 'application/json')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.boardService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string, @Body(new ValidationPipe()) updateBoardDto: UpdateBoardDto) {
    return this.boardService.update(id, updateBoardDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.boardService.remove(id);
  }
}
