import session from 'express-session';

export function createSessionMiddleware() {
  return session({
    secret: process.env.SESSION_SECRET || 'dev-secret-change-in-production',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    }
  });
}

export function requireAuth(req, res, next) {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ error: 'Niet geautoriseerd. Log eerst in.' });
  }
  next();
}

export function requireRole(allowedRoles) {
  return (req, res, next) => {
    if (!req.session || !req.session.userId) {
      return res.status(401).json({ error: 'Niet geautoriseerd. Log eerst in.' });
    }

    if (!allowedRoles.includes(req.session.userRole)) {
      return res.status(403).json({
        error: 'Onvoldoende rechten voor deze actie.'
      });
    }

    next();
  };
}

export function attachUserToRequest(req, res, next) {
  if (req.session && req.session.userId) {
    req.user = {
      id: req.session.userId,
      name: req.session.userName,
      email: req.session.userEmail,
      role: req.session.userRole
    };
  }
  next();
}
