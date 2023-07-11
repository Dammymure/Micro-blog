const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cookieParser = require('cookie-parser');
const cors = require('cors');


const userRouter = require("./routes/UserRoute")
const tweetRouter = require("./routes/TweetRoute")

app.use(cors({ credentials: true, origin: "http://localhost:3000" }))
// Connect server to database
mongoose.connect("mongodb://localhost:27017/testPost")
 .then(() => {
  console.log("Database is connected successfully");
 })
 .catch((err) => {
  console.log(err);
 })

// middlewae for post http model
app.use(express.json())
app.use(cookieParser())

app.use("/api", userRouter)
app.use("/api", tweetRouter)

const PORT = 7000
app.listen(PORT, () => {
 console.log(`Server running on port ${PORT}`);
})
