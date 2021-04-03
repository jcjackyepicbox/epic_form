import { ObjectId } from 'bson';

class ResponseDa {
  constructor() {
    this.response = null;
  }

  async injectDB(conn) {
    if (this.response) return;
    try {
      this.response = await conn
        .db(process.env.EPICFORM_DB_NAME)
        .collection('responses');
    } catch (e) {
      console.error(
        `Unable to establish collection handles in responseDao: ${e}`
      );
    }
  }

  async storeResponse(answer, ip, start_time, end_time, form_id) {
    try {
      return null;
    } catch (err) {
      console.error(`Error occurred while get form data, ${e}`);
      return null;
    }
  }
}

const formDao = new FormDao();
export default formDao;
