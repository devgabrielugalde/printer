const ThermalPrinter = require("node-thermal-printer").printer;
const PrinterTypes = require("node-thermal-printer").types;
const printerOp = require("printer");

async function printCode () {
	let impre = printerOp.getPrinter('EPSON TM-T20 LOCALGAB')
		let printer = new ThermalPrinter({
			type: PrinterTypes.EPSON,
			characterSet: 'LATINA',
			interface: `printer:${impre.shareName}`
			// extraSpecialCharacters:{ '£':163, 'ã':198 }
		});

		// console.log(printer.printer)
	
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
	
		escreve('')
		printer.cut()
		printer.execute()
}

printCode();