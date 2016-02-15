var fs = require('fs');
var attachPath = __dirname + "/contas/anexos";
var filesArray = fs.readdirSync(attachPath);

// Formatted Attachment array for Nodemailer
var makeAttachmentArray = function(files){
	
	var ret = [];
	for(var i=0; i < files.length; i++){
		var pushItem = {
			fileName: files[i],
			filePath: attachPath + "/" + files[i]
		}
		ret.push(pushItem);
	}
	return ret;
	
}

// Returned on sendmail.js with email props
var mailOptions = {
    from: 'DAEE DSD/ADA <avelez@sp.gov.br>', // sender address
	replyTo : "avelez@sp.gov.br",
    to: 'gtoshinakano@gmail.com', // list of receivers
    subject: 'Teste Mailer', // Subject line
	text: 'Em observância ao Item I do Artigo 4º da Portaria DAEE-389, de 03/02/2016, anexamos ao presente correio eletrônico...', // plaintext body
    attachments: makeAttachmentArray(filesArray)
	//html: '<b>Hello world ??</b>' // html body
};

module.exports = mailOptions;