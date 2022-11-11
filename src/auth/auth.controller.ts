import { Controller, Request, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @ApiBody({ type: LoginDto })
    @Post('/signin')
    async loginUser(@Request() req: any) {
        return await this.authService.login(req.body);
    }
}
