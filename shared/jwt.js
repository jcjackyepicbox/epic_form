import jwt from 'jsonwebtoken';

// Verify Token validity and attach token data as request attribute
export function verifyToken(cookieToken, secret, callback) {
  jwt.verify(cookieToken, secret, (err, data) => {
    if (err) {
      console.error(err);
      callback(null, true);
    } else {
      callback(data, false);
    }
  });
}

// Verify Token validity and attach token data as request attribute
export function verifyTokenSync(cookieToken, secret) {
  return new Promise((resolve, reject) => {
    if (!cookieToken) {
      reject(new Error('no token provided'));
    } else {
      jwt.verify(cookieToken, secret, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    }
  });
}

// Issue Token
export function signToken(secret) {
  return (req, res, next) => {
    jwt.sign(
      { userId: req.user.provider_id },
      secret,
      { expiresIn: '2 d' },
      (err, token) => {
        if (err) {
          res.sendStatus(500);
        } else {
          res.cookie('auth', token, {
            maxAge: 14400000,
            sameSite: false,
            httpOnly: false,
          });
          next();
        }
      }
    );
  };
}
