import { AuthService } from '../auth.service';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { admin } from '@prisma/client';

@Injectable()
export class UserStrategy extends PassportStrategy(Strategy, 'user') {
    constructor(private authService: AuthService) {
        super({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
        });
    }

    async validate(email: string, password: string): Promise<admin> {
        const user = await this.authService.validateUser(
            email,
            password,
        );

        return user;
    }
}
