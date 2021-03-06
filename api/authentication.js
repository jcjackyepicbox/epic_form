import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';

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
    // Fast path: we got the full user data in the cookie
    console.log('Deserialized', data);
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
        console.log('Profile', profile);
        return done(null, profile);
      }
    )
  );
}

export default initAuthentication;
