let printers = require("printer").getPrinters()
let impre = require("printer").getPrinter('\\\\192.168.99.209\\EPSON')
console.log(impre)
printers.forEach(element => {
    // console.log(element.name)
});