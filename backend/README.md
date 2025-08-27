# CV Backend API - Vercel Deployment

Backend API for the CV project, deployed on Vercel.

## Quick Deploy to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
cd backend
vercel --prod
```

4. Set environment variables in Vercel dashboard:
- `EMAIL_USER`: your-email@gmail.com  
- `EMAIL_PASS`: your-app-password

## Local Development

```bash
npm run dev
```

## API Endpoints

- `GET /api/check` - Health check
- `POST /api/send-email` - Send contact form email

## Environment Variables

Required for production:
- `EMAIL_USER`: Gmail address
- `EMAIL_PASS`: Gmail app password (not regular password)

## After Deployment

1. Get your Vercel URL from deployment output
2. Update `API_BASE` in frontend: `src/api/email.ts`
3. Replace `https://cv-backend-vercel.vercel.app` with your actual Vercel URL
