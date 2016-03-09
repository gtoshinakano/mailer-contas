var fs = require('fs');
var attachPath = __dirname + "/contas/anexos";
var filesArray = fs.readdirSync(attachPath);
var dirData = JSON.parse(fs.readFileSync('diretorias.json', 'utf8'));
var meses = ["Mes","Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];


/*******************************************************************
 * ABAIXO,  CAMPOS PARA SEREM ALTERADOS A CADA ENVIO DE CONTAS     *
 * PARA CONSULTAR DIRETORIAS, VÁ EM diretorias.json                * 
 * PARA ALTERAR DADOS PROCURE PELO VENCIMENTO EM diretorias.json   *
 *******************************************************************/
var diretoria = dirData.BBT;
var mesRef = 3;
var anoRef = 2016;
var responderPara = "taiara.vitoria@daee.sp.gov.br";
var consumidoras = diretoria.consumidoras;

// Mostrar qual diretoria está sendo enviada.
console.log("Enviando email para : " + diretoria.sigla);
console.log("Caso deseje cancelar o envio, feche esta janela antes de finalizar.");


// Attachment array for Nodemailer, from /contas/anexos
var makeAttachmentArray = function(files){
	
	var _ref = (mesRef < 10) ? '0' + mesRef : mesRef; // mês de referência para nome de arquivo
	var _ret = [];
	for(var i=0; i < files.length; i++){
		var pushItem = {
			fileName: diretoria.sigla + '_' + anoRef + '-' + _ref + '_' + meses[mesRef] + '.pdf', // nome do arquivo
			filePath: attachPath + "/" + files[i]
		}
		_ret.push(pushItem);
	}
	return _ret;
	
}

// Check if all info and attachments are ok.
var isValidToSendEmail = function(files, consumidoras){
	
	console.log('Qtd Anexos: ' + files.length);
	console.log('Qtd Consumidoras: ' + consumidoras.length);
	return (files.length > 0 && consumidoras.length > 0);
	
}

var mailBodyHtml = '<b>Boa tarde Sr(a). '+ diretoria.diretor +',</b><br /><p>Em anexo seguem os arquivos contendo as contas de energia elétrica digitalizadas, referentes ao período de consumo do mês de <b>' + meses[mesRef] + ' de ' + anoRef + '</b> das seguintes instalações de vossa Diretoria: ';
mailBodyHtml += '<p>';
for(var i=0; i < consumidoras.length; i++){
	
	var _sequencia = i + 1;
	mailBodyHtml += '\n<br />' + _sequencia + ') ' + consumidoras[i][0] + ' - ' + consumidoras[i][1] + ' - ' + consumidoras[i][2] + '';
	
	
}
mailBodyHtml += '</p>';
mailBodyHtml += '<p>Solicitamos que seja atestado o consumo de energia elétrica no próprio corpo deste correio eletrônico e nos envie como resposta para taiara.vitoria@daee.sp.gov.br, no prazo máximo de 10 (dez) dias, para que possamos anexá-lo ao respectivo processo de pagamento. </p>';
mailBodyHtml += '<p>Att.</p>';
mailBodyHtml += '<p>Taiara Vitória</p>';
mailBodyHtml += '<p>.</p>';

var mailSubject = 'Atestado de contas de Energia Elétrica ref. '+ meses[mesRef] + ' de ' + anoRef +' ';

// Returned on sendmail.js with email props
var mailOptions = {

    from : 'DAEE DSD/ADA <taiara.vitoria@daee.sp.gov.br>', // sender address
	replyTo : responderPara,
    to: diretoria.email,
	bcc: "gnakano@sp.gov.br",
    subject: mailSubject, // Subject line
	generateTextFromHTML: true,
	html: mailBodyHtml, // html body
    attachments: makeAttachmentArray(filesArray),
	isComplete : isValidToSendEmail(filesArray, consumidoras), // to send or not
	anoRef: anoRef

};

module.exports = mailOptions;