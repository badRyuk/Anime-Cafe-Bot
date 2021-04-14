const { MessageEmbed } = require('discord.js')

module.exports = {
	name: 'eval',
	description: 'Eval',
    ownerOnly: true,
	execute(message, args) {
    if (!args[0]){
      message.channel.send("Please provide a command to reload")
    return;
    } 
    const input = args.join(' ');
    if (!input) return message.channel.send('Please provide code to eval');

      const embed = new MessageEmbed();

      try {
        let output = eval(input);
        if (typeof output !== 'string') output = require('util').inspect(output, { depth: 0 });
        
        embed
          .addField('Input', `\`\`\`js\n${input.length > 1024 ? 'Too large to display.' : input}\`\`\``)
          .addField('Output', `\`\`\`js\n${output.length > 1024 ? 'Too large to display.' : output}\`\`\``)
          .setColor('#66FF00');

      } catch(err) {
        embed
          .addField('Input', `\`\`\`js\n${input.length > 1024 ? 'Too large to display.' : input}\`\`\``)
          .addField('Output', `\`\`\`js\n${err.length > 1024 ? 'Too large to display.' : err}\`\`\``)
          .setColor('#FF0000');
      }

      message.channel.send(embed);

    }
};
