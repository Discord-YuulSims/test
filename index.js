const discord = require("discord.js");
const botConfig = require("./botconfig.json");

const activeSongs = new Map();

const fs = require("fs");
const { type } = require("os");
const client = new discord.Client();

client.commands = new discord.Collection();

client.login(process.env.token);

fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if (jsFiles.length < - 0) {
        console.log("kon files niet vinden");
        return;
    }
    jsFiles.forEach((f, i) => {

        var fileGet = require(`./commands/${f}`);
        console.log(`de file ${f} is geladen`);

        client.commands.set(fileGet.help.name, fileGet);

    })

});

client.on("guildMemberAdd", member => {
    var role = member.guild.roles.cache.get("673116519563001877");



    member.roles.add(role);

    var channel = member.guild.channels.cache.get('673118698441015306');

    if (!channel) return;

    channel.send(`Welkom bij de server ${member}`);

    var userIcon = member.user.avatarURL();

    var addmemeber = new discord.MessageEmbed()
        .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL())
        .setThumbnail(userIcon)
        .setDescription(`**Hey ${member.user.username},** \n**Welkom** in de server van **YuulSims**.`)
        .addField("We zijn met:", member.guild.memberCount)
        .setColor("#00ff73")
        .setTimestamp()
        .setFooter("©YuulSims Server | Gebruiker gejoind.");

    channel.send(addmemeber);


});

client.on("guildMemberRemove", member => {



    var channel = member.guild.channels.cache.get('673118698441015306');

    if (!channel) return message.channel.send("Dit kanaal niet gevonden.");

    channel.send(`${member} is van de server.`);

    var userIcon = member.user.avatarURL();

    var joinMessage = new discord.MessageEmbed()
        .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL())
        .setThumbnail(userIcon)
        .setDescription(`**${member.user.username} heeft de server verlaten.** \n Met pijn in het hart moeten wij afscheidt nemen van ${member.user.username}`)
        .setColor("#ff5500")
        .addField("We zijn nog met:", member.guild.memberCount)
        .setTimestamp()
        .setFooter("©YuulSims Server | Gebruiker geleavd");

    channel.send(joinMessage);

});
client.on("ready", async () => {

    console.log(`${client.user.username} is online.`);

    client.user.setActivity("| !help");

    client.user.setUsername('YuulSims Server');

});


//var swearWords = ["kanker, piemel, pik, penis, vagina, bitch,  fack you, kut"];



client.on("message", async message => {

    if (message.author.bot) return;

    if (message.channel.type === "dm") return;

    var swearWords = JSON.parse(fs.readFileSync("./Data/swearwords.json"));

    var msg = message.content.toLowerCase();

    for (let i = 0; i < Object.keys(swearWords["vloekWoorden"]).length; i++) {
        if (msg.includes(swearWords["vloekWoorden"][i])) {

            // message.delete();

            //   return message.reply("Gelieve niet de vloeken!").then(msg => msg.delete({ timeout: 3000}));
        }
    }

    var prefix = botConfig.prefix;

    var swearWords = JSON.parse(fs.readFileSync("./Data/swearwords.json"));
    var msg = message.content.toLowerCase();

    var senteceUser = "";
    var annountSwearWords = 0;
    var messageArray = message.content.split(" ");
    for (let y = 0; y < Object.keys(messageArray).length; y++) {

        const words = messageArray[y].toLowerCase();
        var changeWord = "";

        for (let i = 0; i < Object.keys(swearWords["vloekWoorden"]).length; i++) {
           
            if (msg.includes(swearWords["vloekWoorden"][i])) {
                
                changeWord = words.replace(swearWords["vloekWoorden"][i], `******`);

                senteceUser += " " + changeWord;

                annountSwearWords++;
            }

        }

        if (!changeWord) {
            senteceUser += " " + messageArray[y];
        }
    }

    if (annountSwearWords != 0) {

        message.delete
        message.reply(senteceUser).then(msg => msg.delete({ timeout: 3000 }));
        //message.channel.send(senteceUser);
        message.reply("Gelieve niet de vloeken.").then(msg => msg.delete({ timeout: 3000 }));
    }

    var messageArray = message.content.split(" ");

    var commands = messageArray[0];

    var arguments = messageArray.slice(1);

    var commands = client.commands.get(commands.slice(prefix.length));

    var options = {
        active: activeSongs
    };

    if (commands) commands.run(client, message, arguments, options);

});

