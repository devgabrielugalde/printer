var express = require('express');
var app = express();
const printDoc1 = require("./index-epson")
const printCancGar = require('./canc_garantia')

app.post('/postimprimir', function (req, res) {
    let d = req.query
    printDoc1.printDoc(d.impressora, d.loja, d.data_emissao, d.matricula_atendente, d.nome_atendente, d.motivo, d.nome_cliente, d.cpf_cliente, d.loja_nota, d.nota, d.data_nota, d.descricao_produto, d.imei_antigo, d.imei_novo, d.codigo_validador, d.codigo_qr, d.txt_validador)
    res.send("OK POST")
})

app.post('/cancelservgar', function (req, res) {
    let d = req.query
    printCancGar.printDoc(d.loja, d.endereco_loja, d.endereco_cidade, d.descricao_cancelamento, d.seguradora_cnpj, d.registro_susep, d.no_processo_susep, d.nome_produto, d.ramo, d.descricao, d.numero_bilhete, d.data_cancel)
    res.send("OK POST")
})

app.get('/getimprimir', function (req, res) {
    console.log(req.query)
    res.send("OK GET")
})

app.listen(9001, function () {
    console.log('Example app listening on port 9001!')
})