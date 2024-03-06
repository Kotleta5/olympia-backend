import { Router } from 'express';
import Server from './common/server';
import routes from './routes';
var router = Router();

new Server().router(routes()).listen();

export default router;
