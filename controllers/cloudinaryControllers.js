const Image = require("../models/Image");
const { uploadToCloudinary } = require("../helper/CloudinaryHelper");
const Cloudinary = require("../config/Cloudinary");

const uploadImage = async (req, res) => {
  try {
    // check file exist in req or not
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: `Image not found in request object! Please choose image`,
      });
    }

    const { url, publicId } = await uploadToCloudinary(req.file.path);

    const newImage = await Image.create({
      url,
      publicId,
      uploadedBy: req.userInfo.userId,
    });

    res.status(201).json({
      success: true,
      message: `Image uploaded successfully`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: `Error uploading image`,
    });
  }
};

const fetchImage = async (req, res) => {
  try {
    const getAllBookCover = await Image.find({});

    if (getAllBookCover) {
      res.status(200).json({
        success: true,
        message: `Book cover fetched successfully`,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: `Image not found in request object! Please choose image`,
      });
    }
  } catch (error) {
    console.error(`Something went wrong`, error);
    res.status(500).json({
      success: false,
      message: `Error uploading image`,
    });
  }
};

module.exports = {
  uploadImage,
  fetchImage,
};
