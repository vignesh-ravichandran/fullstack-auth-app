import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SigninDto {
  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Password@123',
    description: 'Must be at least 8 characters',
  })
  @IsString()
  @MinLength(8)
  password: string;
}
