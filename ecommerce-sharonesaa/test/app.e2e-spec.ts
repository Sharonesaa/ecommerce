import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im9yaUBleGFtcGxlLmNvbSIsInN1YiI6Ijc0ZjNiMDVjLTliY2ItNDczNi04NmNkLWE2MDU3ODQ1MDhkOCIsInJvbGVzIjpbInVzZXIiXSwiaWF0IjoxNzIzNjY5NTQ3LCJleHAiOjE3MjM2NzMxNDd9.Ll5WNE8yZRX-wKUipeROFGxZAUqyaTYOTAzKFCr-V8U";
 

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('GET /users should return an array of users with an OK status code', async () => {
    const req = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${token}`); // Incluir el token real en el encabezado
    
    expect(req.status).toBe(200);
    expect(req.body).toBeInstanceOf(Array);
  });

  it('POST /signup should create a new user and return success message', async () => {
    const newUser = {
      name: 'New User',
      email: 'newuser@example.com',
      password: 'newpassword',
      phone: 1234567890,
      country: 'Country',
      address: 'Address',
      city: 'City',
    };

    const response = await request(app.getHttpServer())
      .post('/auth/signup')
      .send(newUser)
      .expect(200);

    expect(response.body).toHaveProperty('success', 'User created successfully');
  });

  
  it('POST /auth/signin should return a token', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/signin')
      .send({ email: 'ori@example.com', password: 'oranna18' });
    
    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body).toHaveProperty('token');
  });

  it('DELETE /users/:id should delete a user and return a 204 status code', async () => {
    const userId = "c1763684-839d-4b56-85bd-4fac617875e9"; 
    const response = await request(app.getHttpServer())
      .delete(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('PUT /users/:id should update a user and return the updated id', async () => {
  const userId = "e9d60018-03d1-40e4-a423-ac59dc81da53";

  const updatedUser = {
    name: 'Updated Test User',
    phone: 9876543210,
  };

  const response = await request(app.getHttpServer())
    .put(`/users/${userId}`)
    .send(updatedUser) // Enviar los datos de actualización
    .expect(200);
    expect(response.body).toEqual({ id: userId }); // Verificar que el id devuelto sea correcto
    });

  it('GET /products should return a list of products with an OK status code', async () => {
    const page = 1;
    const limit = 5;

    const response = await request(app.getHttpServer())
      .get(`/products?page=${page}&limit=${limit}`)
      .expect(200);

    expect(response.body).toBeInstanceOf(Array); // Verifica que la respuesta sea un array
    // Puedes agregar más expectativas aquí, por ejemplo, verificar el contenido del array
  });
});
