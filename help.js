const discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    
    var boticon = client.user.displayAvatarURL();
   try{

    var helpEmbed = new discord.MessageEmbed()
    .setTitle("**YuulSims Sever Bot Commando's.**")
            .setThumbnail(boticon)
            .setFooter("©YuulSims Server | Met dank dank aan Jonasvldv ❤️")
            .setColor("#24f8ff")
            .setDescription("**Fijn dat je zijn commando's wilt opvragen.** \n Elk commando moet je opvragen met !.")
            .addField("**__Algemeen__**", "**!hallo** Zeg hallo tegen de bot. \n **!review** We zouden het leuk vinden als je een review schrijft over de server. \n ")
            .addField("**__Info__**", "**!help** Dan krijg je dit berichtje! \n **!ping** Laat de respnstijd zien van de bot. \n **!regels** Kan je ook terug vinden in hnet channel van de regels. \n **!welkom** Kan je ook terug vinden het het welkoms channel. \n **!ranks** Laat de ranks zien van de server. \n **!match** Kan je terug vinden in het vast gepinde bericht in Match-info.")
            .addField("Games", "**!rps** Speel blad, steen, schaar. \n **COMMING SOON**")
            .addField("**__Ticket__**", "**!ticket** Maak een ticket aan.\n **!close** doe het ticket toe.")
            .addField("**__Muziek__**", "**!play** Start de muziek in een voice channel. \n **!leave** De bot stop met muziek spelen en gaat uit de channel. \n **!search** Zoek op YT een leuk liedje uit. \n **!queue** Laat de playlist zien van de muziek. \n **!pauze** Zorg dat muziek op pauze gaat. \n **!resume** Laat de muziek opnieuwe spelen. \n **!skip** Ga naar de volgende plaat. \n **!volume** Verander van volume in de channel.")
            .addField("**__Alleen admins__**", "**!ac** Maak een een belangerijk bericht. \n **!ban** Om iemand de bannen in de server. \n **!clear** Laat berichtjes verwijderen. \n **!kick** Om iemand van de server te verwijderen. \n **!mute** Laat iemand niks meer doen in de server. \n **!warn** Geef een waarschuwing. **!wed** Maak een bericht aan voor Match Day. ");

           
        message.author.send(helpEmbed);

        message.reply("Al de commando's staan in je privé berichten! :mailbox_with_mail:");


   }catch(err){
       message.reply("Er is iets fout gelopen.")
   }
}



module.exports.help = {

    name: "help",
    

}