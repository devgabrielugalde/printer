"use strict";

var request = require('request');
var fs = require('fs');

var options = {
    url: "https://repositorio.bemol.com.br/images/bot_troca_rapida/CPG.png",
    method: "get",
    encoding: null
};

console.log('Requesting image..');
request(options, function (error, response, body) {

    if (error) {
        console.error('error:', error);
    } else {
        console.log('Response: StatusCode:', response && response.statusCode);
        console.log('Response: Body: Length: %d. Is buffer: %s', body.length, (body instanceof Buffer));
        console.log(body)
        // fs.writeFileSync('test.jpg', body);
    }
});