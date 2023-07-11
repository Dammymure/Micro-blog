const express = require('express')
const router = express.Router()
const Tweet = require("../models/TweetModel")
const { createTweet } = require('../controllers/TweetControl')
const multer = require('multer')
const uploadMiddleware = multer({ dest: 'uploads/' })

router.post("/tweet", uploadMiddleware.single('file'), createTweet )


module.exports = router
