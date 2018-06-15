const express = require('express')
const app = express()

//app.get('/', (req, res) => res.send('Hello World!'))

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/client/index.html');
});
app.use(express.static(__dirname + "/Client"));
const PORT = process.env.PORT
app.listen(PORT || 2000)
