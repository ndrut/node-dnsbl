#!/usr/bin/env node

var dns = require('dns'),
    db = require('./list.json'),
    async = require('async');

function flipIP(ip, callback) {
    flipped = ip.split('.').reverse().join('.');
    callback(flipped);
}

async.each(db, host, function (err) {
  if (err) {  
    console.log(err); 
  }
  else {
  }
});

function host(rbl, callback) {
 flipIP(process.argv[2], function (ip) {
    dns.resolve4(ip + '.' + rbl.dns, function (err, domain) {
    if(err) {
    //    console.log(err);
        callback(null);
    }
    else {
        console.log(rbl.name + ' has your IP on it\'s blacklist!');
        callback(null);
    }
    });
 });
}
