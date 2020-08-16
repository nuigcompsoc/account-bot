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
            { name: '!check [Must be done in a DM with Accounts Bot]', value: 'Checks to see if you have a CompSoc account. (Not ready)'},
            { name: '!request [Must be done in a DM with Accounts Bot]', value: 'Requests an account from CompSoc. (Also not ready)'},
        )
        .setTimestamp();

        return exampleEmbed;
    },
    notInDM: function(username, action) {
        const exampleEmbed = new Discord.MessageEmbed()
        .setColor('#FF0707')
        .setTitle('Hi there ' + username + '!')
        .setAuthor('NUIG Computer Society Account Bot', 'https://i.imgur.com/wSTFkRM.png', 'https://compsoc.ie/')
        .setDescription('The action: !' + action + ', can only be done in a DM with Accounts Bot and not in a public channel.')
        .setThumbnail('https://i.imgur.com/wSTFkRM.png')
        .setTimestamp();
        return exampleEmbed;
    }
};