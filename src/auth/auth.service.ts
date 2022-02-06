import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from '../user/user.entity';
import bcrypt from 'bcryptjs';
import { JwtService } from "@nestjs/jwt";
@Injectable()
export class AuthService {

    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,
        private jwtService: JwtService) { }

    async login(userDto: { login: string, password: string }) {
        try {
            const candidate = await this.userRepository.findOne({ where: { login: userDto.login } });
            if (!candidate) {
                return `User not found`;
            }
            console.log(candidate);
            const validePassword = bcrypt.compareSync(userDto.password, candidate.password);
            if (!validePassword) {
                throw new UnauthorizedException({ message: `Incorrect password` });
            }
            const accesstoken = this.generateAccessToken({ id: candidate.id, login: candidate.login });
            return { token: accesstoken };
        } catch (error) {
            return <string>error;
        }
    }

    private generateAccessToken(user: { id: string, login: string }) {
        const payload = {
            userId: user.id,
            login: user.login,
        };
        return this.jwtService.sign(payload);
    }

}
