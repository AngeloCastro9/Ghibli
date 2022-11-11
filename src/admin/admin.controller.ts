import { Body, Controller, Get, HttpStatus, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { AdminService } from "./admin.service";
import CreateAdminDto from "./dto/createAdmin.dto";
import UpdateAdminDto from "./dto/updateAdmin.dto";
import { ParseCreateAdminPipe } from "./pipes/parseAdmin.pipe";

@ApiBearerAuth()
@ApiTags('Admin')
@Controller('admin')
export class AdminController {
    constructor(private adminService: AdminService) { }

    @Post('/')
    @ApiBody({ type: CreateAdminDto })
    async create(
        @Body(new ParseCreateAdminPipe()) data: CreateAdminDto
    ) {
        return {
            statusCode: HttpStatus.CREATED,
            message: 'Admin created!',
            data: await this.adminService.create(data)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    @ApiParam({ name: 'id', required: true })
    async readOne(
        @Param('id') id: string,
    ) {
        return {
            statusCode: HttpStatus.OK,
            message: 'Admin returned!',
            data: await this.adminService.readOne(id)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put('/:id')
    @ApiBody({ type: UpdateAdminDto })
    @ApiParam({ name: 'id', required: true })
    async update(
        @Body(new ParseCreateAdminPipe()) data: UpdateAdminDto,
        @Param('id') id: string,
    ) {
        return {
            statusCode: HttpStatus.OK,
            message: 'Admin updated!',
            data: await this.adminService.update(data, id)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put('/disable/:id')
    @ApiParam({ name: 'id', required: true })
    async disable(
        @Param('id') id: string,
    ) {
        return {
            statusCode: HttpStatus.OK,
            message: 'Admin disabled!',
            data: await this.adminService.disable(id)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put('/enable/:id')
    @ApiParam({ name: 'id', required: true })
    async enable(
        @Param('id') id: string,
    ) {
        return {
            statusCode: HttpStatus.OK,
            message: 'Admin enabled!',
            data: await this.adminService.enable(id)
        }
    }
}