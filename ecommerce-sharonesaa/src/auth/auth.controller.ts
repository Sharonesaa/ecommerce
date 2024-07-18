// auth.controller.ts
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get()
    async getAuth() {
        return this.authService.getAuth();
    }

    @Post()
    async createAuth(@Body() item: any) {
        const authItem = await this.authService.createAuth(item);
        return { id: authItem.id };
    }

    @Put(':id')
    async updateAuth(@Param('id') id: string, @Body() item: any) {
        const authItem = await this.authService.updateAuth(Number(id), item);
        return { id: authItem.id };
    }

    @Delete(':id')
    async deleteAuth(@Param('id') id: string) {
        const deletedAuthItem = await this.authService.deleteAuth(Number(id));
        return { id: deletedAuthItem.id };
    }
}
