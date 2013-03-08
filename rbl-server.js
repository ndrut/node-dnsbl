var dns = require('dns'),
    db = require('./list.json'),
    nDNS = require('native-dns'),
    server = nDNS.createServer(),
    async = require('async');
/*
function queryRBL(callback) {
async.each(db, host, function (err) {
  if (err) {  
    console.log(err); 
  }
  else {
    callback();
  }
});
}
function host(rbl, callback) {
    dns.resolve4(ip + rbl.dns, function (err, domain) {
    if(err) {
        callback(null);
    }
    else {
        response.answer.push(nDNS.A({
            name: request.question[0].name,
            address: '127.0.0.1'
        }));
        callback(null);
    }
    });
}
*/
server.on('request', function (request, response) {
    var ip = request.question[0].name.replace('rbl.iheardyouliek.com', '');
    async.each(db, function (rbl, callback) {
        dns.resolve4(ip + rbl.dns, function (err, domain) {
            if(err) {
                callback(null);
            }
            else {
                console.log(rbl.dns);
                response.answer.push(nDNS.A({
                    name: request.question[0].name,
                    address: '127.0.0.2',
                    ttl: 300,
                }));
                response.answer.push(nDNS.CNAME({
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
