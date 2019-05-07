const ThermalPrinter = require("node-thermal-printer").printer;
const PrinterTypes = require("node-thermal-printer").types;
const printerOp = require("printer");

module.exports = {
	printDoc: async (impressora, loja, data_emissao, matricula_atendente, nome_atendente, motivo, nome_cliente, cpf_cliente, loja_nota, nota, data_nota, descricao_produto, imei_antigo, imei_novo, codigo_validador, codigo_qr, txt_validador) => {

		let impre = printerOp.getPrinter('EPSON TM-T20 LOCALGAB')

		// let impre = printerOp.getPrinter(impressora)
		let printer = new ThermalPrinter({
			type: PrinterTypes.EPSON,
			characterSet: 'UTF-8',
			interface: `printer:${impre.name}`
		})
	
		function escreve(txt, negrito = false, direcao = 'C', quebrarLinha = true){
			if (negrito) { printer.bold(true) }
			switch (direcao) {
				case 'L':
					printer.alignLeft()
					break;
				case 'C':
					printer.alignCenter()
					break;
				case 'R':
					printer.alignRight()
					break;
				default:
					break;
			}
			printer.print(txt)
			printer.bold(false)
			if (quebrarLinha) { printer.newLine() }
		}
		
		function drawLine(){
			printer.drawLine()
		}
	
		escreve('CNPJ: 04.565.289/0011-19 IE: 04.221.62-2')
		drawLine()
		await printer.printImage('./images/logo-bemol2.png')
		printer.newLine()
		escreve(loja, true, 'C', true)
		escreve('PCA ADALBERTO VALE, 32/76 FUNDOS P/ M. LEAO')
		escreve('CENTRO, MANAUS-AM, CEP: 69097-720')
		drawLine()
		escreve(`Emissao: ${data_emissao}`, false, 'L', false)
		escreve(` Atendente: ${matricula_atendente} ${nome_atendente}`, false, 'R', true)
		printer.newLine()
		escreve('DECLARACAO', true)
		escreve('SUBSTITUICAO DE NUMERO DE SERIE', false, 'C', true)
		printer.newLine()
		escreve('Declaramos para devidos fins que efetuamos a substituicao do numero de serie do produto abaixo pelo seguinte motivo:', false, 'L')
		drawLine()
		escreve(motivo, true)
		drawLine()
		escreve('Nome do cliente: ', true, 'L', false)
		escreve(nome_cliente, false, 'L', true)
		escreve('CPF: ', true, 'L', false)
		escreve(cpf_cliente)
		escreve('Loja: ', true, 'L', false)
		escreve(loja_nota, false, 'C', true)
		escreve('Nota Fiscal: ', true, 'L', false)
		escreve(nota, false, 'L', false)
		escreve(' Emitida em: ', true, 'R', false)
		escreve(data_nota, false, 'R', true)
		escreve('Produto: ', true, 'L', false)
		escreve(descricao_produto)
		escreve('Numero de Serie Anterior: ', true, 'L', false)
		escreve(imei_antigo)
		escreve('Numero de Serie Atual: ', true, 'L', false)
		escreve(imei_novo)
		printer.newLine()
		escreve('Codigo de Validacao')
		drawLine()
		escreve(codigo_validador)
		drawLine()
		printer.printQR(codigo_qr, {correction: 'H', cellSize: 5});
		printer.newLine()
		drawLine()
		escreve(txt_validador)
		printer.cut()
		printer.execute()
	}
}