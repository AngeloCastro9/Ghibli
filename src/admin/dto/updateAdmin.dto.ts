import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsEmpty,
    IsOptional,
    IsString,
} from 'class-validator';

export default class UpdateAdminDto {

    @IsString()
    @IsOptional()
    @ApiProperty({ example: 'John Doe Updated' })
    name: string;

    @IsEmail()
    @IsOptional()
    @ApiProperty({ example: 'doe@john.com' })
    email: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ example: '123456789' })
    password: string;

}
