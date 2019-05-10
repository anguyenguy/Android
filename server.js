const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
const fs = require('fs')
const https = require('https')

// the __dirname is the current directory from where the script is running
// app.use(express.static(__dirname+'/dist'));

app.use(express.static(__dirname + '/static', { dotfiles: 'allow' } ))
// send the user to index html page inspite of the url
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});


https.createServer({
  cert: fs.readFileSync(__dirname+'/static/ssl/cert.pem'),
  key: fs.readFileSync(__dirname+'/static/ssl/privkey.pem'),
  ca: fs.readFileSync(__dirname+'/static/ssl/chain.pem')
}, app).listen(port, () => {
  console.log(`Listening...${port}`)
})