class SettingDao {
  constructor() {
    this.setting = null;
  }

  async injectDB(conn) {
    if (this.setting) return;
    try {
      this.setting = await conn
        .db(process.env.EPICFORM_DB_NAME)
        .collection('settings');
    } catch (e) {
      console.error(
        `Unable to establish collection handles in settingDao: ${e}`
      );
    }
  }

  async getFormSettings() {
    try {
      const cursor = await this.setting.find({});
      return cursor.toArray();
    } catch (err) {
      console.error(`Error occurred while get form setting data, ${e}`);
      return null;
    }
  }

  async insertSetting(
    type_id,
    type_name,
    icon,
    type_color,
    description,
    appear_once,
    button_text,
    has_answer
  ) {
    try {
      const cursor = await this.setting.insertOne({
        type_id,
        type_name,
        icon,
        type_color,
        description,
        appear_once,
        button_text,
        has_answer,
      });

      return {
        status: true,
        insertedId: cursor.insertedId,
      };
    } catch (err) {
      console.error(`Error occurred while insert new setting data, ${err}`);
      return { error: err.message, code: 100, status: false };
    }
  }
}

const settingDao = new SettingDao();
export default settingDao;
