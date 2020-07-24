const Discord = require('discord.js');
const bot = new Discord.Client();
const ldap = require('ldapjs');
const fs = require('fs');

const token = '';
const PREFIX = '!';
var ldapClient = ldap.createClient({
    url: 'ldaps://REDACTED',
    reconnect: true,
    tlsOptions: {
        host: 'REDACTED',
        port: '636',
        ca: [fs.readFileSync('REDACTED')]
    }
});

bot.on('ready', () => {
    console.log('Bot is online');
});

function getUser(uid, mail) {
    var searchOptions = {
        scope: 'sub',
        filter: '(uid='+uid+')',
        attributes: ['uid', 'mail']
    }

    // client.bind sets up for authentication
    ldapClient.bind('REDACTED', 'REDACTED', function(err) {
        if (err) console.log(err);
    });

    // client search queries LDAP
    ldapClient.search('REDACTED', searchOptions, function(err, res) {
        if (err)
            console.log(err);
                
        res.on('searchEntry', function (entry) {
            console.log(entry.object.mail.toLowerCase() + " " + mail.toLowerCase());
            // If the member exists in ldap with UID, it will return true here.
            if (mail.toLowerCase() == entry.object.mail.toLowerCase()) return true;
            return false
        });
    });
}

bot.on('message', msg => {
    let args = msg.content.substring(PREFIX.length).split(" ");
    
    switch(args[0]) {
        case 'login':
            msg.delete({timeout: 1000});
    
            const uid = args[1], mail = args[2];
            var searchOptions = {
                scope: 'sub',
                filter: '(uid='+uid+')',
                attributes: ['uid', 'mail']
            }
        
            // client.bind sets up for authentication
            ldapClient.bind('REDACTED', 'REDACTED', function(err) {
                if (err) console.log(err);
            });
        
            // client search queries LDAP
            ldapClient.search('REDACTED', searchOptions, function(err, res) {
                if (err)
                    console.log(err);
                        
                res.on('searchEntry', function (entry) {
                    console.log(entry.object.mail.toLowerCase() + " " + mail.toLowerCase());
                    // If the member exists in ldap with UID, it will return true here.
                    if (mail.toLowerCase() == entry.object.mail.toLowerCase()) msg.reply('Sent you an email!');
                    else msg.reply('Invalid Details, try again');
                });
            });
        break;
    }
});
