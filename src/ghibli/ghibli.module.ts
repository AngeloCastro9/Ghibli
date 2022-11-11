import { Module } from '@nestjs/common';
import { GhibliService } from './ghibli.service';
import { GhibliController } from './ghibli.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  providers: [GhibliService, PrismaService],
  controllers: [GhibliController]
})
export class GhibliModule { }
