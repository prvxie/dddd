# ivera.priv

A digital product storefront for ivera.priv — selling premium Roblox scripts (Script + External). Black/white theme, category tabs, product accordions, and a checkout flow with Discord order notifications.

## Run & Operate (Replit)

- Frontend preview runs automatically via the `artifacts/ivera-priv: web` workflow
- `pnpm run typecheck` — full typecheck across all packages

## Stack

- **Frontend**: React + Vite, Tailwind CSS, shadcn/ui, framer-motion, wouter
- **Payments**: Crypto (BTC/LTC/ETH) manual wallet + Robux manual gamepass
- **Order notifications**: Discord webhook via Vercel Edge Function (`api/order.ts`)
- pnpm workspaces, Node.js 24, TypeScript 5.9

## Where things live

- `artifacts/ivera-priv/src/pages/Home.tsx` — main page, product data, category tabs
- `artifacts/ivera-priv/src/components/` — NavBar, CategoryHero, ProductCard, BuyModal
- `artifacts/ivera-priv/api/order.ts` — Vercel Edge Function: posts order to Discord webhook
- `artifacts/ivera-priv/vercel.json` — Vercel deployment config

## Deploying to Vercel

1. Push your code to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Set **Root Directory** to `artifacts/ivera-priv`
4. Vercel will auto-detect the `vercel.json` config
5. Add these **Environment Variables** in Vercel project settings:

| Variable | Description |
|---|---|
| `DISCORD_WEBHOOK_URL` | Your Discord channel webhook URL (see below) |
| `VITE_BTC_ADDRESS` | Your Bitcoin wallet address |
| `VITE_LTC_ADDRESS` | Your Litecoin wallet address |
| `VITE_ETH_ADDRESS` | Your Ethereum wallet address |

6. Deploy. Your site will be live at `your-project.vercel.app`

## Setting up Discord Webhook (for order notifications)

1. In Discord, go to your server → channel settings → **Integrations** → **Webhooks**
2. Click **New Webhook**, name it "ivera.priv orders", copy the URL
3. Add it as `DISCORD_WEBHOOK_URL` in Vercel environment variables
4. Every Buy Now submission will post a rich embed to that channel with product, price, email, payment method

## Crypto Payment Setup

The site uses **manual wallet addresses** — buyers send crypto to your wallet, then you verify and deliver.

### How it works
1. Buyer clicks Buy Now → fills out checkout form (email, payment method)
2. Site shows your wallet address + exact amount to send
3. Vercel Function sends an order notification to your Discord
4. You verify payment on-chain and deliver the product via email

### To set your wallet addresses
In `artifacts/ivera-priv/src/components/BuyModal.tsx`, update the `WALLET_ADDRESSES` object:
```ts
const WALLET_ADDRESSES = {
  BTC: "your-btc-address-here",
  LTC: "your-ltc-address-here",
  ETH: "your-eth-address-here",
};
```
Or set them as Vercel env vars (`VITE_BTC_ADDRESS`, etc.) and read via `import.meta.env.VITE_BTC_ADDRESS`.

### Upgrading to automated crypto payments (optional)
When you're ready for automatic payment confirmation:
- **NOWPayments** (nowpayments.io) — easy API, free tier, supports BTC/LTC/ETH
- **CoinPayments** — widely used, more features
- Both provide a webhook that fires when payment confirms, so you can auto-deliver

## Robux Payment Setup

1. Create a Roblox Group or a dedicated Gamepass on Roblox
2. Set the gamepass price = product price in Robux (use a Robux-to-USD calculator)
3. In `BuyModal.tsx`, update the Robux instructions with your actual gamepass link
4. Buyers purchase the gamepass → send screenshot to your Discord

## User preferences

- Black and white theme only (no colors)
- Space Grotesk font
- One Roblox character image in hero only (not duplicated)
- Buy Now button (no cart system)
- Keep it simple — no overcomplicated layouts

## Product data

Edit `artifacts/ivera-priv/src/pages/Home.tsx` → `PRODUCTS` array to update:
- Prices
- Stock counts
- Descriptions
- Features list
