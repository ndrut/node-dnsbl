var dns = require('dns'),
    db = require('./list.json'),
    nDNS = require('native-dns'),
    server = nDNS.createServer(),
    winston = require('winston'),
    redis = require("redis"),
    async = require('async');

redisClient = redis.createClient();

var log = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({ timestamp: true, colorize: true }),
        new (winston.transports.File)({ filename: './access.log', timestamp: true })
    ]
});

server.on('request', function (request, response) {
    redisClient.get(request.question[0].name, function (err, data) {
        if(data) {
            data = JSON.parse(data);
            if(data.answer.length < 1) {
               response.header.rcode = nDNS.consts.NAME_TO_RCODE.NOTFOUND;
               response.send();
            }
            else {
            response.answer = data.answer;
            response.additional = data.additional;
            response.send();
            }
        }
        else {
            response.send();
        }
    });
    log.info(request.address.address + '\t' + request.question[0].name);
});

server.on('error', function ( err, buff, req, res) {
    console.log(err);
});

server.serve(53);
