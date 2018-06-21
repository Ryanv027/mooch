const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('./passport');
require('dotenv').config();


app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get("/auth/google", passport.authenticate('google', {
    scope: ['profile', 'email']
}))

app.get("/auth/google/callback",
    passport.authenticate('google', { failureRedirect: "/" }),
    (req, res, next) => res.redirect("/ping"))

app.listen(process.env.PORT || 8080, () => {
  console.log('server is listening')
});