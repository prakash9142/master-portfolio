# Vercel Deployment Guide

Your portfolio is ready to deploy on Vercel with a serverless email backend.

## What's Set Up

- **Frontend:** React + Vite app (builds to `dist/`)
- **Backend:** Serverless function at `/api/contact` (handles email submissions)
- **Email:** Nodemailer sends emails via Gmail SMTP

## Deploy to Vercel

### 1. Connect Your GitHub Repo to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Select `master-portfolio` repo
5. Click "Import"

### 2. Set Environment Variables

In Vercel project settings, add these environment variables:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
RECIPIENT_EMAIL=thekriyak@gmail.com
```

**Important:** Use Gmail app password, not your regular password:
1. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. Select "Mail" and "Windows Computer"
3. Copy the generated 16-character password
4. Paste as `SMTP_PASS`

### 3. Deploy

1. Click "Deploy"
2. Wait for build to complete
3. Your site is live at `https://[project-name].vercel.app`

## Testing Locally

### 1. Start Express Backend
```bash
cd server
npm run dev
```
Server runs on `http://localhost:5000`

### 2. Start Frontend (new terminal)
```bash
npm run dev
```
Frontend runs on `http://localhost:5173`

### 3. Test Contact Form

- Go to http://localhost:5173
- Fill out contact form
- Submit → should see success message
- Check your email at `thekriyak@gmail.com`

**Note:** The Vite proxy (`vite.config.ts`) routes `/api` calls to `localhost:5000` during development.

## Project Structure

```
.
├── src/                    # React frontend
│   └── components/sections/ContactSection.tsx  # Contact form
├── api/
│   └── contact.js         # Vercel serverless function
├── server/                 # Express backend (local dev only)
├── vite.config.ts         # Vite + API proxy config
├── vercel.json            # Vercel build settings
└── package.json           # Dependencies (includes nodemailer)
```

## How It Works

1. **Locally:** Contact form → Vite proxy → Express server → Nodemailer → Gmail
2. **On Vercel:** Contact form → Vercel serverless function → Nodemailer → Gmail

## Troubleshooting

**"Connection failed" error?**
- Vercel: Check that environment variables are set correctly
- Local: Make sure `npm run dev` (Express server) is running

**Email not sending?**
- Verify Gmail app password is correct (not your regular password)
- Check that "Less secure app access" is allowed in Gmail settings
- Verify `RECIPIENT_EMAIL` is correct

**404 on `/api/contact`?**
- Locally: Restart Vite dev server (`npm run dev`)
- Vercel: Redeploy the project

## Next Steps

1. Commit changes: `git add -A && git commit -m "Setup Vercel deployment with serverless email"`
2. Push to GitHub: `git push origin main`
3. Deploy via Vercel dashboard
4. Test at your live domain
