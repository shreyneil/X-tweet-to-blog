import { Tweet, InsertTweet } from "@shared/schema";

interface TwitterUser {
  id: string;
  username: string;
  name: string;
  profile_image_url?: string;
}

interface TwitterTweet {
  id: string;
  text: string;
  created_at: string;
  author_id: string;
  public_metrics: {
    retweet_count: number;
    like_count: number;
    reply_count: number;
    quote_count: number;
  };
  attachments?: {
    media_keys?: string[];
  };
  entities?: {
    hashtags?: Array<{ tag: string }>;
    mentions?: Array<{ username: string }>;
  };
}

interface TwitterMedia {
  media_key: string;
  type: 'photo' | 'video' | 'animated_gif';
  url?: string;
  preview_image_url?: string;
}

interface TwitterResponse {
  data: TwitterTweet[];
  includes: {
    users: TwitterUser[];
    media?: TwitterMedia[];
  };
  meta: {
    result_count: number;
    next_token?: string;
  };
}

export class TwitterService {
  private bearerToken: string;
  private baseUrl = 'https://api.twitter.com/2';

  constructor() {
    this.bearerToken = process.env.TWITTER_BEARER_TOKEN || '';
    if (!this.bearerToken) {
      throw new Error('TWITTER_BEARER_TOKEN is required');
    }
  }

  private async makeRequest(endpoint: string): Promise<any> {
    const url = `${this.baseUrl}${endpoint}`;
    console.log(`Making Twitter API request to: ${url}`);
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${this.bearerToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      console.error(`Twitter API error (${response.status}):`, error);
      throw new Error(`Twitter API error: ${response.status} - ${error.detail || error.title || response.statusText}`);
    }

    const data = await response.json();
    console.log(`Twitter API response received:`, data);
    return data;
  }

  async getUserByUsername(username: string): Promise<TwitterUser> {
    const cleanUsername = username.replace('@', '');
    console.log(`Fetching user data for: ${cleanUsername}`);
    
    try {
      const response = await this.makeRequest(
        `/users/by/username/${cleanUsername}?user.fields=profile_image_url,name,username`
      );
      
      if (!response.data) {
        throw new Error(`User @${cleanUsername} not found`);
      }

      console.log(`Successfully fetched user data for @${cleanUsername}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching user @${cleanUsername}:`, error);
      throw error;
    }
  }

  async getUserTweets(username: string, maxResults: number = 100): Promise<Tweet[]> {
    const user = await this.getUserByUsername(username);
    
    const endpoint = `/users/${user.id}/tweets?` +
      `max_results=${Math.min(maxResults, 100)}&` +
      `tweet.fields=created_at,public_metrics,attachments,entities&` +
      `expansions=attachments.media_keys&` +
      `media.fields=type,url,preview_image_url`;

    const response: TwitterResponse = await this.makeRequest(endpoint);
    
    if (!response.data || response.data.length === 0) {
      return [];
    }

    const mediaMap = new Map<string, TwitterMedia>();
    if (response.includes?.media) {
      response.includes.media.forEach(media => {
        mediaMap.set(media.media_key, media);
      });
    }

    return response.data.map(tweet => this.convertTwitterTweetToTweet(tweet, user, mediaMap));
  }

  private convertTwitterTweetToTweet(
    twitterTweet: TwitterTweet,
    user: TwitterUser,
    mediaMap: Map<string, TwitterMedia>
  ): Tweet {
    const images: string[] = [];
    const videos: string[] = [];

    if (twitterTweet.attachments?.media_keys) {
      twitterTweet.attachments.media_keys.forEach(mediaKey => {
        const media = mediaMap.get(mediaKey);
        if (media) {
          if (media.type === 'photo' && media.url) {
            images.push(media.url);
          } else if (media.type === 'video' && media.preview_image_url) {
            videos.push(media.preview_image_url);
          }
        }
      });
    }

    const hashtags = twitterTweet.entities?.hashtags?.map(h => h.tag) || [];
    const mentions = twitterTweet.entities?.mentions?.map(m => m.username) || [];

    return {
      tweetId: twitterTweet.id,
      username: user.username,
      displayName: user.name,
      content: twitterTweet.text,
      createdAt: new Date(twitterTweet.created_at),
      likes: twitterTweet.public_metrics.like_count,
      retweets: twitterTweet.public_metrics.retweet_count,
      replies: twitterTweet.public_metrics.reply_count,
      images: images.length > 0 ? images : null,
      videos: videos.length > 0 ? videos : null,
      hashtags: hashtags.length > 0 ? hashtags : null,
      mentions: mentions.length > 0 ? mentions : null,
      isThread: false,
      threadContent: null,
      type: this.determineType(twitterTweet.text, hashtags, images, videos),
      isVerified: false,
      location: null,
      language: 'en',
      profileImageUrl: user.profile_image_url || null
    };
  }

  private determineType(text: string, hashtags: string[], images: string[], videos: string[]): string {
    if (videos.length > 0) return 'video';
    if (images.length > 0) return 'image';
    if (hashtags.length > 0) return 'hashtag';
    if (text.includes('?')) return 'question';
    return 'text';
  }
}

export const twitterService = new TwitterService();