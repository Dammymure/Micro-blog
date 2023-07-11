const express = require('express')
const Tweet = require("../models/TweetModel")
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');
const secret = "sjfsdhsbflkjbsvhfslkdhs"


const fs = require('fs')

const createTweet = async (req, res) => {
 try{
  const { originalname, path } = req.file
  const parts = originalname.split(".")
  const ext = parts[parts.length - 1]
  const newPath = path + "." + ext
  fs.renameSync(path, newPath)
 
  const { token } = req.cookies
  jwt.verify(token, secret, {}, async (err, info) => {
   if (err) throw err;
   const { tweet, likes ,photo ,postedBy } = req.body
   const postDoc = await Tweet.create({
    tweet,
    likes,
    photo: newPath,
    postedBy: info.id,
   })
   res.json(postDoc, "success")
  })
 }catch(err){
  res.json(err)
 }
}

module.exports = { createTweet }
