# Full Vercel Setup Tutorial — Frontend + Backend

## Overview
- **Frontend:** `https://github.com/prvxie/reppo` (deployed separately)
- **Backend:** `https://github.com/prvxie/dddd` (deployed separately)
- **Backend URL:** `https://dddd-plum.vercel.app`

---

## Step 1: Backend Deployment (Already Done)

Your backend is live at: `https://dddd-plum.vercel.app`

### Backend Environment Variables (Add these in Vercel):

Go to your backend Vercel project → **Settings → Environment Variables**:

| Variable | Value | Required |
|----------|-------|----------|
| `DISCORD_BOT_TOKEN` | Your Discord bot token | Yes |
| `DISCORD_WEBHOOK_URL` | Your Discord webhook URL | Yes |
| `FRONTEND_URL` | Your frontend URL (update after frontend deploys) | Yes |
| `NODE_ENV` | `production` | Yes |

**Note:** `PORT` is set automatically by Vercel.

---

## Step 2: Frontend Deployment

### 2.1 Create New Vercel Project

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import from GitHub → Select **`prvxie/reppo`**
3. Click **Import**

### 2.2 Configure Build Settings

Override these settings:

| Setting | Value |
|---------|-------|
| **Framework Preset** | Other |
| **Root Directory** | `./` (leave blank/default) |
| **Build Command** | `npm install && npx vite build --config vite.config.ts` |
| **Output Directory** | `dist/public` |
| **Install Command** | `npm install` |

### 2.3 Add Environment Variables

Before deploying, add these in **Project Settings → Environment Variables**:

| Variable | Example Value | Required |
|----------|---------------|----------|
| `VITE_API_URL` | `https://dddd-plum.vercel.app` | **Yes** — connects to backend |
| `VITE_BTC_ADDRESS` | `bc1q...yourbtcaddress` | Yes |
| `VITE_LTC_ADDRESS` | `ltc1q...yourltcaddress` | Yes |
| `VITE_ETH_ADDRESS` | `0x...yourethaddress` | Yes |
| `VITE_GAMEPASS_LINK` | `https://www.roblox.com/game-pass/12345678` | Yes |
| `VITE_ADMIN_SLUG` | `your-secret-admin-url` | Yes |

### 2.4 Deploy

Click **Deploy** and wait for the build to complete.

---

## Step 3: Update Backend with Frontend URL

After your frontend deploys, copy the deployed URL (e.g., `https://reppo-xyz.vercel.app`) and add it to your **backend** environment variables:

| Variable | Value |
|----------|-------|
| `FRONTEND_URL` | `https://reppo-xyz.vercel.app` |

---

## Step 4: Discord Bot Setup

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application → Go to **Bot** tab
3. Click **Reset Token** → Copy the token
4. Add the token to your **backend** env vars: `DISCORD_BOT_TOKEN`
5. Create a Discord webhook in your server:
   - Server Settings → Integrations → Webhooks
   - New Webhook → Copy URL
   - Add to backend env vars: `DISCORD_WEBHOOK_URL`

---

## Troubleshooting

| Error | Fix |
|-------|-----|
| `Failed to place order` | Check `VITE_API_URL` is set correctly in frontend env vars |
| `vite: command not found` | Make sure all deps are in `dependencies` (not `devDependencies`) |
| `Cannot find module` | Make sure `npm install` runs successfully |
| CORS errors | Backend already has `cors()` enabled — check `FRONTEND_URL` is correct |

---

## File Structure Summary

### Frontend Repo (`reppo`)
```
reppo/
├── attached_assets/        # Images
├── public/                   # Static files
├── src/                      # React components
├── index.html
├── package.json              # All deps in "dependencies"
├── tsconfig.json             # Self-contained (no extends)
├── vite.config.ts            # @assets alias points to local folder
└── vercel.json               # Build command + output directory
```

### Backend Repo (`dddd`)
```
dddd/
├── artifacts/api-server/
│   ├── src/                  # Express routes
│   ├── dist/                 # Build output
│   ├── package.json          # All build deps in "dependencies"
│   ├── build.mjs             # esbuild script
│   └── vercel.json           # Build config
```

---

## Quick Checklist

- [ ] Backend deployed with env vars (DISCORD_BOT_TOKEN, DISCORD_WEBHOOK_URL)
- [ ] Frontend deployed with VITE_API_URL pointing to backend
- [ ] Frontend URL added to backend FRONTEND_URL
- [ ] Discord bot invited to server with DM permissions
- [ ] Webhook created and URL copied to backend env vars
