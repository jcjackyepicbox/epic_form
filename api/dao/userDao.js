class UserDao {
  constructor() {
    this.user = null;
  }

  async injectDB(conn) {
    if (this.user) return;
    try {
      this.user = await conn
        .db(process.env.EPICFORM_DB_NAME)
        .collection('user');
    } catch (e) {
      console.error(`Unable to establish collection handles in userDao: ${e}`);
    }
  }

  async findUser(provider_id) {
    try {
      const cursor = await this.user.findOne({ provider_id: provider_id });
      return cursor;
    } catch (err) {
      console.error(`Error occurred while logging in user, ${e}`);
      return null;
    }
  }

  async createUser(user) {
    try {
      const {
        provider_id,
        display_name,
        provider,
        email_verified,
        email,
        image,
        workspaces,
      } = user;

      const cursor = await this.user.insertOne({
        provider_id: provider_id,
        display_name: display_name,
        provider: provider,
        email_verified: email_verified,
        email: email,
        image: image,
        workspaces: workspaces,
      });

      return cursor.ops[0];
    } catch (err) {
      console.error(`Error occurred while logging in user, ${e}`);
      return null;
    }
  }

  async loginUser(user) {
    try {
      const userData = await this.findUser(user.provider_id);
      let createdUser;
      if (userData === null) {
        createdUser = await this.createUser(user);
      }

      return userData || createdUser;
    } catch (e) {
      console.error(`Error occurred while logging in user, ${e}`);
      return { error: e };
    }
  }
}

const userDao = new UserDao();
export default userDao;
