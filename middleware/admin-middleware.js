const adminMiddleware = (req, res, next) => {
  console.log(req.userInfo.role);
  if (req.userInfo.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Only admin can access!",
    });
  }
  next();
};

module.exports = adminMiddleware;
