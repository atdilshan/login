const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/userModel");

const mainId = "7777";

// @desc    Register new user
// @route   POST /api/users/signup
// @access  Public
const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Check if user exists
  const userExists = await User.findOne({ email });

  try {
    if (userExists) {
      res.send("User already exists");
    } else {
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const utcTimestamp = new Date().getTime();

      // Create user
      const user = await User.create({
        uId: mainId + utcTimestamp,
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role: "0",
        status: "1",
        isPage: "0",
      });

      if (user) {
        res.send("User registered successfully");
      }
    }
  } catch (error) {
    res.send("Something went wrong!");
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check for user email
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.send(generateToken(user._id));
    } else {
      res.send("Email or Password is incorrect!");
    }
  } catch (error) {
    res.send("Something went wrong!");
  }
};

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  signup,
  signin,
};
