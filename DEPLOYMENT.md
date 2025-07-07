# Deploying TweetBlog to GitHub Pages

## Overview
TweetBlog can be deployed to GitHub Pages as a static site. Since this is a full-stack application with a backend, you'll need to deploy the frontend as a static site and host the backend separately.

## Option 1: Frontend-Only Deployment (Recommended for GitHub Pages)

### 1. Prepare the Project
```bash
# Build the frontend only
npm run build:static
```

### 2. Set up GitHub Repository
1. Create a new repository on GitHub
2. Push your code to the repository:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/tweetblog.git
git push -u origin main
```

### 3. Configure GitHub Pages
1. Go to your repository settings
2. Navigate to "Pages" section
3. Set source to "GitHub Actions"
4. The provided `.github/workflows/deploy.yml` will handle deployment

### 4. Update for Static Deployment
Since GitHub Pages only serves static files, you'll need to modify the app to work without the backend:

1. **Use Mock Data**: The app can fall back to demo data when API calls fail
2. **Client-Side Only**: All timeline generation will use the demo timeline
3. **Static Assets**: All assets will be served from the static build

## Option 2: Hybrid Deployment (Frontend + Separate API)

### Step 1: Deploy the Simple API Backend
I've created a lightweight backend API in the `backend-api/` folder:

**Quick Deploy to Vercel:**
```bash
cd backend-api
npm install -g vercel
vercel
```

**Or deploy to Railway:**
```bash
npm install -g @railway/cli
railway deploy
```

**Or deploy to Render:**
1. Create account at render.com
2. Connect repository and select `backend-api` folder
3. Set environment variables

### Step 2: Configure Your GitHub Pages Frontend
1. Update `.github/workflows/deploy.yml` with your API URL:
   ```yaml
   env:
     VITE_API_URL: https://your-api-url.vercel.app
   ```

2. Deploy frontend to GitHub Pages (automatic on push)

### Backend Features:
- ✅ Real Twitter API integration
- ✅ Handles rate limiting and errors
- ✅ CORS configured for GitHub Pages
- ✅ Lightweight and fast
- ✅ Easy deployment to multiple platforms

## Configuration Files Provided

### `.github/workflows/deploy.yml`
- Automatic deployment on push to main branch
- Builds and deploys to GitHub Pages
- Handles Node.js environment setup

### Environment Variables for Production
Create a `.env.production` file (not committed to git):
```
VITE_API_URL=https://your-backend-url.com
TWITTER_BEARER_TOKEN=your_token_here
DATABASE_URL=your_database_url_here
```

## Steps to Deploy

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Enable GitHub Pages**:
   - Go to repository Settings > Pages
   - Select "GitHub Actions" as source
   - The deployment will start automatically

3. **Access Your Site**:
   - Your site will be available at: `https://yourusername.github.io/tweetblog`
   - First deployment may take 5-10 minutes

## Important Notes

1. **Backend Requirements**: For full functionality, you need a separately hosted backend
2. **API Limits**: Twitter API has rate limits - consider implementing caching
3. **Demo Mode**: The app includes demo data that works without a backend
4. **Custom Domain**: You can configure a custom domain in GitHub Pages settings

## Troubleshooting

- **Build Fails**: Check that all dependencies are in package.json
- **404 Errors**: Ensure the base URL is set correctly in vite.config.ts
- **API Errors**: Verify backend is running and CORS is configured
- **Rate Limits**: Use demo data or implement proper error handling

## Recommended Workflow

1. Start with frontend-only deployment to GitHub Pages
2. Use the demo timeline feature to showcase functionality
3. Later, add a hosted backend for full Twitter integration
4. Update environment variables to point to your backend

Your TweetBlog is now ready for GitHub Pages deployment!