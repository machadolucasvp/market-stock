import { Router } from 'express';
import UserController from './app/controllers/UserController';
import ClientController from './app/controllers/ClientController';
import ClientMiddleware from './app/middlewares/ClientMiddleware';
import SessionController from './app/controllers/SessionController';
import AuthMiddleware from './app/middlewares/AuthMiddleware';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(AuthMiddleware);

routes.get('/users/:id', UserController.show);
routes.put('/users', UserController.update);
routes.delete('/users', UserController.delete);

routes.post('/clients', ClientController.store);
routes.get('/clients/:id', ClientMiddleware, ClientController.show);
routes.put('/clients/:id', ClientMiddleware, ClientController.update);

module.exports = routes;
