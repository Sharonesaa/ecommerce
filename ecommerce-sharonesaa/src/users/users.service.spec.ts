import { Test } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { User } from "./users.entity";
import { CreateUserDto } from "./CreateUser.dto";
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UsersService', () => {
  let usersService: UsersService;
  let mockUsersRepository: Partial<Repository<User>>;

  const mockUser: Omit<User, 'id'> = {
    name: "Sharon Lopez",
    email: "sharon@example.com",
    password: "slopez",
    phone: 1152634178,
    country: "BA",
    address: "Argentina",
    city: "CABA",
    orders: [],
    isAdmin: false
  };

  const mockUserWithId: User = {
    ...mockUser,
    id: 'e9d60018-03d1-40e4-a423-ac59dc81da53',
  };

  beforeEach(async () => {
    mockUsersRepository = {
      findOne: jest.fn().mockImplementation(async (options) => {
        if (options.where.id === 'e9d60018-03d1-40e4-a423-ac59dc81da53') {
          return { ...mockUserWithId, relations: options.relations } as User;
        }
        return undefined;
      }),
      create: jest.fn().mockImplementation((user: CreateUserDto) => ({
        ...user,
        id: 'e9d60018-03d1-40e4-a423-ac59dc81da53',
      })),
      save: jest.fn().mockImplementation(async (user: User) => user),
      find: jest.fn().mockResolvedValue([mockUserWithId]),
      findOneBy: jest.fn().mockImplementation(async (options) => {
        if (options.id === 'e9d60018-03d1-40e4-a423-ac59dc81da53') {
          return { ...mockUserWithId, id: options.id } as User;
        }
        return undefined;
      }),
      delete: jest.fn().mockResolvedValue(undefined),
      update: jest.fn().mockImplementation(async (id: string, update: Partial<CreateUserDto>) => {
        return {
          ...mockUserWithId,
          id,
          ...update,
        } as User;
      }),
    };

    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });

  it('Create an instance of UsersService', () => {
    expect(usersService).toBeDefined();
  });

  it('createUser() should create a new user', async () => {
    const createUserDto: CreateUserDto = {
      name: "Sharon Lopez",
      email: "sharon@example.com",
      password: "slopez",
      phone: 1152634178,
      country: "BA",
      address: "Argentina",
      city: "CABA",
      isAdmin: false,
    };

    const user = await usersService.createUser(createUserDto);

    expect(user).toBeDefined();
    expect(user.id).toBe('e9d60018-03d1-40e4-a423-ac59dc81da53');
    expect(user.password).toEqual(createUserDto.password);
  });

  it('getById() should return a user by id', async () => {
    const user = await usersService.getById('e9d60018-03d1-40e4-a423-ac59dc81da53');

    expect(user).toBeDefined();
    expect(user.id).toEqual('e9d60018-03d1-40e4-a423-ac59dc81da53');
    expect(user.email).toEqual(mockUser.email);
  });

//   it('findByEmail() should return a user by email', async () => {
//     const user = await usersService.findByEmail(mockUser.email);

//     expect(user).toBeDefined();
//     expect(user.email).toEqual(mockUser.email);
//   });

//   it('updateUser() should update an existing user', async () => {
//     const updateUserDto: CreateUserDto = {
//       ...mockUserWithId,
//       phone: 1234567890,
//     };

//     const updatedUser = await usersService.updateUser('e9d60018-03d1-40e4-a423-ac59dc81da53', updateUserDto);

//     expect(updatedUser).toBeDefined();
//     expect(updatedUser.phone).toBe(1234567890);
//     expect(mockUsersRepository.update).toHaveBeenCalledWith('e9d60018-03d1-40e4-a423-ac59dc81da53', {
//       ...updateUserDto,
//       phone: Number(updateUserDto.phone),
//     });
//   });

  it('deleteUser() should delete a user', async () => {
    await usersService.deleteUser('e9d60018-03d1-40e4-a423-ac59dc81da53');

    expect(mockUsersRepository.delete).toHaveBeenCalledWith('e9d60018-03d1-40e4-a423-ac59dc81da53');
  });
});
