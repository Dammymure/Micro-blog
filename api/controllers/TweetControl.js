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
   console.log(postDoc)
   // res.json(postDoc, "success")
   res.status(200).json(postDoc)
  })
 }catch(err){
  res.json(err)
 }
}


const showTweets = async (req, res) => {
 res.json(
  await Tweet.find()
   .populate('postedBy', ['imageURL',"username"])
   .sort({ createdAt: -1 })
   // .limit(20)
 )
}


module.exports = { createTweet, showTweets }
