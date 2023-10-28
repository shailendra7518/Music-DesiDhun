  
const mongoose = require('mongoose');
const express = require('express');
const authController = require('../Controllers/auth.controller');
const router = express.Router()


router.post('/signup', authController.signupUser);
router.post("/signin", authController.signInUser);
router.post("/google", authController.gooleAuth);


module.exports = router;