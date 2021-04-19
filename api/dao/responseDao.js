import { ObjectId } from 'bson';

class ResponseDao {
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

  async storeResponse(answer, ip, start_time, end_time, form_id, meta_browser) {
    try {
      const cursor = await this.response.insertOne({
        answer,
        client_ip: ip,
        start_time,
        end_time,
        form_id,
        meta_browser,
      });

      return {
        status: true,
        insertedId: cursor.insertedId,
      };
    } catch (err) {
      console.error(`Error occurred while store response data, ${err}`);
      return { error: err.message, code: 100, status: false };
    }
  }

  async getAllResponse(form_id) {
    try {
      const cursor = await this.response.find({ form_id: form_id });
      return cursor.toArray();
    } catch (err) {
      console.error(`Error occurred while get form data, ${err}`);
      return null;
    }
  }
}

const responseDao = new ResponseDao();
export default responseDao;
