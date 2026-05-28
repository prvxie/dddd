# Ivera Storefront

A modern Roblox exploit storefront with Stripe payment integration.

## Features

- **Modern UI**: Built with React, TailwindCSS, and Framer Motion
- **Payment Integration**: Supports Stripe (card payments), Bitcoin, Litecoin, Ethereum, and Robux
- **Admin Panel**: Secret admin panel for order management
- **Responsive Design**: Works on all devices

## Project Structure

- `artifacts/ivera-priv/` - Frontend React application
- `artifacts/api-server/` - Backend Express API with Stripe integration
- `lib/` - Shared libraries
- `scripts/` - Build and utility scripts

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm package manager

### Installation

```bash
# Install dependencies
pnpm install

# Run frontend development server
cd artifacts/ivera-priv
pnpm dev

# Run backend development server
cd artifacts/api-server
pnpm dev
```

### Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Required variables:
- `VITE_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key for frontend
- `STRIPE_SECRET_KEY` - Stripe secret key for backend
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook secret
- `VITE_BTC_ADDRESS` - Bitcoin wallet address
- `VITE_LTC_ADDRESS` - Litecoin wallet address
- `VITE_ETH_ADDRESS` - Ethereum wallet address

## Deployment

### Frontend (Vercel)

1. Connect your GitHub repository to Vercel
2. Set root directory to `artifacts/ivera-priv`
3. Add environment variables in Vercel dashboard
4. Deploy

### Backend (Vercel)

1. Create a new Vercel project for the backend
2. Set root directory to `artifacts/api-server`
3. Add environment variables
4. Deploy

## Payment Methods

- **Stripe**: Credit/debit card payments (recommended)
- **Bitcoin**: Direct BTC transfers
- **Litecoin**: Direct LTC transfers
- **Ethereum**: Direct ETH transfers
- **Robux**: Gamepass purchases

## Admin Panel

Access the admin panel by navigating to `/p0rtal` (or your custom admin slug) and entering the secret key.

## License

MIT
