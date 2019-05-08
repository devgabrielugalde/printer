const merge = require('merge-images-canvas-v2')
const c = require('node-canvas-1.x')
const base = require('base64-to-image')
const fs = require('file-system')
const path = require('path')

function mergeExec(nome_loja) {
    var canvas = new c(248, 130)
    var ctx = canvas.getContext('2d')
    ctx.font = 'normal 30px Impact, serif'
    var s = nome_loja.split(" ")
    if(s.length >= 3){
        ctx.fillText(`${s[0]} ${s[1]}`, 10, 65)
        ctx.fillText(s[2], 10, 105)
    } else {
        ctx.fillText(nome_loja, 10, 65)
    }
    canvas.createPNGStream().pipe(fs.createWriteStream(path.join(__dirname, 'nome_loja.png')))

	setTimeout(() => {
        merge([{src:'./logo_bemol.png',x : 0,y : 0},{src:'./nome_loja.png',x : 270,y : 10}], {Canvas: c,width: 	500,height: 125}).then(b64 => {
            base(b64, './', {'fileName' : 'teste.png', 'type' : 'png'})
        })
    }, 1000)
}

module.exports = {
    doMerge : (nome_loja) => {
        mergeExec(nome_loja)
    }
}