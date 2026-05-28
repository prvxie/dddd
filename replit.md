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

- `artifacts/ivera-priv/src/pages/Home.tsx` — hero landing page (route `/`)
- `artifacts/ivera-priv/src/pages/Products.tsx` — products page with Script/External tabs (route `/products`)
- `artifacts/ivera-priv/src/pages/FAQ.tsx` — FAQ accordion page (route `/faq`)
- `artifacts/ivera-priv/src/pages/Admin.tsx` — secret admin panel (route `/:VITE_ADMIN_SLUG`)
- `artifacts/ivera-priv/src/data/products.ts` — all product data and FAQ content (edit here)
- `artifacts/ivera-priv/src/components/` — NavBar, ProductCard, BuyModal
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

Edit `artifacts/ivera-priv/src/data/products.ts` → `PRODUCTS` array to update:
- Prices
- Stock counts
- Descriptions
- Features list

Also edit `FAQS` array in the same file to update FAQ content.

## Admin Panel

The site has a hidden admin panel for tracking orders.

### How to access (3 ways)

1. **Secret URL** — go to `yoursite.com/p0rtal` (change this via `VITE_ADMIN_SLUG` env var)
2. **Konami code** — on the home page, press: ↑ ↑ ↓ ↓ ← → ← → B A
3. `/admin` shows a fake 404 — keeps crawlers/guessers away

### Login

Default password: `iverapriv2025`

To change it before deploying, set `VITE_ADMIN_HASH` in Vercel to the SHA-256 of your password.
Generate your hash at: [https://emn178.github.io/online-tools/sha256.html](https://emn178.github.io/online-tools/sha256.html)

**Hint:** On the login page, type `unlock` on your keyboard to reveal the default password hint.

### What the admin shows

- Order count, pending count, and total revenue stats
- Table of all orders placed via Buy Now (stored in browser localStorage)
- Toggle order status between **pending** and **delivered**
- Delete individual orders or clear all
- Session-based auth (auto-logs out when browser tab closes)

### Vercel env vars for admin

| Variable | Description |
|---|---|
| `VITE_ADMIN_SLUG` | Secret URL path (default: `p0rtal`) — change before deploying |
| `VITE_ADMIN_HASH` | SHA-256 of your admin password (default hash = `iverapriv2025`) |
