

//\Full\backend\middlewares\adminMiddleware.js
module.exports = (req, res, next) => {
  console.log("Verificare utilizator în adminMiddleware:", req.user);

  if (!req.user || !req.user.isAdmin) {
    console.log("Acces refuzat: utilizatorul nu este admin");
    return res.status(403).json({ message: "Access denied" });
  }

  next();
};
