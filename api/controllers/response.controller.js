import formDao from '../dao/formDao';
import responseDao from '../dao/responseDao';
import { getClientIP } from '../shared/getConfig';

class ResponseController {
  async storeResponse(req, res) {
    try {
      const { start_time, end_time, form_id, answer } = req.body;
      const clientIp = getClientIP(req);
      const insertData = await responseDao.storeResponse(
        answer,
        clientIp,
        start_time,
        end_time,
        form_id
      );

      if (insertData.status) {
        const { insertedId } = insertData;

        const updatedFormData = await formDao.updateFormResponse(
          form_id,
          insertedId
        );

        if (updatedFormData.status) {
          res.json({
            status: true,
            data: {
              status: true,
              message: 'Successfully submit response',
            },
          });
        } else {
          res.json(updatedFormData);
        }
      } else {
        // Error
        res.json(insertData);
      }
    } catch (err) {
      res.json({
        status: false,
        error: 100,
        message: err.message,
      });
    }
  }
}

const responseController = new ResponseController();
export default responseController;
