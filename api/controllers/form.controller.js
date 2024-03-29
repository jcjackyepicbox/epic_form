import { verifyTokenSync } from '../shared/jwt';
import formDao from '../dao/formDao';
import settingDao from '../dao/settingDao';
import userDao from '../dao/userDao';
import FormModel from '../models/form.model';
import responseDao from '../dao/responseDao';

class FormController {
  async insertNewForm(req, res) {
    try {
      const { title, purpose, workspace_id } = req.body;
      const { userId } = await verifyTokenSync(
        req.cookies.auth,
        process.env.SESSION_COOKIE_SECRET
      );

      const formModel = new FormModel();
      formModel.createDefaultForm(title, purpose);

      const insertedData = await formDao.insertNewForm(formModel);

      if (insertedData.status) {
        const { insertedId } = insertedData;

        const updatedWorkspaceData = await userDao.updateFormWorkspace(
          insertedId,
          workspace_id,
          userId
        );

        if (updatedWorkspaceData.status) {
          res.json({
            status: true,
            data: {
              status: true,
              message: 'Successfully insert form',
            },
          });
        } else {
          res.json(updatedWorkspaceData);
        }
      } else {
        res.json(insertedData);
      }
    } catch (err) {
      res.json({
        status: false,
        error: 100,
        message: err.message,
      });
    }
  }

  async getBulkForm(req, res) {
    try {
      const { form_ids } = req.body;
      const formsData = await formDao.getBulkForm(form_ids);

      if (formsData) {
        res.json({
          status: true,
          data: formsData,
        });
      } else {
        res.json({
          status: false,
          error: 'Something went wrong',
          code: 100,
        });
      }
    } catch (err) {
      res.json({
        status: false,
        error: 100,
        message: err.message,
      });
    }
  }

  async getPublicFormDetail(req, res) {
    try {
      const form_id = req.params.id;
      const formData = await formDao.getFormDetail(form_id);

      if (formData) {
        res.json({
          status: true,
          data: { formData },
        });
      } else {
        res.json({
          status: false,
          error: 'Something went wrong',
          code: 100,
        });
      }
    } catch (err) {
      res.json({
        status: false,
        error: 100,
        message: err.message,
      });
    }
  }

  getAnswerField(formResponse) {
    const formResponseField = {};

    formResponse.forEach((val) => {
      const { answer } = val;
      answer.forEach((answerVal) => {
        if (formResponseField[answerVal.field_id]) {
          formResponseField[answerVal.field_id].push(answerVal);
        } else {
          formResponseField[answerVal.field_id] = [answerVal];
        }
      });
    });
    return formResponseField;
  }

  async getAdminFormDetail(req, res) {
    try {
      const form_id = req.params.id;
      const formData = await formDao.getFormDetail(form_id);
      const formSetting = await settingDao.getFormSettings();
      const formResponse = await responseDao.getAllResponse(form_id);

      const formResponseByField = this.getAnswerField(formResponse);

      if (formData && formSetting) {
        res.json({
          status: true,
          data: { formData, formSetting, formResponse, formResponseByField },
        });
      } else {
        res.json({
          status: false,
          error: 'Something went wrong',
          code: 100,
        });
      }
    } catch (err) {
      res.json({
        status: false,
        error: 100,
        message: err.message,
      });
    }
  }

  async insertSetting(req, res) {
    try {
      const {
        type_id,
        type_name,
        type_image,
        icon,
        type_color,
        description,
        appear_once,
        button_text,
        has_answer,
        type_desc,
      } = req.body;

      const insertData = await settingDao.insertSetting(
        type_id,
        type_name,
        icon,
        type_color,
        description,
        appear_once,
        button_text,
        has_answer,
        type_image,
        type_desc
      );

      if (insertData.status) {
        res.json({
          status: true,
          data: insertData,
        });
      } else {
        // Error
        res.json(insertData);
      }
    } catch (err) {
      res.json(err);
    }
  }

  async updateFormFields(req, res) {
    try {
      const { form_id, fields } = req.body;

      const updatedData = await formDao.updateFormField(form_id, fields);

      if (updatedData.status) {
        res.json({
          status: true,
          data: updatedData,
        });
      } else {
        res.json(updatedData);
      }
    } catch (err) {
      res.json(err);
    }
  }
}

const formController = new FormController();
export default formController;
