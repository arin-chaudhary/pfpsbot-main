require("dotenv").config();
const { REST, Routes, SlashCommandBuilder } = require("discord.js");

const commands = [
  new SlashCommandBuilder()
    .setName("info")
    .setDescription("Get info about a user")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user to get info about")
        .setRequired(true)
    ),

  new SlashCommandBuilder().setName("joke").setDescription("Get a random joke"),

  new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Show user's avatar")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("User to show avatar of")
        .setRequired(true)
    ),
].map((cmd) => cmd.toJSON());

const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN);

(async () => {
  try {
    console.log("🚀 Registering slash commands...");

    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: commands,
    });

    console.log("✅ Slash commands registered!");
  } catch (err) {
    console.error(err);
  }
})();
