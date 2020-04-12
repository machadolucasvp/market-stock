import { Router } from 'express';
import UserController from './app/controllers/UserController';
import UserMiddleware from './app/middlewares/UserMiddleware';
import ClientController from './app/controllers/ClientController';
import ClientMiddleware from './app/middlewares/ClientMiddleware';

const routes = new Router();

routes.post('/users', UserController.store);
routes.get('/users/:id', UserMiddleware, UserController.show);
routes.put('/users/:id', UserMiddleware, UserController.update);
routes.delete('/users/:id', UserMiddleware, UserController.delete);

routes.post('/clients', ClientController.store);
routes.get('/clients/:id', ClientMiddleware, ClientController.show);
routes.put('/clients/:id', ClientMiddleware, ClientController.update);
module.exports = routes;
