import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
    @IsNotEmpty()
    @ApiProperty({ example: 'john@doe.com' })
    email: string;

    @IsNotEmpty()
    @ApiProperty({ example: '123456789' })
    password: string;
}
