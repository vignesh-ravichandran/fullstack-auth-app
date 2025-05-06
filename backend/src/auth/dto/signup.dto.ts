import { IsEmail, IsNotEmpty, IsString, MinLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignupDto {
  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Password@123',
    description: 'Min 8 characters, must contain one letter, one number, and one special character',
  })
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message: 'Password must contain at least 1 letter, 1 number and 1 special character',
  })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{8,}$/, {
    message:
      'Password too weak. Must include at least one letter, one number, and one special character.',
  })
  password: string;
}
