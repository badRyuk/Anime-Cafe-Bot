const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'ban',
	description: 'Ban a user from the server by using mentioning them!',
  guildOnly: true,
	aliases: ['ban', 'banbanban'],
	usage: `-ban <USER_MENTION> <OPTIONAL_REASON>`,
	cooldown: 5,
	async execute(message, args, client) {

const daidinevermantion = new MessageEmbed()
        daidinevermantion.setTitle('Incorrect arguments provided!')
        daidinevermantion.setDescription('Please Mention a user to ban ;-;. Make sure it a mention. The bot may not be able to ban users not in the server')
        daidinevermantion.addField('Usage','``;ban <USER_MENTION> <OPTIONAL REASON>``')
        daidinevermantion.addField('Example Usage', ';ban <@760773438775492610> Good Bot')
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send('You can\'t use that!')
        if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send('I don\'t have the right permissions.')

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        
        if(!args[0]) return message.channel.send(daidinevermantion);

        if(!member) return message.channel.send('Can\'t seem to find this user. Sorry \'bout that :/. Make sure you are mentioning the user and the user is in the server!');
        if(!member.bannable) return message.channel.send('This user can\'t be banned. It is either because they are a mod/admin, or their highest role is higher than mine');

        if(member.id === message.author.id) return message.channel.send('Umm, please check the arguments you are trying to send. I am afraid I can\'t just ban the person who is sending the ban command');

        let reason = args.slice(1).join(" ");

        if(!reason) reason = 'Unspecified';
        
 
        member.ban({ days: 7, reason: reason }).then(()=>message.channel.send(`The specified user ${member} was banned with the reason ${reason}`))

    }
}
