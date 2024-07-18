import { IsEmail, IsOptional, IsString } from 'class-validator';
import { User } from '../entities/user.entity';

export class CreateUserDto extends User {
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  name?: string;
}
