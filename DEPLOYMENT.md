# Deployment Guide - Het Spectrum Sollicitaties App

This guide covers deploying your app to Vercel with Turso Cloud database and Vercel Blob storage.

## ✅ Current Setup

### Database: Turso Cloud
- **Status**: ✅ Configured
- **URL**: `libsql://spectrumsollicitaties-jpetillion.aws-eu-west-1.turso.io`
- **Auth Token**: Already set in `.env`
- **Works on**: Both local development and Vercel production

### File Storage: Hybrid System
- **Local Development**: Files stored in `./uploads` directory
- **Vercel Production**: Files stored in Vercel Blob storage
- **Automatic switching**: Based on presence of `BLOB_READ_WRITE_TOKEN`

## 🚀 Deploying to Vercel

### Step 1: Set up Vercel Blob Storage

1. Go to your Vercel dashboard
2. Navigate to your project's **Storage** tab
3. Click **Create Database** → Select **Blob**
4. Once created, copy the **Read-Write Token**

### Step 2: Configure Environment Variables in Vercel

Go to your Vercel project settings → **Environment Variables** and add:

```bash
# Database (Turso Cloud)
TURSO_DATABASE_URL=libsql://spectrumsollicitaties-jpetillion.aws-eu-west-1.turso.io
TURSO_AUTH_TOKEN=eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3Njc2NDE2OTksImlkIjoiMzQzN2NmM2MtZTFlYS00Yzc1LTk4OGYtZmQ4Y2VjZDU5ZDk2IiwicmlkIjoiY2Q2MDNjN2QtZTJlYy00YjQ1LTk1NTUtYWE4NzkwOWU1YmMzIn0.RctYYvOMuPk-Zr7xT7DU3GFbvE3D6zx3ruBEmgv-U77RH-hdsui30wuZjzMtxlESDB8Ufqj02-7ShjCQ2en1DA

# Session Security
SESSION_SECRET=825aa036d3a5ab965a2ee4c5444d6b658d9276aef3e87dece2f144b6475d6530

# File Storage (Vercel Blob)
BLOB_READ_WRITE_TOKEN=your-vercel-blob-token-here
MAX_FILE_SIZE=10485760

# Server Config
NODE_ENV=production
```

**Important**: Replace `your-vercel-blob-token-here` with the actual token from Step 1.

### Step 3: Create `vercel.json` Configuration

The `vercel.json` file should already exist. If not, create it:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server/server.js"
    }
  ]
}
```

### Step 4: Deploy

```bash
# Install Vercel CLI if you haven't
npm install -g vercel

# Deploy
vercel

# Or for production
vercel --prod
```

## 🔄 How File Storage Works

### Development (Local)
- `BLOB_READ_WRITE_TOKEN` is empty in `.env`
- Files are stored in `./uploads/` directory
- Files served via Express static middleware: `/uploads/filename.pdf`

### Production (Vercel)
- `BLOB_READ_WRITE_TOKEN` is set in Vercel environment variables
- Files are uploaded to Vercel Blob storage
- Files served via Vercel's CDN: `https://vercel.blob.com/pathname`

### Code Automatically Handles Both
The `server/storage/blob-storage.js` module detects the environment and:
- Uses Vercel Blob when `BLOB_READ_WRITE_TOKEN` is present
- Falls back to local filesystem when it's not

## 📋 Pre-Deployment Checklist

- [x] Turso Cloud database created and seeded
- [x] Environment variables configured in `.env` for local
- [ ] Vercel Blob storage created
- [ ] Environment variables added to Vercel dashboard
- [ ] `vercel.json` configuration verified
- [ ] Build tested locally: `npm run build`
- [ ] Production environment variable `NODE_ENV=production` set

## 🧪 Testing Before Deployment

1. **Test with production environment**:
   ```bash
   NODE_ENV=production node server/server.js
   ```

2. **Verify database connection**:
   - Try logging in with test accounts
   - Check if data loads correctly

3. **Test file uploads** (after adding `BLOB_READ_WRITE_TOKEN`):
   - Upload a CV/letter
   - Verify it appears in Vercel Blob dashboard
   - Check if download works

## 🔐 Security Notes

1. **Never commit `.env` to Git** - It's already in `.gitignore`
2. **Rotate secrets** before going to production
3. **Use different session secrets** for dev and production
4. **Set strong passwords** for production user accounts

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Test Turso connection
turso db shell spectrumsollicitaties
```

### File Upload Issues
- Check `BLOB_READ_WRITE_TOKEN` is set in Vercel
- Verify Vercel Blob storage is enabled
- Check file size limits (default: 10MB)

### Session Issues
- Ensure `SESSION_SECRET` is set
- Check cookie settings in production (secure/sameSite)

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Turso Documentation](https://docs.turso.tech/)
- [Vercel Blob Documentation](https://vercel.com/docs/storage/vercel-blob)
