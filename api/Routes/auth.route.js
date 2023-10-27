  
const mongoose = require('mongoose');
const express = require('express');
const authController = require('../Controllers/auth.controller');
const router = express.Router()


router.get('/signup', authController.signupUser);


module.exports = router;