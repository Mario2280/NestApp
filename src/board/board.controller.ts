import { Controller, Get, Post, Body, Param, Delete, ParseUUIDPipe, Header, Put, HttpCode, UseGuards } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { ValidationPipe } from '../validation.pipe';
import { JwtAuthGuard } from '../auth/jwt.auth-guard';

@Controller('boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) { }
  @UseGuards(JwtAuthGuard)
  @Post()
  @Header('Content-Type', 'application/json')
  async create(@Body(new ValidationPipe()) createBoardDto: CreateBoardDto) {
    return await this.boardService.create(createBoardDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return await this.boardService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @Header('Content-Type', 'application/json')
  async findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return await this.boardService.findOne(id);
  }
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @Header('Content-Type', 'application/json')
  async update(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string, @Body(new ValidationPipe()) updateBoardDto: UpdateBoardDto) {
    return await this.boardService.update(id, updateBoardDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return await this.boardService.remove(id);
  }
}
