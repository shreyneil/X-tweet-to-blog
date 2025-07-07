# TweetBlog API Backend

A simple Node.js/Express API backend for TweetBlog that fetches real Twitter data.

## Features

- Fetches real Twitter user data and tweets
- Handles rate limiting and errors gracefully
- CORS configured for GitHub Pages deployment
- Lightweight and fast
- Easy to deploy on various platforms

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env with your Twitter Bearer Token
   ```

3. **Run the server**:
   ```bash
   npm start
   ```

## API Endpoints

### GET /api/timeline/:username
Returns user profile information and timeline metadata.

### GET /api/tweets/:username
Returns tweets for a username with optional query parameters:
- `search`: Search within tweet text
- `filter`: Filter by type (all, text, image, video, hashtag, link)
- `sort`: Sort by (newest, oldest, likes, retweets)

### GET /health
Health check endpoint.

## Environment Variables

- `TWITTER_BEARER_TOKEN`: Your Twitter API v2 Bearer Token
- `PORT`: Server port (default: 3001)

## Deployment Options

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Railway
```bash
# Install Railway CLI
npm install -g @railway/cli
railway deploy
```

### Render
1. Connect your GitHub repository
2. Set environment variables
3. Deploy

### Netlify Functions
Use the `netlify-functions` branch for serverless deployment.

## Getting Twitter API Access

1. Go to https://developer.twitter.com/
2. Create a Twitter Developer account
3. Create a new app
4. Get your Bearer Token from the "Keys and tokens" section
5. Add it to your environment variables

## CORS Configuration

Update the CORS origins in `index.js` to match your GitHub Pages URL:

```javascript
origin: [
  'https://yourusername.github.io',
  'http://localhost:5173'
]
```

## Rate Limiting

The Twitter API has rate limits:
- 300 requests per 15 minutes for user lookup
- 300 requests per 15 minutes for user tweets

The API handles these gracefully with proper error messages.