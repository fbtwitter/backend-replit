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
  const dateParam = req.params?.date;
  let currentDate = dateParam ? new Date(dateParam) : new Date();

  if (isNaN(currentDate.getTime())) {
    // Attempt to parse as a Unix timestamp in milliseconds
    currentDate = new Date(+dateParam);
  }

  if (!isNaN(currentDate.getTime())) {
    res.json({ unix: currentDate.getTime(), utc: currentDate.toUTCString() });
  } else {
    res.json({ error: "Invalid Date" });
  }
})

const port = process.env.PORT || 3000

// listen for requests :)
const listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port)
})
