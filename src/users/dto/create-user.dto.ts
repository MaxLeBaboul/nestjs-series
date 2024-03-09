import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Role } from '../constant/enum.constant';

export class CreateUserDto implements Readonly<CreateUserDto> {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsEnum({ enum: Role, default: Role.INTERN })
  @IsNotEmpty()
  role: string;
}
