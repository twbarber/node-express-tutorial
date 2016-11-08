var express = require('express');
var nodemailer = require('nodemailer');
var credentials = require('./credentials.js');

var app = express();
app.set('port', process.env.PORT || 3000);

var mailTransport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: credentials.gmail.email,
        pass: credentials.gmail.password
    }
});
app.get('/email', function(req, res) {
    var mailOptions = {
        from: credentials.gmail.email, // sender address
        to: credentials.gmail.email, // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world ?', // plaintext body
    };
    mailTransport.sendMail(mailOptions, function(error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
    res.send(200);
});

app.use(function(err, req, res, next) {
    console.log('unhandled error detected: ' + err.message);
    res.send('500 - server error');
});

app.use(function(req, res) {
    console.log('route not handled');
    res.send('404 - not found');
});

app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost:' +
        app.get('port') + '; press Ctrl-C to terminate.');
});
