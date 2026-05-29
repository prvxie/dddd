import { Router, type IRouter, type Request, type Response } from "express";

const router: IRouter = Router();

router.post("/order", async (req: Request, res: Response) => {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    return res.status(500).json({ error: "Webhook not configured" });
  }

  const { productName, price, email, paymentMethod, discordUsername, discordUserId } = req.body;

  const paymentColors: Record<string, number> = {
    BTC: 0xf7931a,
    LTC: 0x345d9d,
    ETH: 0x627eea,
    Robux: 0x00b06f,
  };

  const embed = {
    title: "New Order — ivera.priv",
    color: paymentColors[paymentMethod] ?? 0xffffff,
    fields: [
      { name: "Product", value: productName, inline: true },
      { name: "Price", value: `$${price}`, inline: true },
      { name: "Payment Method", value: paymentMethod, inline: true },
      { name: "Email", value: email, inline: false },
      {
        name: "Discord",
        value: discordUsername || "_not provided_",
        inline: false,
      },
      {
        name: "Discord User ID",
        value: discordUserId || "_not provided_",
        inline: false,
      },
    ],
    footer: { text: "ivera.priv order system" },
    timestamp: new Date().toISOString(),
  };

  try {
    const discordRes = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ embeds: [embed] }),
    });

    if (!discordRes.ok) {
      return res.status(500).json({ error: "Failed to notify Discord" });
    }

    return res.status(200).json({ success: true });
  } catch {
    return res.status(500).json({ error: "Failed to send webhook" });
  }
});

export default router;
