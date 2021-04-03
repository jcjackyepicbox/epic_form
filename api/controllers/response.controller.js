import { getClientIP } from '../shared/getConfig';

class ResponseController {
  async storeResponse(req, res) {
    try {
      const { start_time, end_time, form_id, answer } = req.body;
      const clientIp = getClientIP(req);

      res.json({
        status: true,
        data: {
          status: true,
          message: 'csacsacs',
        },
      });
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
