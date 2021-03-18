import { ObjectId } from 'bson';
class FormDao {
  constructor() {
    this.form = null;
  }

  async injectDB(conn) {
    if (this.form) return;
    try {
      this.form = await conn
        .db(process.env.EPICFORM_DB_NAME)
        .collection('forms');
    } catch (e) {
      console.error(`Unable to establish collection handles in formDao: ${e}`);
    }
  }

  async getBulkForm(form_ids) {
    try {
      const objectedFormIds = form_ids.map((val) => ObjectId(val));
      const cursor = await this.form.find({ _id: { $in: objectedFormIds } });
      return cursor.toArray();
    } catch (err) {
      console.error(`Error occurred while get form data, ${e}`);
      return null;
    }
  }

  async getFormDetail(form_id) {
    try {
      const cursor = await this.form.findOne({ _id: ObjectId(form_id) });
      return cursor;
    } catch (err) {
      console.error(`Error occurred while get form data, ${err}`);
      return null;
    }
  }

  async insertNewForm(formData) {
    try {
      const { title, purpose, fields } = formData.getProperties();
      const cursor = await this.form.insertOne({
        title: title,
        purpose: purpose,
        fields: fields,
      });

      return {
        status: true,
        insertedId: cursor.insertedId,
      };
    } catch (err) {
      console.error(`Error occurred while insert new form data, ${err}`);
      return { error: err.message, code: 100, status: false };
    }
  }

  async updateFormField(form_id, form_fields) {
    try {
      const updatedData = await this.form.updateOne(
        { _id: ObjectId(form_id) },
        {
          $set: {
            fields: form_fields,
          },
        }
      );

      if (updatedData.modifiedCount === 1) {
        return { status: true, message: 'Succesfully update form data' };
      }

      throw new Error(`${updatedData.matchedCount} data updated`);
    } catch (e) {
      console.error(`Error occurred while updating data, ${e}`);
      return { error: e.message, code: 100, status: false };
    }
  }
}

const formDao = new FormDao();
export default formDao;
