const express = require('express');
const router = express.Router();
const {signup, signin, me} = require('../controllers/authController')
const authMiddleware = require('../middleware/authMiddleware');

router.post('/signup', signup);

router.post('/signin', signin);

router.get('/me', authMiddleware, me);

module.exports = router;