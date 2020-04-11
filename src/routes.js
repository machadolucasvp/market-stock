import { Router } from 'express';
import UserController from './app/controllers/UserController';
import UserMiddleware from './app/middlewares/UserMiddleware';

const routes = new Router();

routes.post('/users', UserController.store);
routes.get('/users/:id', UserMiddleware, UserController.show);
routes.put('/users/:id', UserMiddleware, UserController.update);
routes.delete('/users/:id', UserMiddleware, UserController.delete);

module.exports = routes;
