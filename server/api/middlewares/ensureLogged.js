export function ensureLoggedIn(isRequireAuth, redirectTo) {
  const url = redirectTo || '/join';

  return function (req, res, next) {
    if ((!req.isAuthenticated || !req.isAuthenticated()) && isRequireAuth) {
      if (req.session) {
        req.session.returnTo = req.originalUrl || req.url;
      }
      return res.redirect(url);
    }

    next();
  };
}

export function ensureLoggedOut(redirectTo) {
  const url = redirectTo || '/dashboard';

  return function (req, res, next) {
    if (req.isAuthenticated && req.isAuthenticated()) {
      return res.redirect(url);
    }
    next();
  };
}
