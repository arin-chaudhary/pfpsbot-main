require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const greetings = ["hi", "hello", "hey", "heyy", "yo", "hola"];

const jokes = [
  "Why don’t skeletons fight each other? They don’t have the guts.",
  "Why did the scarecrow win an award? Because he was outstanding in his field!",
  "I told my dog 10 jokes. He didn’t laugh once. Guess he’s more of a cat person.",
  "Why can’t your nose be 12 inches long? Because then it would be a foot.",
  "I only know 25 letters of the alphabet. I don’t know y.",
  "Why did the bicycle fall over? Because it was two-tired!",
  "What do you call cheese that isn't yours? Nacho cheese!",
  "Parallel lines have so much in common… it’s a shame they’ll never meet.",
  "What do you call fake spaghetti? An impasta!",
  "I would tell you a construction joke, but I’m still working on it.",
];

client.on("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  const msg = message.content.toLowerCase();
  if (greetings.includes(msg)) {
    message.reply("Hey there, it's PFP here!");
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === "info") {
    const user = options.getUser("user");
    const member = interaction.guild.members.cache.get(user.id);
    return interaction.reply({
      content: `🧾 Info about **${user.username}**:
- ID: ${user.id}
- Tag: ${user.tag}
- Joined Server: ${member?.joinedAt?.toLocaleDateString() || "unknown"}
- Account Created: ${user.createdAt.toLocaleDateString()}`,
      ephemeral: false,
    });
  }

  if (commandName === "joke") {
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    return interaction.reply(randomJoke);
  }

  if (commandName === "avatar") {
    const user = options.getUser("user");
    return interaction.reply({
      content: `${user.username}'s avatar: ${user.displayAvatarURL({
        dynamic: true,
        size: 512,
      })}`,
    });
  }
});

client.login(process.env.BOT_TOKEN);
