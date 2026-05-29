module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    return res.status(500).json({ error: "Webhook not configured" });
  }

  const { productName, price, email, paymentMethod, discordUsername, discordUserId } = req.body || {};

  const paymentColors = {
    BTC: 0xf7931a,
    LTC: 0x345d9d,
    ETH: 0x627eea,
    Robux: 0x00b06f,
  };

  const embed = {
    title: "New Order — ivera.priv",
    color: paymentColors[paymentMethod] || 0xffffff,
    fields: [
      { name: "Product", value: productName || "Unknown", inline: true },
      { name: "Price", value: `$${price || 0}`, inline: true },
      { name: "Payment Method", value: paymentMethod || "Unknown", inline: true },
      { name: "Email", value: email || "Not provided", inline: false },
      { name: "Discord", value: discordUsername || "_not provided_", inline: false },
      { name: "Discord User ID", value: discordUserId || "_not provided_", inline: false },
    ],
    footer: { text: "ivera.priv order system" },
    timestamp: new Date().toISOString(),
  };

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ embeds: [embed] }),
    });
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return res.status(500).json({ error: "Failed to send webhook" });
  }
};
