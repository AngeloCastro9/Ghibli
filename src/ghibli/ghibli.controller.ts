import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GhibliService } from './ghibli.service';

@ApiBearerAuth()
@ApiTags('Ghibli')
@Controller('ghibli')
export class GhibliController {
    constructor(
        private readonly ghibliService: GhibliService,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async saveMovies() {
        return this.ghibliService.saveMovies();
    }

    @ApiQuery({ name: 'limit', required: true })
    @ApiQuery({ name: 'offset', required: true })
    @UseGuards(JwtAuthGuard)
    @Get('/movies')
    async getMovies(
        @Query('limit') limit: string,
        @Query('offset') offset: string,
    ) {
        return await this.ghibliService.getMovies(Number(limit), Number(offset));
    }
}
