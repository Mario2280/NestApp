import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import User from './user.entity';
import bcrypt from 'bcryptjs';
@Injectable()
export class UserService {
  
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }
  
  async create(createUserDto: CreateUserDto) {
    createUserDto.password = bcrypt.hashSync(createUserDto.password, 7);
    const result = await this.userRepository.createQueryBuilder("user")
      .insert()
      .into(User)
      .values(createUserDto)
      .execute();
    return result.raw[0]?.id;
  }

  async findAll() {
    const result = await this.userRepository.find();
    return result;
  }

  async findOne(id: string) {
    const result = await this.userRepository.findOne(id);
    if (!result) throw new HttpException("Nani", HttpStatus.NOT_FOUND);
    return result;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const candidate = await this.userRepository.findOne(id);
    if(!candidate) throw new HttpException("Nani", HttpStatus.NOT_FOUND);
    await this.userRepository.update(id, updateUserDto);
    const sql = this.userRepository.createQueryBuilder("user")
    .update(User)
    .set(updateUserDto)
    .where('id = :id', { id }).getSql();
    return sql;
  }

  async remove(id: string) {
    const result = await this.userRepository
      .createQueryBuilder('user')
      .delete()
      .from(User)
      .where("id = :id", { id })
      .execute();
    return result;
  }
}
