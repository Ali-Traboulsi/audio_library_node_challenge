const express = require('express');

const router = express.Router();

const TestController = require('../controllers/test');

router.get('/posts', TestController.getPosts);


module.exports = router;