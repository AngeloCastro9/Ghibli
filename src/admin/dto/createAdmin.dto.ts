import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsEmpty,
    IsNotEmpty,
    IsString,
} from 'class-validator';

export default class CreateAdminDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'John Doe' })
    name: string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ example: 'john@doe.com' })
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: '123456789' })
    password: string;

    @IsEmpty()
    createdAt: Date;

}
