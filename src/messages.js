const Discord = require('discord.js');

module.exports = {
    help: function(username) {

        const exampleEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Hi there ' + username + '!')
        .setAuthor('NUIG Computer Society Account Bot', 'https://i.imgur.com/wSTFkRM.png', 'https://compsoc.ie/')
        .setDescription('Below is a list of commands you can send to our database via accounts bot here:')
        .setThumbnail('https://i.imgur.com/wSTFkRM.png')
        .addFields(
            { name: '!accounts', value: 'Calls the accounts bot and lists the commands. '},
            { name: '!check', value: 'Checks to see if you have a CompSoc account. (Not ready)'},
            { name: '!request', value: 'Requests an account from CompSoc. (Also not ready)'},
            { name: '\u200B', value: '\u200B' }
        )
        .setTimestamp();

        return exampleEmbed;
    },
    checkIfAccount: function(username) {
        const exampleEmbed = new Discord.MessageEmbed()
        .setColor('#8121C4')
        .setTitle('Hi there ' + username + '!')
        .setAuthor('NUIG Computer Society Account Bot', 'https://i.imgur.com/wSTFkRM.png', 'https://compsoc.ie/')
        .setDescription('In order to check whether you have an account with us, please direct message Accounts Bot with your student number.')
        .setThumbnail('https://i.imgur.com/wSTFkRM.png')
        .addFields(
            { name: 'Note that:', value: 'The bot will delete these messages after 1 minute has passed for GDPR.'}
        )
        .setTimestamp();

        return exampleEmbed;
    },
    requestAccount: function() {

    }
};