import { verifyToken } from '../shared/jwt';

export function checkCookieToken(cookieToken) {
  return new Promise((resolve) => {
    verifyToken(cookieToken, process.env.SESSION_COOKIE_SECRET, (data, err) => {
      if (err) {
        console.log(err);
        resolve({
          data: null,
          status: false,
        });
      } else {
        resolve({
          data: data,
          status: true,
        });
      }
    });
  });
}

export function ensureLoggedIn() {
  return async function (req, res, next) {
    const cookieToken = req.cookies.auth;

    if (!cookieToken) {
      return res.json({
        status: false,
        code: 99,
        error: 'No Authentication Provided',
      });
    }

    const { status } = await checkCookieToken(cookieToken);

    if (!status) {
      return res.json({ status: false, error: 'Token expired', code: 99 });
    }

    next();
  };
}

export function ensureLoggedOut() {
  return async function (req, res, next) {
    try {
      const cookieToken = req.cookies.auth;

      if (cookieToken) {
        const { status } = await checkCookieToken(cookieToken);

        if (status) {
          return res.redirect('http://localhost:3000/dashboard/');
        }
      }

      next();
    } catch (err) {
      console.error(err);
    }
  };
}
