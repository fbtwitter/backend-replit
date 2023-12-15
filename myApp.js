require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const app = express()

console.log('Hello World')

// Add middleware
// the middleware to add root logger
app.use((req, res, next) => {
  console.log(req.method + ' ' + req.path + ' - ' + req.ip)
  next()
})
// the middleware to serve static assets
app.use('/public', express.static(__dirname + '/public'))
// the middleware to decode data
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

app.get('/json', (req, res) => {
  res.json({ 'message': process.env.MESSAGE_STYLE === 'uppercase' ? 'HELLO JSON' : 'Hello json' })
})

app.get('/now', (req, res, next) => {
  req.time = new Date().toString()
  next()
}, (req, res) => {
  res.send({ time: req.time })
})

app.get('/:word/echo', (req, res) => {
  res.send({ echo: req.params?.word })
})

app.route('/name')
  .get((req, res) => {
    console.log(req.query)
    res.send({ name: req.query?.first + ' ' + req.query?.last })
  })
  .post((req, res) => {
    console.log(req.body) // Assuming you're expecting JSON in the request body
    res.send()
  })

module.exports = app
