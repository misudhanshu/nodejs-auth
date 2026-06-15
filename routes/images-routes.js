const express = require("express");
const authMiddleware = require("../middleware/auth-middleware");
const adminMiddleware = require("../middleware/admin-middleware");
const uploadMiddleware = require("../middleware/uploadMiddleware");
const {
  uploadImage,
  fetchImage,
} = require("../controllers/cloudinaryControllers");
const router = express.Router();

router.post(
  "/uploads",
  authMiddleware,
  adminMiddleware,
  uploadMiddleware.single("image"),
  uploadImage,
);

router.get("/get", authMiddleware, fetchImage);

module.exports = router;
