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
      password: '123456',
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
    const session = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: user.password });

    const res = await request(app)
      .get(`/users/${user.dataValues.id}`)
      .set('Authorization', `Bearer: ${session.body.token}`);

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
    const session = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: user.password });

    user.name = 'Lucas';
    user.email = 'lucas@gmail.com';

    const res = await request(app)
      .put(`/users`)
      .set('Authorization', `Bearer: ${session.body.token}`)
      .send(user.toJSON());

    expect(res.status).toBe(200);

    expect(res.body).toMatchObject({
      id: user.id,
      name: 'Lucas',
      email: 'lucas@gmail.com',
    });
  });

  it('should delete a user', async () => {
    const user = await User.create(mockUser());
    const session = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: user.password });

    const res = await request(app)
      .delete(`/users`)
      .set('Authorization', `Bearer: ${session.body.token}`);

    expect(res.status).toBe(204);

    expect(res.body).toMatchObject({});
  });

  it('should not create a user', async () => {
    const res = await request(app).post('/users').send({
      name: 'Lucas Machado',
    });

    expect(res.status).toBe(400);
  });

  it('should not retrieve a user', async () => {
    const user = await User.create(mockUser());
    const session = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: user.password });

    const randomId = Math.floor(Math.random() * 10 + 5);

    const res = await request(app)
      .get(`/users/${randomId}`)
      .set('Authorization', `Bearer: ${session.body.token}`);

    expect(res.status).toBe(404);
  });

  it('should not update a user', async () => {
    const user = await User.create(mockUser());
    const session = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: user.password });

    const randomValue = Math.floor(Math.random() * 100);

    const res = await request(app)
      .put(`/users`)
      .send(mockUser())
      .set('Authorization', `Bearer: ${session.body.token + randomValue}`);

    expect(res.status).toBe(401);
    expect(res.body).toMatchObject({
      error: { message: 'Token invalid' },
    });
  });
  it('should not delete a user', async () => {
    const res = await request(app).delete(`/users`);

    expect(res.status).toBe(401);
    expect(res.body).toMatchObject({
      error: { message: 'Token not provided' },
    });
  });
});
