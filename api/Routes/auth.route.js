  
const mongoose = require('mongoose');
const express = require('express');
const authController = require('../Controllers/auth.controller');
const router = express.Router()


router.post('/signup', authController.signupUser);
router.post("/signin", authController.signInUser);


module.exports = router;