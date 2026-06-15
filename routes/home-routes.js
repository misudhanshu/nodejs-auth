const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth-middleware");

router.get("/welcome", authMiddleware, (req, res) => {
  const { userId, userName, role } = req.userInfo;

  res.json("Welcome to home page");
  res.status(200).json({
    user: {
      _id: userId,
      userName,
      role,
    },
  });
});

module.exports = router;
