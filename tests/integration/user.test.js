import request from 'supertest';
import app from '../../src/app';
import truncate from '../truncate';
import User from '../../src/app/models/User';

describe('User', () => {
  beforeEach(async () => {
    await truncate(['User']);
  });

  it('should create a user', async () => {
    const res = await request(app).post('/users').send({
      name: 'Lucas Machado',
      email: 'lucasvufma@gmail.com',
      password_hash: '123456',
      status: true,
    });
    expect(res.body).toHaveProperty('id');
    expect(res.body).not.toHaveProperty('password_hash', '123456');
    expect(res.body).toMatchObject({
      name: 'Lucas Machado',
      email: 'lucasvufma@gmail.com',
      status: true,
    });
  });

  it('should return a user', async () => {
    const user = await User.create({
      name: 'Lucas Machado',
      email: 'lucasvufma@gmail.com',
      password_hash: '123456',
      status: true,
    });
    const res = await request(app).get(`/users/${user.dataValues.id}`);

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      id: user.id,
      name: 'Lucas Machado',
      email: 'lucasvufma@gmail.com',
      status: true,
    });
  });
});
