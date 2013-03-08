var dns = require('dns'),
    db = require('./list.json'),
    nDNS = require('native-dns'),
    server = nDNS.createServer(),
    winston = require('winston'),
    async = require('async');

var log = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({ timestamp: true, colorize: true }),
        new (winston.transports.File)({ filename: './access.log', timestamp: true })
    ]
});

server.on('request', function (request, response) {
    var ip = request.question[0].name.replace('rbl.iheardyouliek.com', '');
    async.each(db, function (rbl, callback) {
        dns.resolve4(ip + rbl.dns, function (err, domain) {
            if(err) {
                callback(null);
            }
            else {
                response.answer.push(nDNS.A({
                    name: request.question[0].name,
                    address: '127.0.0.2',
                    ttl: 300,
                }));
                response.additional.push(nDNS.TXT({
                    name: request.question[0].name,
                    data: rbl.dns,
                    ttl: 300,
                }));
                callback(null);
            }
        });
    },
    function (err) {
        response.send();
    });
});

server.on('error', function ( err, buff, req, res) {
    console.log(err);
});

server.serve(53);
