# node-rblchecker

### Server (rbl-server.js):

Update the values in config.json:

```JSON
{
    "listenHost": "0.0.0.0",                // Listening host
    "listenPort": "53",                     // Listening port (DNS requests default to port UDP 53)
    "hostBase": "rbl.iheardyouliek.com",    // The base hostname requests will be prepended to.
    "standardResponse": "127.0.0.2",        // The response returned when there's a match.
    "logfile": "./access.log"               // Path to the file used for logging.

}
```


####Example output:

```bash
[root@desktop andrew]# host 2.0.0.127.rbl.iheardyouliek.com
2.0.0.127.rbl.iheardyouliek.com has address 127.0.0.2
```


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

