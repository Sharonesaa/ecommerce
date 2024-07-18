import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  getUsers() {
    return this.usersRepository.getUsers();
  }

  getById(id: number) {
    return this.usersRepository.getById(id);
  }

  createUser(user: any) {
    return this.usersRepository.createUser(user);
  }

  updateUser(id: number, user: any) {
    return this.usersRepository.updateUser(id, user);
  }

  deleteUser(id: number) {
    return this.usersRepository.deleteUser(id);
  }
}