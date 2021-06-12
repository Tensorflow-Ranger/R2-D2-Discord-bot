const Discord = require("discord.js");
client = new Discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION"]});
const plotly = require('plotly')("allenturing2027", "BMJmLcCh27NKMEWG1vbu")
const fs = require('fs');

const Emojis = ['🤩', '😍', '😀', '🥳'];

global.index = 0
global.poll_message = ""
var dict = {};
global.options = []

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message", msg => {
  if (msg.author.bot) return 
  if (msg.content.includes("/poll")) {
      values = []
      global.EmojiCount = 0
      var message = msg.content;
      var qanda = message.split('q:')[1];
      var q = qanda.split('a:')[0];
      var a = qanda.split('a:')[1];
      options = a.split(',');
      poll_message = ""
      index = 0;
      for (const option of options) {
        index = options.indexOf(option);
        poll_message += '\n' + Emojis[index] + '  for' + `${option}\n`
        dict[option] = 0
      }
      let embed = new Discord.MessageEmbed()
      .setTitle(q)
      .setDescription(poll_message)
      .setColor("RED")
  
      msg.channel.send(embed).then(msgReaction => {
        for (var noofelements of Array(options.length).keys()) {
          msgReaction.react(Emojis[noofelements])
        }
        const filter = (reaction, user) => {
	      return reaction && user.id;
        };
        })
  }
  if(msg.content.includes("/publish")) {
      console.log("works")
      values = []
      for (var option of options){
        values.push(dict[option])
      }
      var trace1 = 
      {x: options,
      y: values,
      type: "bar"
      };
      var figure = { 'data': [trace1] };

      var imgOpts = {
      format: 'png',
      width: 600,
      height: 250};
      plotly.getImage(figure, imgOpts, function (error, imageStream) {
          if (error) return console.log (error);
          var fileStream = fs.createWriteStream('1.png');
          imageStream.pipe(fileStream);
          msg.channel.send("Poll Results", {files: ["./1.png"]});
      });
  }
  if(msg.content.includes("/help")){
      let embed = new Discord.MessageEmbed()
      .setTitle("DOCUMENTATION")
      .setDescription("**Start a Poll** \n /poll q: <Polling Question> a: <options separated by comma>\n \n ** Publish Results** \n /publish")
      .setColor("BLUE")
      console.log("works")
      msg.channel.send(embed)    
  }
  
})

global.EmojiCount = 0
client.on("messageReactionAdd", async (reaction, user) =>{
  EmojiCount += 1
  if (EmojiCount > options.length) {
    dict[options[Emojis.indexOf(reaction.emoji.name)]] += 1
}
})

client.login('ODQ5Mjc2ODQyMDU3MDA3MTE1.YLY0sQ.2EBYjXezrQr_E6p0Iwu8wXTaVRc');


