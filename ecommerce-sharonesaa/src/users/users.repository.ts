import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersRepository {
  private users = [
    {
      id: 1,
      email: 'john@example.com',
      name: 'John Doe',
      password: 'J12345',
      address: 'Argentina',
      phone: 1159685241,
      country: 'BA',
      city: 'CABA'
    },
    {
      id: 2,
      email: 'sharon@example.com',
      name: 'Sharon Lopez',
      password: 'slopez',
      address: 'Argentina',
      phone: 1152634178,
      country: 'BA',
      city: 'CABA'
    }
  ];

  async getUsers() {
    return this.users;
  }

  async getById(id: number) {
    return this.users.find(user => user.id === id);
  }

  async createUser(user: any) {
    const newUser = { id: Date.now(), ...user };
    this.users.push(newUser);
    return newUser;
  }

  async updateUser(id: number, user: any) {
    const index = this.users.findIndex(u => u.id === id);
    if (index !== -1) {
      this.users[index] = { id, ...user };
      return this.users[index];
    }
    return null;
  }

  async deleteUser(id: number) {
    const index = this.users.findIndex(u => u.id === id);
    if (index !== -1) {
      const deletedUser = this.users.splice(index, 1);
      return deletedUser[0];
    }
    return null;
  }
}
