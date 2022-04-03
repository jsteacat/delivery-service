module.exports = (req, res, next) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    if (req.session) {
      req.session.returnTo = req.originalUrl || req.url;
    }
    return res.status(401).json({
      status: 'error',
      error: 'Unauthorized'
    });
  }
  next();
};