const express = require('express')
const app = express()

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/client/index.html');
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
