/**
 * Module Imports
 */

const { Client, Collection } = require("discord.js");
const { readdirSync } = require("fs");
const { join } = require("path");
const { MessageEmbed } = require('discord.js');
const client = new Client({ disableMentions: "everyone" });
const {prefix, ownerId, coownerId} = require('./config.json');
client.commands = new Collection();
client.prefix = prefix;
const cooldowns = new Collection();
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Client Events
 * @todo Changing Status / 5000ms
 */
 client.on("ready", () => {
    console.log(`${client.user.username} ready!`);
  client.user.setActivity(`to ${prefix}help`, { type: 'LISTENING' }, 'online')
  });

  /**
   * Command Handler
   */

   const commandFiles = readdirSync(join(__dirname, "commands")).filter((file) => file.endsWith(".js"));
   for (const file of commandFiles) {
     const command = require(join(__dirname, "commands", `${file}`));
     client.commands.set(command.name, command);
   }
   
   client.on("message", async (message) => {
     if (message.author.bot) return;
   
   
     const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
     if (!prefixRegex.test(message.content)) return;
   
     const [, matchedPrefix] = message.content.match(prefixRegex);
   
     const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
     const commandName = args.shift().toLowerCase();
   
     const command =
       client.commands.get(commandName) ||
       client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
   
     if (!command) return;
   
     if (!cooldowns.has(command.name)) {
       cooldowns.set(command.name, new Collection());
     }
   /**
    * DMOnly Commands > Mainly commands with permissions
    * @todo Renny: Add better messages
    */
   if (command.guildOnly && message.channel.type === 'dm') {
   const dmOnly = new MessageEmbed()
   dmOnly.setTitle('Guild Only Command')
   dmOnly.setDescription('This command can only be used in Servers/Guilds')
   dmOnly.addField('Try Using the command in a guild or server instead of Direct Messages', 'Feel this is a mistake? Report it to the developers!')
   dmOnly.setFooter('Thanks for using Cindy!', message.author.displayAvatarURL({ dynamic: true }))
   message.author.send(dmOnly)
   return false;
   }
   /**
    * DevloperOnly
    * @todo Add better messages
    */
    if (command.ownerOnly && message.author.id !== ownerId || coownerId) {
       const devOnly = new MessageEmbed()
   devOnly.setTitle('Developer Only Command')
   devOnly.setDescription('This command can only be used by developers')
   devOnly.addField('Next time don\'t try to use a Developer Only Command', 'You won\'t be able to use it anyways')
   devOnly.setFooter('Thanks for using Cindy!', message.author.displayAvatarURL({ dynamic: true }))
   devOnly.setColor('RANDOM')
   message.channel.send(devOnly)
   return false;
     }
   
   /**
    * Cooldowns
    * @todo Add Random embed titles?
    */
     const now = Date.now();
     const timestamps = cooldowns.get(command.name);
     const cooldownAmount = (command.cooldown || 3) * 1000;
   
     if (timestamps.has(message.author.id)) {
       const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
   
       if (now < expirationTime) {
         const timeLeft = (expirationTime - now) / 1000;
   const cembed = new MessageEmbed()
         cembed.setTitle('Hey!, Slow it down')
         cembed.setDescription(`This command is on Cooldown`)
         cembed.addField(`Please wait ${timeLeft.toFixed(1)} more seconds for using the command.`, `The cooldown for the command is ${cooldownAmount/1000} second(s)`)
         cembed.setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
         cembed.setTimestamp()
         cembed.setColor("RANDOM");
   
         return message.channel.send(cembed);
       }
     }
   
     timestamps.set(message.author.id, now);
     setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
   
     try {
       command.execute(message, args);
     } catch (error) {
       console.error(error);
       const eembed = new MessageEmbed()
       eembed.setTitle('Error!')
         eembed.setDescription(`An error occured while using this command`)
         eembed.addField(`Please wait wait while the devs fix it!. If the error continues please contact the devs!`, `Sorry for the inconvienience`)
         eembed.setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
         eembed.setTimestamp()
         eembed.setColor("RANDOM");
       message.reply(eembed).catch(console.error);
   
   }
   });
   
  
