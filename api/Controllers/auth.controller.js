const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../Models/user.model");
const authController = {
  signupUser: async (req, res, next) => {
    console.log(req.body);
    try {
      const { username, email, password } = req.body;

      // Validate username, email, and password
      if (!username || !email || !password) {
        return res.json({
          status: 400,
          message: "Username, email, and password are required",
        });
      }

      if (password.length < 6) {
        return res.json({
          status: 400,
          message: "Password must be at least 6 characters long",
        });
      }

      // Check if email format is valid
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        return res.json({ status: 400, message: "Invalid email address" });
      }

      // Check if username or email already exists
      const existingUser = await UserModel.findOne({
        $or: [{ username }, { email }],
      });

      if (existingUser) {
        return res.json({
          status: 400,
          message: "Username or email is already taken",
        });
      }

      // Hash the password
      console.log("working");
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
      });
      await newUser.save();

      res.json({ status: 200, message: "Signup successful", user: newUser });
    } catch (error) {
      next(error);
    }
  },

  signInUser: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      // Validate username and password

      if (!email || !password) {
        return res.json({
          status: 400,
          message: "Username and password are required",
        });
      }

      // Check if user with provided username exists
      const user = await UserModel.findOne({ email });

      if (!user) {
        return res.json({
          status: 401,
          message: "Invalid username or password",
        });
      }

      // Compare the provided password with the hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.json({
          status: 401,
          message: "Invalid username or password",
        });
      }

      // Generate a token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "10h",
      }); // Change 'secret_key' to your own secret
      delete user.password;
      res
        .cookie("acess-token", token, {
          maxAge: 1000 * 60 * 10,
          httpOnly: true,
          secure: false,
        })
        .json({ status: 201, message: "Login successful", user, token });
    } catch (error) {
      next(error);
      //    const customError = createCustomError("Custom error message", 400);
      //    next(errorHandler("Custom error message", 550));
    }
  },

  gooleAuth: async (req, res, next) => {
     
    try {
      // check if the user is already avalible
      const user = await UserModel.findOne({ email: req.body.email });
      if (user) {
        // Generate a token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
          expiresIn: "100h",
        });

        res
          .cookie("acess-token", token, {
            maxAge: 1000 * 60 * 10,
            httpOnly: true,
            secure: false,
          })
          .json({
            stats: 201,
            message: "user logged in successfully",
            user,
            token,
          });
      } else {
        // genrate a random passowrd here;
        const generatedPassword = Math.random.toString(36).slice(-8);

        // hash the password
        const hashedPassword = await bcrypt.hash(generatedPassword, 10);
        // creating new user
        const myUser = new UserModel({
          username: req.body.username.split(" ").join("").toLowerCase(),
          email: req.body.email,
          password: hashedPassword,
          avatar: req.body.avatar,
        });
        // save the user
        await myUser.save();

        const token = jwt.sign({ id: myUser._id }, process.env.JWT_SECRET_KEY, {
          expiresIn: "48h",
        });

        res.json({
          stats: 201,
          message: "user logged in successfully",
          user: myUser,
          token: token,
        });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
};

module.exports = authController;
