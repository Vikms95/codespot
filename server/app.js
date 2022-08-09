/* eslint-disable no-unused-vars */
require('dotenv').config()
const path = require('path')
const express = require('express')
const logger = require('morgan')
const passport = require('passport')
const jwtStrategy = require('./strategies/jwt')
const createError = require('http-errors')
const cookieParser = require('cookie-parser')
const indexRouter = require('./routes/index')
const mongoose = require('mongoose')

const DEV_MONGODB_URI = 'mongodb+srv://vikms:ustdedt8@cluster0.rtqxvkw.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(
  process.env.MONGODB_URI || DEV_MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error'))
db.once('open', () => console.log('MongoDB connected'))

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
