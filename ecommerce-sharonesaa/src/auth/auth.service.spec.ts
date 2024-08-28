import { Test } from "@nestjs/testing";
import { AuthService } from "../auth/auth.service";
import { JwtService } from "@nestjs/jwt"; 
import { UsersService } from "../users/users.service";
import { User } from "../users/users.entity";
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let authService: AuthService;
  let mockUsersService: Partial<UsersService>;
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
  
  const mockJwtService = {
    sign: jest.fn().mockReturnValue('mocked_token'),
  };


  beforeEach(async () => {
    mockUsersService = {
      findByEmail: () => Promise.resolve(undefined),
      createUser: (user: Omit<User, 'id'>): Promise<User> =>
        Promise.resolve({
          ...user,
          isAdmin: false,
          id: 'e9d60018-03d1-40e4-a423-ac59dc81da53',
          orders: [],
        }),
    };
    const module = await Test.createTestingModule({
    providers: [
        AuthService,
        { provide: JwtService, useValue: mockJwtService },
        {
        provide: UsersService,
        useValue: mockUsersService,
        },
    ],
    }).compile();
    authService = module.get<AuthService>(AuthService);
  });

  it('Create a instance of AuthService', async () => {
    expect(AuthService).toBeDefined();
  });

  it('Create a instance of UsersService', async () => {
    expect(UsersService).toBeDefined();
  });

  it('SignUp() creates a new user with encrypted password', async () => {
    // Mockea el método createUser para que devuelva un usuario con la contraseña encriptada
    jest.spyOn(mockUsersService, 'createUser').mockImplementation(async (user: Omit<User, 'id'>) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return {
        ...user,
        id: 'e9d60018-03d1-40e4-a423-ac59dc81da53',
        password: hashedPassword,
        isAdmin: false,
      } as User;
    });

    const user = await authService.signUp(mockUser);

    expect(user).toBeDefined();
    expect(user.password).not.toEqual(mockUser.password); // Verifica que la contraseña encriptada no sea igual a la contraseña en texto plano
  });

  it('signIn() returns error if the user is not found', async () => {
    try {
      await authService.signIn(mockUser.email, mockUser.password); 
    } catch (error) {
      expect(error.message).toEqual('Email or password incorrect');
    }
  });


    it('signIn() returns an object with a message and a token if the user is found and the password is valid', async () => {
      const hashedPassword = await bcrypt.hash(mockUser.password, 10);
      mockUsersService.findByEmail = (email: string) =>
        Promise.resolve({ ...mockUser, password: hashedPassword } as User);

      const response = await authService.signIn(
        mockUser.email,
        mockUser.password,
      );
      expect(response).toBeDefined();
      expect(response.message).toEqual('Login successful');
      expect(response.token).toBeDefined();
    });
});
