const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require("dotenv")
dotenv.config()

const userRouter = require("./routes/UserRoute")
const tweetRouter = require("./routes/TweetRoute")
const bodyParser = require('body-parser');

app.use(cors({ credentials: true, origin:[ "http://localhost:3000", "https://micro-blog-app.onrender.com"] }))

app.use('/uploads', express.static(__dirname + '/uploads'))

// Connect server to database
mongoose.connect(process.env.MONGO_URI)
 .then(() => {
  console.log("Database is connected successfully");
 })
 .catch((err) => {
  console.log(err);
 })

// Configure body-parser middleware
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// middlewae for post http model
app.use(express.json())
app.use(cookieParser())

app.use("/api", userRouter)
app.use("/api", tweetRouter)

const PORT = 7000
app.listen(PORT, () => {
 console.log(`Server running on port ${PORT}`);
})
