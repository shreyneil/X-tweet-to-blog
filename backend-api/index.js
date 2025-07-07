import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';

config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: [
    'https://yourusername.github.io', // Replace with your GitHub Pages URL
    'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:5000'
  ],
  credentials: true
}));
app.use(express.json());

// Twitter API configuration
const TWITTER_API_KEY = process.env.TWITTER_API_KEY || '3EHjem8Dw5umkppACEydt9glW';
const TWITTER_API_SECRET = process.env.TWITTER_API_SECRET || 'hq0bSAcLBfm1fKpuHjW2ser6cS8LMXeuF3orASeJXp6Hrt60yq';
const TWITTER_BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;
const TWITTER_API_BASE = 'https://api.twitter.com/2';

// Helper function to make Twitter API requests
async function fetchTwitterData(endpoint) {
  // Try Bearer Token first, then fall back to API Key/Secret
  let headers;
  
  if (TWITTER_BEARER_TOKEN) {
    headers = {
      'Authorization': `Bearer ${TWITTER_BEARER_TOKEN}`,
      'Content-Type': 'application/json',
    };
  } else if (TWITTER_API_KEY && TWITTER_API_SECRET) {
    // For API Key/Secret, we need to generate a Bearer Token
    const bearerToken = await generateBearerToken();
    headers = {
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/json',
    };
  } else {
    throw new Error('Twitter API credentials not configured');
  }
  
  const response = await fetch(`${TWITTER_API_BASE}${endpoint}`, {
    headers
  });
  
  if (!response.ok) {
    if (response.status === 429) {
      throw new Error('Rate limit exceeded');
    }
    const errorText = await response.text();
    throw new Error(`Twitter API error: ${response.status} - ${errorText}`);
  }
  
  return response.json();
}

// Generate Bearer Token from API Key/Secret
async function generateBearerToken() {
  const credentials = Buffer.from(`${TWITTER_API_KEY}:${TWITTER_API_SECRET}`).toString('base64');
  
  const response = await fetch('https://api.twitter.com/oauth2/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: 'grant_type=client_credentials'
  });
  
  if (!response.ok) {
    throw new Error('Failed to generate Bearer Token');
  }
  
  const data = await response.json();
  return data.access_token;
}

// Convert Twitter API response to our format
function convertTwitterTweetToTweet(twitterTweet, user, media = []) {
  const hashtags = twitterTweet.entities?.hashtags?.map(h => h.tag) || [];
  const images = media.filter(m => m.type === 'photo').map(m => m.url) || [];
  const videos = media.filter(m => m.type === 'video').map(m => m.preview_image_url) || [];
  
  return {
    id: twitterTweet.id,
    text: twitterTweet.text,
    createdAt: new Date(twitterTweet.created_at),
    username: user.username,
    displayName: user.name,
    profileImage: user.profile_image_url || '',
    likes: twitterTweet.public_metrics.like_count,
    retweets: twitterTweet.public_metrics.retweet_count,
    replies: twitterTweet.public_metrics.reply_count,
    hashtags: hashtags,
    images: images,
    videos: videos,
    type: determineType(twitterTweet.text, hashtags, images, videos),
    isVerified: false // Twitter API v2 doesn't provide verification status easily
  };
}

function determineType(text, hashtags, images, videos) {
  if (images.length > 0) return 'image';
  if (videos.length > 0) return 'video';
  if (hashtags.length > 0) return 'hashtag';
  if (text.includes('http')) return 'link';
  return 'text';
}

// API Routes
app.get('/api/timeline/:username', async (req, res) => {
  try {
    const { username } = req.params;
    
    // Get user info
    const userResponse = await fetchTwitterData(`/users/by/username/${username}`);
    const user = userResponse.data;
    
    // Create timeline object
    const timeline = {
      id: user.id,
      username: user.username,
      displayName: user.name,
      profileImage: user.profile_image_url || '',
      bio: user.description || '',
      followerCount: user.public_metrics?.followers_count || 0,
      followingCount: user.public_metrics?.following_count || 0,
      tweetCount: user.public_metrics?.tweet_count || 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    res.json(timeline);
  } catch (error) {
    console.error('Error fetching timeline:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/tweets/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const { search, filter, sort } = req.query;
    
    // Get user info first
    const userResponse = await fetchTwitterData(`/users/by/username/${username}`);
    const user = userResponse.data;
    
    // Get user tweets
    const tweetsEndpoint = `/users/${user.id}/tweets?max_results=100&tweet.fields=created_at,public_metrics,entities,attachments&expansions=attachments.media_keys&media.fields=type,url,preview_image_url`;
    const tweetsResponse = await fetchTwitterData(tweetsEndpoint);
    
    const tweets = tweetsResponse.data || [];
    const media = tweetsResponse.includes?.media || [];
    
    // Convert tweets to our format
    let convertedTweets = tweets.map(tweet => {
      const tweetMedia = tweet.attachments?.media_keys
        ? media.filter(m => tweet.attachments.media_keys.includes(m.media_key))
        : [];
      return convertTwitterTweetToTweet(tweet, user, tweetMedia);
    });
    
    // Apply search filter
    if (search) {
      convertedTweets = convertedTweets.filter(tweet => 
        tweet.text.toLowerCase().includes(search.toLowerCase()) ||
        tweet.hashtags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
      );
    }
    
    // Apply type filter
    if (filter && filter !== 'all') {
      convertedTweets = convertedTweets.filter(tweet => tweet.type === filter);
    }
    
    // Apply sorting
    if (sort === 'oldest') {
      convertedTweets.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    } else if (sort === 'likes') {
      convertedTweets.sort((a, b) => (b.likes || 0) - (a.likes || 0));
    } else if (sort === 'retweets') {
      convertedTweets.sort((a, b) => (b.retweets || 0) - (a.retweets || 0));
    } else {
      // Default: newest first
      convertedTweets.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    
    res.json(convertedTweets);
  } catch (error) {
    console.error('Error fetching tweets:', error);
    res.status(500).json({ error: error.message });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`TweetBlog API server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});