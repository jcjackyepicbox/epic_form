import { Router } from 'express';
import formController from '../../controllers/form.controller';

const formRouter = Router();

formRouter.post('/create', formController.insertNewForm);
formRouter.post('/bulk', formController.getBulkForm);
formRouter.post('/setting', formController.insertSetting);
formRouter.put('/field', formController.updateFormFields);
formRouter.get('/:id', formController.getAdminFormDetail.bind(formController));
export default formRouter;
