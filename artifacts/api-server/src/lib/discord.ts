import { Client, GatewayIntentBits, TextChannel } from 'discord.js';

let discordClient: Client | null = null;

export function getDiscordClient(): Client {
  if (!discordClient) {
    const token = process.env.DISCORD_BOT_TOKEN;
    if (!token) {
      throw new Error('DISCORD_BOT_TOKEN environment variable is not set');
    }

    discordClient = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages,
      ],
    });

    discordClient.login(token).catch((error) => {
      console.error('Failed to login to Discord:', error);
    });
  }

  return discordClient;
}

export async function sendDiscordDM(userId: string, message: string): Promise<boolean> {
  try {
    const client = getDiscordClient();
    
    // Wait for bot to be ready
    if (!client.isReady()) {
      await new Promise<void>((resolve) => {
        client.once('ready', () => resolve());
      });
    }

    const user = await client.users.fetch(userId);
    await user.send(message);
    return true;
  } catch (error) {
    console.error('Failed to send Discord DM:', error);
    return false;
  }
}

export async function sendDiscordChannelMessage(channelId: string, message: string): Promise<boolean> {
  try {
    const client = getDiscordClient();
    
    // Wait for bot to be ready
    if (!client.isReady()) {
      await new Promise<void>((resolve) => {
        client.once('ready', () => resolve());
      });
    }

    const channel = await client.channels.fetch(channelId);
    if (channel && channel instanceof TextChannel) {
      await channel.send(message);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Failed to send Discord channel message:', error);
    return false;
  }
}
