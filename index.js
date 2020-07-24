const {prefix, token} = require('./config.json');
const {Client, RichEmbed} = require('discord.js');
const bot = new Client;

bot.once('ready', () => {
    console.log('Ready!');
});

bot.login(token);

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
