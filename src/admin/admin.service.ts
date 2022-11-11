import { BadRequestException, Injectable, NotAcceptableException } from '@nestjs/common';
import { admin, Prisma } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class AdminService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async create(data: Prisma.adminCreateInput): Promise<admin> {
        const admin = await this.prisma.admin.findUnique({
            where: {
                email: data.email,
            },
        });

        if (admin) {
            throw new BadRequestException(
                'User already exists',
            );
        }

        const adminCreated = await this.prisma.admin.create({ data });
        delete adminCreated.password;

        return adminCreated;
    }

    async readOne(id: string): Promise<admin> {
        const admin = await this.prisma.admin.findUnique({
            where: {
                id
            },
        });

        if (!admin) {
            throw new BadRequestException(
                'User already exists',
            );
        }

        return admin;
    }

    async update(data: Prisma.adminUpdateInput, id: string): Promise<admin> {
        const admin = await this.prisma.admin.findUnique({
            where: {
                id
            },
        });

        if (!admin) {
            throw new BadRequestException(
                'User not found',
            );
        }

        const adminUpdated = await this.prisma.admin.update({
            where: {
                id
            },
            data
        });

        delete adminUpdated.password;

        return adminUpdated;
    }

    async disable(id: string): Promise<admin> {
        const admin = await this.prisma.admin.findUnique({
            where: {
                id
            },
        });

        if (!admin) {
            throw new BadRequestException(
                'User not found',
            );
        }

        const adminDisabled = await this.prisma.admin.update({
            where: {
                id
            },
            data: {
                status: 'Block'
            }
        });

        delete adminDisabled.password;

        return adminDisabled;
    }

    async enable(id: string): Promise<admin> {
        const admin = await this.prisma.admin.findUnique({
            where: {
                id
            },
        });

        if (!admin) {
            throw new BadRequestException(
                'Admin not found',
            );
        }

        if (admin.status === 'Activate') {
            throw new NotAcceptableException(
                'Admin already activate'
            )
        }

        const adminDisabled = await this.prisma.admin.update({
            where: {
                id
            },
            data: {
                status: 'Activate'
            }
        });

        delete adminDisabled.password;

        return adminDisabled;
    }
}
