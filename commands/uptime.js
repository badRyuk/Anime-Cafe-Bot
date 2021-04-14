const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = {
  name: 'uptime',
  description: 'Bots Current Uptime',
  usage: '[PREFIX]uptime',
  cooldown: 5,

  async execute(message) {
    const d = moment.duration(message.client.uptime);
    const days = (d.days() == 1) ? `${d.days()} day` : `${d.days()} days`;
    const hours = (d.hours() == 1) ? `${d.hours()} hour` : `${d.hours()} hours`;
    const minutes = (d.minutes() == 1) ? `${d.minutes()} minute` : `${d.minutes()} minutes`;
    const seconds = (d.seconds() == 1) ? `${d.seconds()} second` : `${d.seconds()} seconds`;
    const date = moment().subtract(d, 'ms').format('dddd, MMMM Do YYYY');
    const embed = new MessageEmbed()
      .setTitle(`Anime Cafe Bot}\'s Uptime`)
      .setThumbnail(message.author.displayAvatarURL({
        dynamic: true
      }))
      .setDescription(`\`\`\`prolog\n${days}, ${hours}, ${minutes}, and ${seconds}\`\`\``)
      .addField('Date Launched', date)
      .setFooter(message.member.displayName, message.author.displayAvatarURL({
        dynamic: true
      }))
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
  }
};
