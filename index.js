require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();
// Basic Configuration
const port = process.env.PORT || 3000;
let urlConverts = new Map()
app.use(cors());

app.use('/public', express.static(`${ process.cwd() }/public`));

//  parser for string and array data
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl', (req, res) => {
  let getURlcode = () => Math.floor(Math.random() * 10000) + 1,
    URLcode = getURlcode()

  urlConverts.set(URLcode, req.body.url)
  console.log(urlConverts, 'after setting')
  res.json({ original_url: req.body.url, short_url: URLcode })
})

app.get('/api/shorturl/:urlcode', (req, res) => {
  console.log(urlConverts, 'in get urlcode', req.params.urlcode)
  // res.json({ url: urlConverts.get(Number(req.params.urlcode)) })
  res.redirect(urlConverts.get(Number(req.params.urlcode)))
})



app.listen(port, function () {
  console.log(`Listening on port ${ port }`);
});
