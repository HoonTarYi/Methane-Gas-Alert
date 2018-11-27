const express = require('express');
const hbs = require('hbs');
const path = require('path');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const server = express();
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');



const sendEmail = () => {
  server.engine('handlebars', exphbs());
  server.set('view engine', 'handlebars');

  // Static folder
  server.use('/public', express.static(path.join(__dirname, 'public')));

  // Body Parser Middleware
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json())

   server.listen(server.get('port'), function() {

  });



  // create reusable transporter object using the default SMTP transport
  var transporter= nodemailer.createTransport({
   service: 'gmail',
   auth: {
          user: 'kaizukahayate@gmail.com',
          pass: 'hayate971:D'
      }
  });


    var mailOptions ={
      from: '"NodeMailer Contact"<myfriend@yahoo.com>', // sender address
      to: 'kaizukahayate@gmail.com', // list of receivers
      subject: 'Gas sensor', // Subject line
      text: 'The temperature is very high',
    };


   transporter.sendMail(mailOptions, function(err, info) {
     if(err)
       console.log(err)
     else
       console.log('Email sent:' +info.response);


  });
}



export default sendEmail;
