// src/Routes/Routes.ts

import { Router } from 'express';
import TransferController from '../Controllers/TransferController';

const routes = Router();

routes.post(
  '/transfer',
  (req, res, next) => new TransferController(req, res, next).create(),
);

routes.patch(
  '/transfer/:id',
  (req, res, next) => new TransferController(req, res, next).undo(),
);

routes.get(
  '/transfer',
  (req, res, next) => new TransferController(req, res, next).list(),
);

routes.get(
  '/transfer/:key',
  (req, res, next) => new TransferController(req, res, next).listByKey(),
);

export default routes;