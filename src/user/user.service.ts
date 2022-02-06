import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import User from './user.entity';
import bcrypt from 'bcryptjs';

function toResponse(user: User | User[] | undefined) {
  if (user instanceof Array) {
    const withoutPassword: Array<{ login: string; name: string; id: string }> =
      [];
    user.forEach((e) => {
      withoutPassword.push({
        id: e.id,
        login: e.login,
        name: e.name,
      });
    });
    return withoutPassword;
  }
  if (user instanceof User)
    return {
      id: user.id,
      login: user.login,
      name: user.name,
    };
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const candidate = await this.userRepository.findOne({
      where: { login: createUserDto.login },
    });
    if (candidate)
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    createUserDto.password = bcrypt.hashSync(createUserDto.password, 7);
    const idObj = await this.userRepository
      .createQueryBuilder('user')
      .insert()
      .into(User)
      .values(createUserDto)
      .execute();
    const result = await this.userRepository.findOne({
      where: { id: idObj.raw[0]?.id },
    });
    return toResponse(result);
  }

  async findAll() {
    const result = await this.userRepository.find();
    return toResponse(result);
  }

  async findOne(id: string) {
    const result = await this.userRepository.findOne(id);
    if (!result) throw new HttpException('Nani', HttpStatus.NOT_FOUND);
    return toResponse(result);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const candidate = await this.userRepository.findOne(id);
    if (!candidate) throw new HttpException('Nani', HttpStatus.NOT_FOUND);
    if (updateUserDto.password) {
      updateUserDto.password = bcrypt.hashSync(updateUserDto.password, 7);
    }
    await this.userRepository.update(id, updateUserDto);
    const result = await this.userRepository.findOne(id);
    return result;
  }

  async remove(id: string) {
    const result = await this.userRepository
      .createQueryBuilder('user')
      .delete()
      .from(User)
      .where('id = :id', { id })
      .execute();
    return result;
  }
}
