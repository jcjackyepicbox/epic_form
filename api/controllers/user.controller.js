require('dotenv').config();
import userDao from '../dao/userDao';
import { verifyTokenSync } from '../../shared/jwt';
import WorkspaceModel from '../models/workspace.model';

class UserController {
  async getUserData(req, res) {
    try {
      const { userId } = await verifyTokenSync(
        req.cookies.auth,
        process.env.SESSION_COOKIE_SECRET
      );

      const userData = await userDao.findUser(userId);

      if (userData) {
        res.json({
          status: true,
          data: userData,
        });
      } else {
        res.json({
          status: false,
          error: 'Something went wrong',
          code: 100,
        });
      }
    } catch (err) {
      res.json(err);
    }
  }

  async insertNewWorkspace(req, res) {
    try {
      const { title } = req.body;
      const { userId } = await verifyTokenSync(
        req.cookies.auth,
        process.env.SESSION_COOKIE_SECRET
      );

      const workspaceObj = new WorkspaceModel();
      const newWorkspaceData = workspaceObj.getNewInsertWorkspace(title);
      const insertData = await userDao.insertWorkspace(
        newWorkspaceData,
        userId
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

  async updateTitleWorkspace(req, res) {
    try {
      const { title, workspace_id } = req.body;
      const { userId } = await verifyTokenSync(
        req.cookies.auth,
        process.env.SESSION_COOKIE_SECRET
      );

      const updatedData = await userDao.updateTitleWorkspace(
        title,
        workspace_id,
        userId
      );

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

  async removeWorkspace(req, res) {
    try {
      const { workspace_id } = req.body;
      const { userId } = await verifyTokenSync(
        req.cookies.auth,
        process.env.SESSION_COOKIE_SECRET
      );

      const removedData = await userDao.removeWorkspace(workspace_id, userId);

      if (removedData.status) {
        res.json({
          status: true,
          data: removedData,
        });
      } else {
        res.json(removedData);
      }
    } catch (err) {
      res.json(err);
    }
  }
}

const userController = new UserController();
export default userController;
