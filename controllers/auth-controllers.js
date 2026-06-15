// First register user than go to login page
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    // Get data from req.body
    const { username, email, password, role } = req.body;

    // Check whether user exist or not
    const checkExistingUser = await User.findOne({
      $or: [
        {
          username,
          email,
        },
      ],
    });
    if (checkExistingUser) {
      res.status(400).json({
        success: false,
        message: "User with this username and email already existed",
      });
    }

    // Encrypt password using bcrypt
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create user and send response
    const createNewUser = await User.create({
      username,
      email,
      password: hashPassword,
      role: role || "user",
    });
    if (createNewUser) {
      res.status(201).json({
        success: true,
        message: "User created successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Something went wrong",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if this user exist in db or not
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Check the entered password match the db password or not
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // JWT token
    const accessToken = jwt.sign(
      {
        userId: user._id,
        userName: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "15m",
      },
    );

    res.status(200).json({
      success: true,
      message: "Logged in successfull",
      accessToken,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
