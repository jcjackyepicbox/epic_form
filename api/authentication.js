require('dotenv').config({ path: '../.env' });
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import userDao from './dao/userDao';
import UserModel from './models/user.model';
import WorkspaceModel from './models/workspace.model';

const GOOGLE_CLIENT_ID =
  '93092959106-chc63cqqktldsg4iude57dg9ptk3hcdm.apps.googleusercontent.com';

const GOOGLE_CLIENT_SECRET = 'eSDoHTvRVJDuWHQaor1kUVmP';
const CALLBACK_BASE = 'http://localhost:3001';

function initAuthentication() {
  // setup serialization
  passport.serializeUser((user, done) => {
    done(null, typeof user === 'string' ? user : JSON.stringify(user));
  });

  passport.deserializeUser((data, done) => {
    done(null, data);
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: `${CALLBACK_BASE}/auth/google/callback`,
      },
      (token, tokenSecret, profile, done) => {
        const userData = new UserModel();
        const workspaceData = new WorkspaceModel();
        userData.parseGoogleProfile(profile);

        return userDao
          .loginUser(
            userData.getUserCreation(workspaceData.getFirstWorkspace())
          )
          .then((data) => {
            done(null, data);
          });
      }
    )
  );
}

export default initAuthentication;
