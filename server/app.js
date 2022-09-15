require('dotenv').config()

const path = require('path')
const bodyParser = require('body-parser')
const { router } = require('./routes/index')
const createError = require('http-errors')
const cors = require('cors')
const logger = require('morgan')
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

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

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/images', express.static(path.join(__dirname, 'public')))

app.use('/', router)

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
