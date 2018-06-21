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

app.get('/auth/google', (req, res)=> {
  console.log('auth api hit')
  res.send('Supppppp')
})

app.get('/auth/google/callback', (req, res => {

}));

app.listen(process.env.PORT || 8080, () => {
  console.log('server is listening')
});