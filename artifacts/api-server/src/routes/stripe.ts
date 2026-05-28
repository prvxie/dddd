import { Router, type IRouter } from "express";
import Stripe from "stripe";
import fetch from "node-fetch";

const router: IRouter = Router();

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-11-20.acacia',
});

// Send Discord webhook notification
async function sendDiscordWebhook(orderData: any) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    console.warn('Discord webhook URL not configured');
    return;
  }

  const embed = {
    title: `🛒 New Order: ${orderData.productName}`,
    color: 0x00ff00,
    fields: [
      { name: 'Product', value: orderData.productName, inline: true },
      { name: 'Price', value: `$${orderData.price}`, inline: true },
      { name: 'Email', value: orderData.email, inline: true },
      { name: 'Payment Method', value: orderData.paymentMethod, inline: true },
      { name: 'Discord', value: orderData.discordUsername || 'Not provided', inline: true },
    ],
    timestamp: new Date().toISOString(),
  };

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ embeds: [embed] }),
    });
    console.log('Discord webhook sent successfully');
  } catch (error) {
    console.error('Failed to send Discord webhook:', error);
  }
}

// Send product delivery via Discord bot
async function sendProductDelivery(discordUserId: string, productName: string, productKey: string) {
  try {
    const { sendDiscordDM } = await import("../lib/discord");
    
    const message = `
✅ **Purchase Confirmed!**

Thank you for purchasing **${productName}**!

🔑 **Your Product Key:** \`${productKey}\`

📋 **Instructions:**
1. Copy the product key above
2. Use it in the executor to activate your script
3. Enjoy your purchase!

If you need help, join our Discord support server.
    `.trim();

    const success = await sendDiscordDM(discordUserId, message);
    if (success) {
      console.log(`Product delivery sent to Discord user: ${discordUserId}`);
    }
    return success;
  } catch (error) {
    console.error('Failed to send product delivery:', error);
    return false;
  }
}

router.post('/create-checkout-session', async (req, res) => {
  try {
    const { productName, price, email, discordUserId } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: productName,
            },
            unit_amount: Math.round(price * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/products`,
      customer_email: email,
      metadata: {
        productName,
        price: price.toString(),
        discordUserId: discordUserId || '',
      },
    });

    res.json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Order endpoint for crypto/manual payments
router.post('/order', async (req, res) => {
  try {
    const { productName, price, email, paymentMethod, discordUsername, discordUserId } = req.body;

    // Generate a product key
    const productKey = `IVERA-${productName.toUpperCase().replace(/\s/g, '-')}-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

    // Send Discord webhook notification to admin channel
    await sendDiscordWebhook({
      productName,
      price,
      email,
      paymentMethod,
      discordUsername,
      productKey,
    });

    // Send product delivery to user via Discord bot if userId provided
    if (discordUserId) {
      await sendProductDelivery(discordUserId, productName, productKey);
    }

    res.json({ 
      success: true, 
      message: 'Order received',
      productKey: discordUserId ? undefined : productKey // Only return key if no Discord delivery
    });
  } catch (error: any) {
    console.error('Order error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Stripe success webhook handler
router.post('/stripe-success', async (req, res) => {
  try {
    const { session_id } = req.body;
    
    const session = await stripe.checkout.sessions.retrieve(session_id);
    const { productName, discordUserId } = session.metadata;

    if (productName && discordUserId) {
      const productKey = `IVERA-${productName.toUpperCase().replace(/\s/g, '-')}-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
      
      await sendProductDelivery(discordUserId, productName, productKey);
      
      // Also notify admin channel
      await sendDiscordWebhook({
        productName,
        price: session.amount_total / 100,
        email: session.customer_details?.email,
        paymentMethod: 'Stripe Card',
        discordUsername: discordUserId,
        productKey,
      });
    }

    res.json({ success: true });
  } catch (error: any) {
    console.error('Stripe success error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
