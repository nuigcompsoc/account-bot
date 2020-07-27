const {prefix, token, ldapConfig, ldapFunctions} = require('./config.json');
const {Client, RichEmbed} = require('discord.js');
const bot = new Client;
const ldap = require('ldapjs');
const fs = require('fs');

bot.once('ready', () => {
    console.log('Ready!');
});

bot.login(token);

let ldapClient = ldap.createClient({
    url: ldapConfig.url,
    reconnect: ldapConfig.reconnect,
    tlsOptions: {
        host: ldapConfig.tlsOptions.host,
        port: ldapConfig.tlsOptions.port,
        ca: ldapConfig.tlsOptions.ca
    }
});

function getUser(uid, mail) {
    var searchOptions = {
        scope: 'sub',
        filter: '(uid='+uid+')',
        attributes: ['uid', 'mail']
    }

    // client.bind sets up for authentication
    ldapClient.bind(ldapFunctions.bind, ldapFunctions.pw, function(err) {
        if (err) console.log(err);
    });

    // client search queries LDAP
    ldapClient.search(ldapFunctions.search, searchOptions, function(err, res) {
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

bot.on('message', message => {
    //let args = message.content.substring(prefix.length).split(" ");

    if (message.content === '.on') {
        message.channel.send('Testing Bot is now Online, Greetings, ' + message.author.username);
        message.author.send('This works too!')
    }
    /*switch (args[0]) {
        case 'requestaccount':
            const Embed = new RichEmbed()
            .setTitle('NUIG CompSoc Account Request')
            .setColor(0x008080)
            .setDescription('The following is how to setup an account with us!');
    }*/
})

