const { MessageEmbed } = require("discord.js")
module.exports = {
    name: 'directmessage',
    discription: 'Direct Message a user through the bot!',
    usage: '[PREFIX]dm <USER_ID>|| [PREFIX]dm @badRyuk#0001',
    aliases: ['dm', 'pm', 'privatemessage'],
    cooldown: 20,

    async execute(message, args) {

        const noperm = new MessageEmbed()
        noperm.setTitle('No Permissions: Command Usage Request Declined')
        noperm.setDescription('You lack the permissions required to use this command')
        noperm.addField('You require the ``MANAGE_MESSAGES`` permission in order to use the command.', 'A Permission requirement for the command was set to prevent any kind of unauthorized spam in a server. If you feel this is wrong feel this is wrong or must be changed contact the devs!')
        noperm.setAuthor(message.author.tag, message.author.displayAvatarURL())
        noperm.setFooter('Thanks for using Anime Cafe Bot!', message.author.displayAvatarURL())

        const nomember = new MessageEmbed()
        nomember.setTitle('No Member/User Mentioned : Command Usage Request Declined')
        nomember.setDescription('No User Mention/ID Provided')
        nomember.addField('You need to mention a user or add a user id of the user you want to direct message!', 'Please provide a user to direct message and try again! If you provided one make sure it\'s the correct user')
        nomember.setAuthor(message.author.tag, message.author.displayAvatarURL())
        nomember.setFooter('Thanks for using Anime Cafe Bot!', message.author.displayAvatarURL())

        if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(noperm)

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.channel.send(nomember);
        let reason = args.slice(1).join(" ");
        if (!reason) return message.channel.send('Hey! I really want to help you with the empty message desire of yours to disturb people but sadly as of now I can\'t do it. So please provide a message this time!');
        if (reason.length >= 1000) return message.channel.send('Message is too long! Keep it below 1000 words please!')
        const themessage = new MessageEmbed()
        themessage.setTitle('Direct Message')
        themessage.setDescription(`You recieved a Message from ${message.guild}!`)
        themessage.addField(reason, `This message was sent by ${message.author}`)
        themessage.setFooter('Thanks for using Anime Cafe Bot', message.author.displayAvatarURL())
        member.send(themessage).catch(error => message.channel.send("Couldn't send the message, make sure the user is in the same guild as the bot and user is accepting DM's from the server or has not blocked the bot. This may also be occuring if you're Direct Messaging a bot or Cindy itself. Also this message showing up means that your direct command usage was **unsuccessful**. Try again later i guess?"));
    }
}
