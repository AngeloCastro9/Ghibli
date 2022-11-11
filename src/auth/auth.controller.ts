import { Controller, Request, Post, Body } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @ApiBody({ type: LoginDto })
    @Post('/signin')
    async loginUser(
        @Body() loginDto: LoginDto,
    ) {
        return await this.authService.login(loginDto);
    }
}
