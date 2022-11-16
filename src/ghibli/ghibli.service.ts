import { HttpException, Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class GhibliService {
    private readonly api: AxiosInstance;
    constructor(
        private readonly prisma: PrismaService
    ) {
        this.api = axios.create({
            baseURL: process.env.GHIBLI_API,
        })
    }

    async exists(movieTitle: string) {
        return this.prisma.films.findFirst({
            where: {
                title: movieTitle
            }
        })
    }

    async saveMovies() {
        const data = [];
        const response = await this.api.get('/films?limit=200');

        if(response.data.legth === 0)
            throw new HttpException('No data found', 404);

            for (const film of response.data) {
                const exists = await this.exists(film.title)                
                    if (!exists) {                        
                        data.push({
                            title: film.title,
                            originalTitle: film.original_title,
                            description: film.description,
                            lauchDate: film.release_date,
                            score: film.rt_score,
                        })                      
                    }
                await this.prisma.films.createMany({
                    data
                })
            }

        return 'movies saved'
    }

    async getMovies(limit: number, offset: number) {
        return this.prisma.films.findMany({
            take: limit,
            skip: offset,
            orderBy: {
                lauchDate: 'desc'
            }
        });
    }
}
