import { Router } from 'express';
import formController from '../../controllers/form.controller';
import responseController from '../../controllers/response.controller';

const publicRouter = Router();

publicRouter.get('/form/:id', formController.getFormDetail);
publicRouter.post('/response', responseController.storeResponse);

export default publicRouter;
