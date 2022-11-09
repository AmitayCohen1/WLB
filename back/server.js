require('dotenv').config()
const mongoose = require('mongoose')

const express = require('express')
const cors = require('cors')
const challengeRoutes = require('./routes/challenges')
const userRoutes = require('./routes/user')

// express app
const app = express()

// middleware
app.use(express.json())
app.use(cors({origin: process.env.NODE_ENV === "production" ? "https://beaworldleader.com" : 'http://localhost:3000'}))


app.use((req, res, next) => {
  next()
})
// routes
app.use('/api/challenges', challengeRoutes)
app.use('/api/user', userRoutes)


// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database')

    // listen to port
    app.listen(process.env.PORT || 8080, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 