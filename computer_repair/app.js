var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.get('/', function(req, res) {
  console.log('routing to /');
  res.render('index', { title: 'Computer not working' });
});

app.get('/about', function(req, res){
  res.render('about');
});

app.get('/contact', function(req, res){
  res.render('contact');
});


app.post('/contact/send', function(req, res){
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'logube@gmail.com',
      pass: 'gkdlxhuftprziprz'
    }
  });
  var mailOptions = {
    from: 'Ben <logube@gmail.com',
    to: 'benedettologiudice@gmail.com',
    subject: 'Learning node',
    text: 'learning nodejs by night Name ' + req.body.name +
          ' Email: ' + req.body.email +
          ' Message: ' + req.body.message,
    html: '<p>'+req.body.message+'</p><ul><li>Email '+req.body.email+'</li></ul>'
  }
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      console.log('error sending email ' + error );
      res.redirect('/');
    } else {
      console.log('message sent: ' + info.response);
      res.redirect('/');
    }
  })
});


app.listen(3000);
console.log("Server is running on port 3000");
