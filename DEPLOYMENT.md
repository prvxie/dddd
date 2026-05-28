# Deployment Guide

## Prerequisites

1. Create a GitHub repository for this project
2. Create a Stripe account and get your API keys
3. Create a Vercel account

## Step 1: Push to GitHub

```bash
# Navigate to project directory
cd c:\Users\veskx\Downloads\Ivera-Storefront\Ivera-Storefront

# Add all files
git add .

# Commit changes
git commit -m "Initial commit with Stripe integration and deployment config"

# Add your GitHub repository as remote (replace with your repo URL)
git remote add origin https://github.com/your-username/your-repo.git

# Push to GitHub
git push -u origin main
```

## Step 2: Deploy Frontend to Vercel

1. Go to [Vercel](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure the project:
   - **Root Directory**: `artifacts/ivera-priv`
   - **Framework Preset**: Other
   - **Build Command**: `cd .. && pnpm install && cd ivera-priv && pnpm build`
   - **Output Directory**: `dist`
5. Add environment variables:
   - `VITE_STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key (pk_live_...)
   - `VITE_BTC_ADDRESS`: Your Bitcoin wallet address
   - `VITE_LTC_ADDRESS`: Your Litecoin wallet address
   - `VITE_ETH_ADDRESS`: Your Ethereum wallet address
   - `VITE_ADMIN_SLUG`: Your admin panel slug (default: p0rtal)
6. Click "Deploy"

## Step 3: Deploy Backend to Vercel

1. Create another new project in Vercel
2. Import the same GitHub repository
3. Configure the project:
   - **Root Directory**: `artifacts/api-server`
   - **Framework Preset**: Other
   - **Build Command**: `pnpm install && pnpm run build`
   - **Output Directory**: `dist`
4. Add environment variables:
   - `FRONTEND_URL`: Your frontend Vercel URL (from Step 2)
   - `PORT`: `3001`
   - `DISCORD_BOT_TOKEN`: Your Discord bot token
   - `DISCORD_WEBHOOK_URL`: Your Discord webhook URL for order notifications
5. Click "Deploy"

## Step 4: Configure Discord Bot

1. Go to [Discord Developer Portal](https://discord.comdevelopers/applications)
2. Create a new application and enable bot
3. Get your bot token and add it to backend environment variables as `DISCORD_BOT_TOKEN`
4. Enable necessary bot intents:
   - Server Members Intent
   - Message Content Intent
   - Direct Messages Intent
5. Create a webhook in your Discord server for order notifications
6. Add webhook URL to backend environment variables as `DISCORD_WEBHOOK_URL`

## What is VITE_ADMIN_SLUG?

`VITE_ADMIN_SLUG` is a secret URL path to access the admin panel. For example, if set to `p0rtal`, you can access the admin panel at:
`your-site.com/p0rtal`

This keeps your admin panel hidden from public view. Change it to something unique and secret.

## Step 5: Update Frontend API URL

After deploying both frontend and backend, update the frontend to use the correct backend URL:

1. Go to your frontend Vercel project settings
2. Add environment variable: `VITE_API_URL` with your backend Vercel URL
3. Redeploy the frontend

## Testing

1. Visit your frontend URL
2. Try purchasing a product with crypto (BTC/LTC/ETH)
3. Verify the Discord webhook was received in your server
4. If you provided a Discord User ID, check your DMs for the product key
5. Test Robux payment flow and verify Discord notifications

## Environment Variables Reference

### Frontend (.env)
```
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
VITE_BTC_ADDRESS=your_btc_address
VITE_LTC_ADDRESS=your_ltc_address
VITE_ETH_ADDRESS=your_eth_address
VITE_ADMIN_SLUG=p0rtal
VITE_API_URL=https://your-backend.vercel.app
```

### Backend (.env)
```
STRIPE_SECRET_KEY=sk_live_...
FRONTEND_URL=https://your-frontend.vercel.app
PORT=3001
DISCORD_BOT_TOKEN=your_discord_bot_token
DISCORD_WEBHOOK_URL=your_discord_webhook_url
```

## Troubleshooting

### Build fails on Vercel
- Ensure pnpm is being used (it's required by the workspace)
- Check that all dependencies are in the workspace catalog

### Crypto payments not working
- Verify wallet addresses are correct in frontend environment variables
- Check that backend is deployed and running

### Discord notifications not working
- Verify DISCORD_BOT_TOKEN is correct
- Check that bot has proper intents enabled
- Verify DISCORD_WEBHOOK_URL is valid
- Check backend logs for Discord errors

### Backend API not reachable
- Check that the backend is deployed and running
- Verify CORS settings allow requests from your frontend
- Check Vercel function logs for errors
