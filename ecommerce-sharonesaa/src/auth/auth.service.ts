// auth.service.ts
import { Injectable } from "@nestjs/common";
import { AuthRepository } from "./auth.repository";

@Injectable()
export class AuthService {
    constructor(private readonly authRepository: AuthRepository) {}

    async getAuth() {
        return this.authRepository.getAuth();
    }

    async createAuth(item: any) {
        return this.authRepository.createAuth(item);
    }

    async updateAuth(id: number, item: any) {
        return this.authRepository.updateAuth(id, item);
    }

    async deleteAuth(id: number) {
        return this.authRepository.deleteAuth(id);
    }
}
