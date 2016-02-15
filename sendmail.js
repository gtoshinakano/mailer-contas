var nodemailer = require('nodemailer');

var mailOpt = require('./mail-options');

// create reusable transporter object using the default SMTP transport
var smtp_options = {
	service: "Gmail",
    auth: {
		user: "daee.contas@gmail.com",
        pass: "QaWsEd123"
	}
}
var transporter = nodemailer.createTransport("SMTP", smtp_options);

console.log(mailOpt);

// send mail with defined transport object
transporter.sendMail(mailOpt, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response );
});