const express = require('express')
const app = express()

//app.get('/', (req, res) => res.send('Hello World!'))

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/client/index.html');
});


const PORT = process.env.PORT
app.listen(PORT || 8081)
