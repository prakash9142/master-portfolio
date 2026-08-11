# Portfolio Backend

Email handler for the portfolio contact form.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure `.env` with your Gmail credentials:
   - `SMTP_USER`: your Gmail address
   - `SMTP_PASS`: [Gmail app password](https://myaccount.google.com/apppasswords) (not your regular password)
   - `RECIPIENT_EMAIL`: where contact form emails should be sent (thekriyak@gmail.com)

3. Start the server:
```bash
npm run dev
```

Server runs on `http://localhost:5000`

## API

### POST /api/contact

Send a contact form submission.

**Request body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Your project brief here"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

## Deployment

For InfinityFree, you'll need a separate Node.js host like:
- Render.com (free tier available)
- Railway.app
- Vercel (with serverless functions)
- Replit

See deployment instructions in each service's docs.
