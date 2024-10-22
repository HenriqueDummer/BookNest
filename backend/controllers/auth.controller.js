import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

function generateTokenAndSaveCookie(userId, res) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("token", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpsOnly: true,
    secure: true,
    sameSite: "None",
  });
}

export const signUp = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    if (!email || !password || !username) {
      return res.status(400).json({ error: "All parameter are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      return res.status(400).json({ error: "Email format is invalid" });

    const emailExists = await User.findOne({ email });
    if (emailExists)
      return res.status(400).json({ error: "Email is already registered" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateTokenAndSaveCookie(newUser._id, res);

      await newUser.save();
      return res.status(201).json(`Signed up as ${newUser.username}`);
    } else {
      return res.status(400).json({ error: "Cold not create user" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const logIn = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    if (!email || !password) {
      return res.status(400).json({ error: "All parameter are required" });
    }

    const user = await User.findOne({ email });
    console.log("Found user " + user);
    const isPaswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );
    console.log("bcrypt " + isPaswordCorrect);
    if (!user || !isPaswordCorrect)
      return res.status(400).json({ error: "Email or password incorrect" });

    generateTokenAndSaveCookie(user._id, res);
    console.log("Generated cookie");
    res.status(200).json(`Logged in as ${user.username}`);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      maxAge: 0,
      httpsOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
