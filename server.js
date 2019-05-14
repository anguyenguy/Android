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
  cert: fs.readFileSync('/etc/letsencrypt/archive/www.nguyenquan.net/cert1.pem'),
  key: fs.readFileSync('/etc/letsencrypt/archive/www.nguyenquan.net/privkey1.pem'),
  ca: fs.readFileSync('/etc/letsencrypt/archive/www.nguyenquan.net/chain1.pem')
}, app).listen(port, () => {
  console.log(`Listening...${port}`)
})
