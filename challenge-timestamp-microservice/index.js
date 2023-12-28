// index.js
// where your node app starts

// init project
const express = require('express')
const app = express()

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require('cors')
app.use(cors({ optionsSuccessStatus: 200 }))  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html')
})

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API New' })
})

app.get('/api/:date?', function (req, res) {
  const date = req.params?.date

  try {
    let currentDate = new Date(date)

    if (isNaN(currentDate.getTime())) {
      currentDate = new Date(+date)
    }

    res.json({ unix: currentDate.getTime(), utc: currentDate.toUTCString() })

  } catch (err) {
    console.log(err.message)
  }

})

const port = process.env.PORT || 3000

// listen for requests :)
const listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port)
})
