﻿var fs = require('fs');
var attachPath = __dirname + "/contas/anexos";
var filesArray = fs.readdirSync(attachPath);
var dirData = JSON.parse(fs.readFileSync('diretorias.json', 'utf8'));
var meses = ["Mes","Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];


/*******************************************************************
 * ABAIXO,  CAMPOS PARA SEREM ALTERADOS A CADA ENVIO DE CONTAS     *
 * PARA CONSULTAR DIRETORIAS, VÁ EM diretorias.json                * 
 * PARA ALTERAR NÚMEROS PROCURE PELO VENCIMENTO EM diretorias.json *
 *******************************************************************/
var diretoria = dirData.BBT;
var telefones = diretoria.telefones.venc24;
var mesRef = 2;
var anoRef = 2016;
var vencimento = "24/02/2016";
var responderPara = "avelez@sp.gov.br";


// Attachment array for Nodemailer, from /contas/anexos
var makeAttachmentArray = function(files){
	
	var _ref = (mesRef < 10) ? '0' + mesRef : mesRef; // mês de referência para nome de arquivo
	var _ret = [];
	for(var i=0; i < files.length; i++){
		var pushItem = {
			fileName: diretoria.sigla + '_' + anoRef + '-' + _ref + '_vencto_' + vencimento.replace(/\//g, '-') + '_' + i + '-' + meses[mesRef] +'.pdf', // nome do arquivo
			filePath: attachPath + "/" + files[i]
		}
		_ret.push(pushItem);
	}
	return _ret;
	
}

// Check if all info and attachments are ok.
var isValidToSendEmail = function(files, telefones){
	
	console.log('Qtd Anexos: ' + files.length);
	console.log('Qtd Telefones: ' + telefones.length);
	return (files.length > 0 && telefones.length > 0);
	
}

var mailBodyHtml = '<b>Senhor Diretor da '+ diretoria.sigla +',</b><br /><p>Em observância ao Item I do Artigo 4º da Portaria DAEE-389, de 03/02/2016, anexamos ao presente correio eletrônico a(s) conta(s) digitalizada(s) da(s) linha(s): ';
mailBodyHtml += telefones.toString() + 'referente(s) ao mês de <b>'+ meses[mesRef] + ' de ' + anoRef +'</b>, instalada(s) em unidade(s) dessa Diretoria, com vencimento em '+ vencimento +', para que seja(m) ratificada(s) por Vossa Senhoria.</p>';
mailBodyHtml += '<p>A ratificação poderá ser feita  no próprio corpo deste correio eletrônico e nos enviada como resposta.</p><br /><br />';

var mailSubject = 'Atestado de contas telefônicas ref. '+ meses[mesRef] + ' de ' + anoRef +' - '+ diretoria.sigla;

// Returned on sendmail.js with email props
var mailOptions = {

    from : 'DAEE DSD/ADA <avelez@sp.gov.br>', // sender address
	replyTo : responderPara,
    to: diretoria.email,
    subject: mailSubject, // Subject line
	generateTextFromHTML: true,
	html: mailBodyHtml, // html body
    attachments: makeAttachmentArray(filesArray),
	isComplete : isValidToSendEmail(filesArray, telefones), // to send or not
	anoRef: anoRef

};

module.exports = mailOptions;