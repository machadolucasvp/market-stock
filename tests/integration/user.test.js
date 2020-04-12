import request from 'supertest';
import app from '../../src/app';
import truncate from '../truncate';
import User from '../../src/app/models/User';

describe('User', () => {
  beforeEach(async () => {
    await truncate(['User']);
  });

  const mockUser = () => {
    return {
      name: 'Lucas Machado',
      email: 'machadolucasvp@gmail.com',
      password_hash: '123456',
      status: true,
    };
  };

  it('should create a user', async () => {
    const res = await request(app).post('/users').send(mockUser());

    expect(res.body).toHaveProperty('id');
    expect(res.body).not.toHaveProperty('password_hash', '123456');
    expect(res.body).toMatchObject({
      name: 'Lucas Machado',
      email: 'machadolucasvp@gmail.com',
      status: true,
    });
  });

  it('should retrieve a user', async () => {
    const user = await User.create(mockUser());

    const res = await request(app).get(`/users/${user.dataValues.id}`);

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      id: user.id,
      name: 'Lucas Machado',
      email: 'machadolucasvp@gmail.com',
      status: true,
    });
  });

  it('should update a user', async () => {
    const user = await User.create(mockUser());
    user.name = 'Lucas';
    user.email = 'lucas@gmail.com';

    const res = await request(app).put(`/users/${user.id}`).send(user.toJSON());

    expect(res.status).toBe(200);

    expect(res.body).toMatchObject({
      id: user.id,
      name: 'Lucas',
      email: 'lucas@gmail.com',
    });
  });

  it('should delete a user', async () => {
    const user = await User.create(mockUser());

    const res = await request(app).delete(`/users/${user.id}`);

    expect(res.status).toBe(204);

    expect(res.body).toMatchObject({});
  });

  it('should not create a user', async () => {
    const res = await request(app).post('/users').send({
      name: 'Lucas Machado',
    });

    expect(res.status).toBe(204);
  });

  it('should not retrieve a user', async () => {
    const randomId = Math.floor(Math.random() * 10);

    const res = await request(app).get(`/users/${randomId}`);

    expect(res.status).toBe(204);
    expect(res.body).toMatchObject({
      error: { message: "Can't find requested user, maybe doesn't exists" },
    });
  });

  it('should not update a user', async () => {
    const randomId = Math.floor(Math.random() * 10);

    const res = await request(app).put(`/users/${randomId}`).send(mockUser());

    expect(res.status).toBe(204);
    expect(res.body).toMatchObject({
      error: { message: "Can't find requested user, maybe doesn't exists" },
    });
  });
  it('should not delete a user', async () => {
    const randomId = Math.floor(Math.random() * 10);

    const res = await request(app).delete(`/users/${randomId}`);

    expect(res.status).toBe(204);
    expect(res.body).toMatchObject({
      error: { message: "Can't find requested user, maybe doesn't exists" },
    });
  });
});
