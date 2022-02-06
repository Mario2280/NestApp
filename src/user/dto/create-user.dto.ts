import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  // @IsEmail()
  readonly login: string;

  @IsNotEmpty()
  password: string;
}
