// auth.repository.ts
import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthRepository {
    private auth = [
        { id: 1, date: '02/03/2024' },
        { id: 2, date: '02/03/2023' }
    ];

    async getAuth() {
        return this.auth;
    }

    async createAuth(item: any) {
        const newAuthItem = { id: this.auth.length + 1, ...item };
        this.auth.push(newAuthItem);
        return newAuthItem;
    }

    async updateAuth(id: number, item: any) {
        const index = this.auth.findIndex(authItem => authItem.id === id);
        if (index === -1) {
            return null; // or throw an exception if needed
        }
        this.auth[index] = { ...this.auth[index], ...item };
        return this.auth[index];
    }

    async deleteAuth(id: number) {
        const index = this.auth.findIndex(authItem => authItem.id === id);
        if (index === -1) {
            return null; // or throw an exception if needed
        }
        const deletedAuthItem = this.auth.splice(index, 1)[0];
        return deletedAuthItem;
    }
}
