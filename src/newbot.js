const {prefix, token, ldapConfig, ldapFunctions, attributes, botcommands, botsummons, testing} = require('../config.json');
const {Client, RichEmbed} = require('discord.js');
const ldap = require('ldapjs');
const fs = require('fs');
let messageFunctions = require('./messages.js');
let bot = new Client;

bot.once('ready', () => {
    console.log('Ready!');
    getUser(testing[0], testing[1]);
});

bot.login(token);

let ldapClient = ldap.createClient({
    url: ldapConfig.url,
    reconnect: ldapConfig.reconnect,
    tlsOptions: {
        host: ldapConfig.tlsOptions.host,
        port: ldapConfig.tlsOptions.port,
        ca: [fs.readFileSync(ldapConfig.tlsOptions.caPath)]
    }
});

function getUser(uid, mail) {
    let searchOptions = {
        scope: 'sub',
        filter: '(uid='+uid+')',
        attributes: ['dn', 'sn', 'cn', attributes.email, attributes.id, attributes.studentnum]
    }

    // client.bind sets up for authentication
    ldapClient.bind(ldapFunctions.bind, ldapFunctions.pw, function(err) {
        if (err) 
            console.log(err);
    });

    // client search queries LDAP
    ldapClient.search(ldapFunctions.search, searchOptions, function(err, res) {
        if (err)
            console.log(err);
                
        res.on('searchEntry', function (entry) {
            console.log('entry: ' + JSON.stringify(entry.object));
            // If the member exists in ldap with UID, it will return true here.
            if (mail.toLowerCase() == entry.object.mail.toLowerCase()) 
                return true;
            return false
        });
    });
}

bot.on('message', message => {

    let msg = message.content.toLowerCase();
    let user = message.author;

    if (msg.charAt(0) == prefix && !user.bot) {
        
        if (botsummons.some(v => msg.includes(v))) {
            message.channel.send(messageFunctions.help(user.username));
        }

        if (msg.includes(botcommands[0])) {
            // ask the user to pm their student number (or email?)
            message.author.send(messageFunctions.checkIfAccount(user.username));
        }
    }
    /*
    if (message.content === '.on') {
        message.channel.send('Testing Bot is now Online, Greetings, ' + message.author.username);
        message.author.send('This works too!')
    }
    switch (args[0]) {
        case 'requestaccount':
            const Embed = new RichEmbed()
            .setTitle('NUIG CompSoc Account Request')
            .setColor(0x008080)
            .setDescription('The following is how to setup an account with us!');
    }*/
})


