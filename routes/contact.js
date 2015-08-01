var express = require('express');
var router = express.Router(); //Create a new router
var nodemailer = require('nodemailer');
	
router.get('/', function(req, res, next) { //request done to root url 
  res.render('contact', { title: 'Contact' }); //render contact file based on rendering machine tat specified before => jade 
});

//a block of data that is the result of submitting a web form to a data-handling process; or an item to add to a database
router.post('/send', function(req, res, next){
	// create reusable transporter object using SMTP transport 
	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: '',
			pass: ''
		}
	});

	var mailOptions = {
		from: 'John Doe <johndoe@outlook.com>',
		to: 'abc@gmail.com',
		subject: 'website submission',
		text: 'You have a new submission with the following details...Name: '+req.body.name+' Email: '+req.body.email+' Message: '+req.body.message+'', //text cant be styled, html can be styled
		html: 	"<p>You got a new submission with the following details.<ul><li>Name: '+req.body.name+'</li><li>Email: '+req.body.email+'</li><li>Message: '+req.body.message+'</li></ul></p>"
	};  //if the email provider cant read html, it will read text

	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			console.log(error);
			res.redirect('/');
		} else {
			console.log('Message Sent: '+info.response);
			res.redirect('/');
		}
	})
});

module.exports = router;	