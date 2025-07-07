# Deploy TweetBlog API to Vercel

## Prerequisites
- Node.js installed on your computer
- GitHub account
- Twitter Developer account (for API access)

## Step 1: Twitter API Credentials

Your Twitter API credentials are already configured:
- **API Key**: `3EHjem8Dw5umkppACEydt9glW`
- **API Secret**: `hq0bSAcLBfm1fKpuHjW2ser6cS8LMXeuF3orASeJXp6Hrt60yq`

The backend will automatically generate a Bearer Token from these credentials, or you can provide a Bearer Token directly if you have one.

## Step 2: Prepare the Backend Code

The backend is already ready in the `backend-api/` folder. It includes:
- ✅ Express server with Twitter API integration
- ✅ CORS configuration for GitHub Pages
- ✅ Vercel deployment configuration
- ✅ Error handling and rate limiting

## Step 3: Deploy to Vercel

### Option A: Deploy via Vercel CLI (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Navigate to backend folder**:
   ```bash
   cd backend-api
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Follow the prompts**:
   - Link to existing project? **No**
   - Project name: `tweetblog-api` (or your choice)
   - Directory: **./backend-api** (current directory)
   - Override settings? **No**

5. **Add environment variables**:
   ```bash
   vercel env add TWITTER_API_KEY
   # Enter: 3EHjem8Dw5umkppACEydt9glW
   
   vercel env add TWITTER_API_SECRET
   # Enter: hq0bSAcLBfm1fKpuHjW2ser6cS8LMXeuF3orASeJXp6Hrt60yq
   ```
   
   Optionally, if you have a Bearer Token:
   ```bash
   vercel env add TWITTER_BEARER_TOKEN
   # Enter your Bearer Token
   ```

6. **Redeploy with environment variables**:
   ```bash
   vercel --prod
   ```

### Option B: Deploy via Vercel Website

1. Go to https://vercel.com/
2. Sign in with GitHub
3. Click "New Project"
4. Import your repository
5. Set root directory to `backend-api`
6. Add environment variable:
   - Name: `TWITTER_BEARER_TOKEN`
   - Value: Your Twitter Bearer Token
7. Click "Deploy"

## Step 4: Update Frontend Configuration

Once deployed, you'll get a URL like: `https://tweetblog-api-abc123.vercel.app`

1. **Update GitHub Actions**:
   Edit `.github/workflows/deploy.yml`:
   ```yaml
   env:
     VITE_API_URL: https://your-actual-vercel-url.vercel.app
   ```

2. **Update backend CORS**:
   Edit `backend-api/index.js` to include your GitHub Pages URL:
   ```javascript
   origin: [
     'https://yourusername.github.io',
     'http://localhost:5173'
   ]
   ```

## Step 5: Test Your Deployment

1. **Test API health**:
   ```bash
   curl https://your-vercel-url.vercel.app/health
   ```

2. **Test with a username**:
   ```bash
   curl "https://your-vercel-url.vercel.app/api/timeline/elonmusk"
   ```

3. **Test your GitHub Pages site**:
   - Enter a real Twitter username
   - Should fetch real data from Twitter API

## Troubleshooting

### Common Issues:

1. **"Twitter Bearer Token not configured"**
   - Make sure you added the environment variable
   - Redeploy after adding variables

2. **"Rate limit exceeded"**
   - Twitter API has limits (300 requests/15 minutes)
   - Wait and try again, or implement caching

3. **CORS errors**
   - Update the `origin` array in `index.js`
   - Include your exact GitHub Pages URL

4. **"User not found"**
   - Make sure the username exists and is public
   - Some accounts may be private or suspended

## Success Checklist

- ✅ Backend deployed to Vercel
- ✅ Environment variables configured
- ✅ Health check endpoint working
- ✅ GitHub Actions updated with API URL
- ✅ CORS configured for GitHub Pages
- ✅ Real Twitter data fetching works

## Next Steps

1. Push your code to GitHub
2. GitHub Actions will automatically deploy frontend
3. Test with real Twitter usernames
4. Your TweetBlog now has real Twitter integration!

## API Endpoints

- `GET /health` - Health check
- `GET /api/timeline/:username` - Get user profile
- `GET /api/tweets/:username` - Get user tweets
  - Query params: `search`, `filter`, `sort`