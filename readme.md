# node-rblchecker

### Server (rbl-server.js):

Listens on 53 by default, I recommend using forever to keep it alive. I've hard coded it to use rbl.iheardyouliek.com, you'll need to update that to use your own.

Right now, it returns 127.0.0.2 if there's any matches:


```bash
[root@desktop andrew]# host 2.0.0.127.rbl.iheardyouliek.com
2.0.0.127.rbl.iheardyouliek.com has address 127.0.0.2
```

And the offending lists are served as TXT DNS records:


```bash
[root@desktop andrew]# dig txt 2.0.0.127.rbl.iheardyouliek.com +short
"cbl.abuseat.org"
"multi.surbl.org"
"bl.spamcannibal.org"
"spam.abuse.ch"
"b.barracudacentral.org"
"bl.spamcop.net"
"spam.dnsbl.sorbs.net"
"dnsbl.sorbs.net"
```

### Supported RBL's:
* b.barracudacentral.org - [Barracuda](http://www.barracudacentral.org/rbl) - (Requires sign-up)
* bl.spamcop.net - [Spamcop](http://spamcop.net)
* dnsbl.njabl.org - [Not just another block list](http://njabl.org)
* dnsbl.sorbs.net - Sorbs](http://sorbs.net) (Aggregate Zone)
* spam.dnsbl.sorbs.net - [Sorbs](http://sorbs.net) (Spam specific)
* cbl.abuseat.org - [Composite Blocking List](http://cbl.abuseat.org/)
* zen.spamhaus.org - [Spamhaus](http://spamhaus.org)
* multi.surbl.org - [Multi SURBL](http://surbl.org)
* bl.spamcannibal.org - [Spam Cannibal](http://www.spamcannibal.org)
* spam.abuse.ch - [Swiss Security - Abuse.ch](http://www.abuse.ch)
* ubl.unsubscore.com - [The Unsubscribe Blacklist(UBL)](http://www.lashback.com/blacklist/)
* dnsbl-3.uceprotect.net - [UCEPROTECT Network](http://www.uceprotect.net/en)


## TODO
* [Server] Config file to support other rbl's
* [Server] Figure out why each request has two packets, resulting in two log entries.


### Client (rbl.js):

Ran from cli:

rbl.js <ip address>


```
[root@phoenix rbl]# ./rbl.js 127.0.0.2
Barracuda has your IP on it's blacklist!
SpamCop has your IP on it's blacklist!
Sorbs Aggregate Zone has your IP on it's blacklist!
Composite Blocking List has your IP on it's blacklist!
Sorbs spam.dnsbl Zone has your IP on it's blacklist!
Spam Cannibal has your IP on it's blacklist!
Multi SURBL has your IP on it's blacklist!
dnsbl.abuse.ch has your IP on it's blacklist!
```

