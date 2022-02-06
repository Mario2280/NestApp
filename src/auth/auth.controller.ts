import { Body, Controller, Header, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  @Header('Content-Type', 'application/json')
  async login(@Body() userDto: { login: string, password: string }) {
    const result = await this.authService.login(userDto);
    return result;
  }
}
