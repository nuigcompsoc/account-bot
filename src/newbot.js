const {prefix, token, ldapConfig, ldapFunctions, attributes, botcommands, botsummons, testing} = require('../config.json');
const {Client, RichEmbed, MessageCollector} = require('discord.js');
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

        if (msg.includes(botcommands[0]) && message.channel.type != "dm") {
            // ask the user to pm their student number (or email?)
            message.channel.send(messageFunctions.notInDM(user.username, botcommands[0]));
        }
        
        if (msg.includes(botcommands[1]) && message.channel.type != "dm") {
            // ask the user to pm their student number (or email?)
            message.channel.send(messageFunctions.notInDM(user.username, botcommands[1]));
        }

    }
});


bot.on("message", async message => {

    const applying = [];

    if (message.author.bot) {
        return;
    }
    if (message.channel.type === "dm") {
        if (message.content.toLowerCase() === "!check") {
            if (applying.includes(message.author.id)) return;
        
            try {
                const collector = new MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 30000 });
                console.log(`${message.author.tag} is checking to see if they have an account.`);
                applying.push(message.author.id);
                await message.channel.send(":pencil: Please enter your **student number** below: ");

                collector.on('collect', message => {
                    if (message.content == "test") {
                        message.channel.send("Checking Now!");
                    } else {
                        message.channel.send("No account!");
                        collector.stop();
                    }
                });
                // can log to backend to see who is checking 
                collector.on('end', collected => {
                    console.log(`Collected ${collected.size} items`);
                });
                    
            } 
            catch(err) {
                console.error(err);
            }

        
        }
    }

}); 

