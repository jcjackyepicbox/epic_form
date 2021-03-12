import { ObjectId } from 'bson';
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

  async insertWorkspace(workspaceData, provider_id) {
    try {
      const updatedData = await this.user.updateOne(
        { provider_id: provider_id },
        {
          $push: {
            workspaces: workspaceData,
          },
        }
      );

      if (updatedData.modifiedCount === 1) {
        return { status: true, message: 'Succesfully insert workspace' };
      }

      throw new Error(`${updatedData.matchedCount} data updated`);
    } catch (e) {
      console.error(`Error occurred while updating data, ${e}`);
      return { error: e.message, code: 100, status: false };
    }
  }

  async updateTitleWorkspace(title, workspace_id, provider_id) {
    try {
      const updatedData = await this.user.updateOne(
        { provider_id: provider_id, 'workspaces._id': ObjectId(workspace_id) },
        {
          $set: {
            'workspaces.$.workspace_name': title,
          },
        }
      );

      if (updatedData.modifiedCount === 1) {
        return { status: true, message: 'Succesfully update workspace' };
      }

      throw new Error(`${updatedData.matchedCount} data updated`);
    } catch (e) {
      console.error(`Error occurred while updating data, ${e}`);
      return { error: e.message, code: 100, status: false };
    }
  }

  async removeWorkspace(workspace_id, provider_id) {
    try {
      const deletedData = await this.user.updateOne(
        { provider_id: provider_id },
        {
          $pull: {
            workspaces: {
              _id: ObjectId(workspace_id),
            },
          },
        }
      );

      if (deletedData.modifiedCount === 1) {
        return { status: true, message: 'Succesfully delete workspace' };
      }

      throw new Error(`${updatedData.matchedCount} data deleted`);
    } catch (e) {
      console.error(`Error occurred while deleted data, ${e}`);
      return { error: e.message, code: 100, status: false };
    }
  }

  async updateFormWorkspace(form_id, workspace_id, provider_id) {
    try {
      const updatedData = await this.user.updateOne(
        { provider_id: provider_id, 'workspaces._id': ObjectId(workspace_id) },
        {
          $push: {
            'workspaces.$.forms': form_id,
          },
        }
      );

      if (updatedData.modifiedCount === 1) {
        return { status: true, message: 'Succesfully update workspace' };
      }

      throw new Error(`${updatedData.matchedCount} data updated`);
    } catch (e) {
      console.error(`Error occurred while updating data, ${e}`);
      return { error: e.message, code: 100, status: false };
    }
  }
}

const userDao = new UserDao();
export default userDao;
