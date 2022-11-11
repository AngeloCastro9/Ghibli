import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class GhibliService {
    private readonly api: AxiosInstance;
    constructor(
        private readonly prisma: PrismaService
    ) {
        console.log(axios)
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
        this.api.get('/films?limit=200').then(async (response) => {
            for (const film of response.data) {
                this.exists(film.title).then(async (exists) => {
                    if (!exists) {
                        await this.prisma.films.create({
                            data: {
                                title: film.title,
                                originalTitle: film.original_title,
                                description: film.description,
                                lauchDate: film.release_date,
                                score: film.rt_score,
                            }
                        })
                    }
                })
            }
        });

        return 'movies saved'
    }

    async getMovies(limit: number, offset: number) {
        const films = await this.prisma.films.findMany({
            take: limit,
            skip: offset,
            orderBy: {
                lauchDate: 'desc'
            }
        });

        return films;
    }
}
