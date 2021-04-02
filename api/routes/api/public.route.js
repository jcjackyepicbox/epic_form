import { Router } from 'express';
import formController from '../../controllers/form.controller';

const publicRouter = Router();

publicRouter.get('/form/:id', formController.getFormDetail);

export default publicRouter;
