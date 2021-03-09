require('dotenv').config();
import userDao from '../dao/userDao';
import { verifyTokenSync } from '../../shared/jwt';

class UserController {
  async getUserData(req, res) {
    try {
      const { userId } = await verifyTokenSync(
        req.cookies.auth,
        process.env.SESSION_COOKIE_SECRET
      );

      const userData = await userDao.findUser(userId);

      const response = {
        data: userData,
      };

      res.json(response);
    } catch (err) {
      res.json(err);
    }
  }
}

const userController = new UserController();
export default userController;
