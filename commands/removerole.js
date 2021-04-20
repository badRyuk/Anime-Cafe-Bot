const { MessageEmbed } = require('discord.js');
module.exports = {
  name: 'removerole',
  description: 'Remove a role from the user.',
  aliases: ['rr', 'rrole'],
  usage: '[PREFIX]removerole <USER_ID> <ROLE_ID> <OPTIONAL_REASON>',
  guildOnly: true,
  cooldown: 5,
  async execute(message, args) {
    if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send('Sorry, you need ``MANAGE_ROLES`` permissions to execute this command!')
    if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send('Sorry I require ``MANAGE_ROLES`` permissions to execute this command')
    
    const arrerr = new MessageEmbed()
    arrerr.setTitle('Incorrect Arguments provided')
    arrerr.setDescription('Please provide the **user id** of the user from whom the role has to be removed  and the **role id** of the role that has to be removed from the user. Make sure the role and the member and the role are in the server!')
    arrerr.addField('Command Usage', '``[PREFIX]removerole <USER_ID> <ROLE_ID> <OPTIONAL_REASON>``')
    arrerr.addField('Example Usage', '``[PREFIX]removerole 737461888023003196 741231360408158239 Asked for it!``')
    arrerr.setFooter('TIP: You can use [PREFIX]getid/id for getting id of any user, channel or role!')
    arrerr.setColor("RANDOM");
    const member = message.guild.members.cache.get(args[0]);
    if (!member)
      return message.channel.send(arrerr);
    if (member.roles.highest.position >= message.member.roles.highest.position)
      return message.channel.send('You cannot remove a role from someone with an equal or higher role');

    const role = message.guild.roles.cache.get(args[1]);

    let reason = args.slice(2).join(' ');
    if (!reason) reason = '`None`';
    if (reason.length > 1024) reason = reason.slice(0, 1021) + '...';
    
    if (!role) 
      return message.channel.send(arrerr);
    else if (!member.roles.cache.has(role.id)) // If member doesn't have role
     return message.channel.send('User does not have the provided role');
    else {
      try {

        // Add role
        await member.roles.remove(role);
        const embed = new MessageEmbed()
          .setTitle('Remove Role')
          .setDescription(`${role} was successfully removed from ${member}.`)
          .addField('Moderator', message.member, true)
          .addField('Member', member, true)
          .addField('Role', role, true)
          .addField('Reason', reason)
          .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
          .setTimestamp()
          .setColor("RANDOM");
        message.channel.send(embed);

        // Update mod log
        } catch (err) {
        return message.channel.send('Please check the role hierarchy or if the role is managed by an integeration or system', err.message);
      }
    }  
  }
};