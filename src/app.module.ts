import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { AdminController } from './admin/admin.controller';
import { PrismaService } from './database/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth/auth.controller';
import { GhibliModule } from './ghibli/ghibli.module';

@Module({
  imports: [
    AdminModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    GhibliModule,
  ],
  controllers: [AppController, AdminController, AuthController],
  providers: [AppService, PrismaService],
})

export class AppModule { }
