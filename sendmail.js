console.log('Verificando arquivos para envio de email.');
var nodemailer = require('nodemailer');
var fs = require('fs');
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


// send mail with defined transport object
if(mailOpt.isComplete){
	transporter.sendMail(mailOpt, function(error, info){
		if(error){
			return console.log(error);
		}
		console.log('E-mail enviado com sucesso. ');
		console.log('Resposta: ' + info.response);
		
		// rename files to another Path
		var newPath = __dirname + "/contas/" + mailOpt.anoRef + '/';
		for(var i = 0; i < mailOpt.attachments.length ; i++ ){
			console.log(newPath);
			fs.renameSync(mailOpt.attachments[i].filePath, newPath + mailOpt.attachments[i].fileName);
			console.log("Movido: " + mailOpt.attachments[i].fileName);	
		}
		console.log('Concluído');
		process.exit();
		
	});
}else{
	
	console.log('Erro: Email sem anexo.');
	
}
