

//\Full\backend\middlewares\adminMiddleware.js
module.exports = (req, res, next) => {
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
  