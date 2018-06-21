const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/api/test', (req, res)=> {
  console.log('api hit')
  res.send('Supppppp')
})

app.listen(process.env.PORT || 8080, () => {
  console.log('server is listening')
});