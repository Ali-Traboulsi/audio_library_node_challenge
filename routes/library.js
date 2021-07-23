const express = require('express');

const router = express.Router();

const LibraryController = require('../controllers/library');

router.get('/', LibraryController.getIndex);
