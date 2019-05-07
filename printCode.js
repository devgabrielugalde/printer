const ThermalPrinter = require("node-thermal-printer").printer;
const PrinterTypes = require("node-thermal-printer").types;
const printerOp = require("printer");

async function printCode () {
	let impre = printerOp.getPrinter('EPSON TM-T20 LOCALGAB')
	// let impre = printerOp.getPrinter('\\\\192.168.99.209\\EPSON')
	let printer = new ThermalPrinter({
		type: PrinterTypes.EPSON,
		characterSet: 'UTF-8',
		interface: `printer:${impre.name}`
	})
	
	let codNome = {
		'0190198066794'	: 'SMART APPLE IPHONE 7',
		'7896502874323' : 'GRILL BRINOX',
		'8710103751014' : 'LAMINA PHILIPS',
		'8023277109971' : 'BARBEADOR GAMA',
		'0885370433807'	: 'MOUSE MICROSOFT',
		'7898496353273' : 'SECADOR GAMA',
		'7896075028093'	: 'FRIGIDEIRA JUMBO',
		'7891129235304' : 'FOGÃO BRASTEMP',
		'7892509093095' : 'TABLET SAMSUNG',
		'7898496352412' : 'ESCOVA ALISADORA',
		'7896584068931' : 'MICROONDAS ELECTROLUX',
		'6925281924415' : 'JBL FLIP 4',
		'7891129219748'	: 'MICRO-ONDAS CONSUL',
		'7899968300641' : 'TV 50 TCL UHD',
		'7897013549694' : 'Cabo Hdmi Premium 3 Metros Elgin'
	}

    var type = 67
	var settings = { hriPos: 0, hriFont: 0, width: 5, height: 168 }
	
	Object.keys(codNome).forEach((key) => {
		printer.newLine()
		printer.drawLine()
		printer.printBarcode(key, type, settings)
		printer.newLine()
		printer.print(codNome[key])
		printer.newLine()
		printer.drawLine()
		key = ''
		printer.cut()
	});

	// printer.cut()
	printer.execute()
}

printCode();