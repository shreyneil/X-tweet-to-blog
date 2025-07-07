import { tweets, timelines, type Tweet, type InsertTweet, type Timeline, type InsertTimeline } from "@shared/schema";

export interface IStorage {
  // Timeline operations
  getTimeline(username: string): Promise<Timeline | undefined>;
  createTimeline(timeline: InsertTimeline): Promise<Timeline>;
  updateTimeline(username: string, updates: Partial<Timeline>): Promise<Timeline | undefined>;
  
  // Tweet operations
  getTweetsByUsername(username: string): Promise<Tweet[]>;
  createTweet(tweet: InsertTweet): Promise<Tweet>;
  searchTweets(username: string, searchTerm: string): Promise<Tweet[]>;
  filterTweets(username: string, filter: string): Promise<Tweet[]>;
}

export class MemStorage implements IStorage {
  private timelines: Map<string, Timeline>;
  private tweets: Map<string, Tweet[]>;
  private currentTimelineId: number;
  private currentTweetId: number;

  constructor() {
    this.timelines = new Map();
    this.tweets = new Map();
    this.currentTimelineId = 1;
    this.currentTweetId = 1;
    
    // Initialize with mock data for demo
    this.initializeMockData();
  }

  private initializeMockData() {
    const mockTimeline: Timeline = {
      id: this.currentTimelineId++,
      username: "johndoe",
      displayName: "John Doe",
      profileImageUrl: null,
      tweetCount: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    this.timelines.set("johndoe", mockTimeline);

    const mockTweets: Tweet[] = [
      {
        id: this.currentTweetId++,
        tweetId: "1",
        username: "johndoe",
        displayName: "John Doe",
        content: "Just finished reading \"The Design of Everyday Things\" by Don Norman. Such great insights into how we interact with objects and interfaces in our daily lives. Highly recommend for anyone in UX/UI! 🧠✨",
        images: [
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ],
        likes: 34,
        retweets: 8,
        replies: 12,
        isThread: false,
        threadContent: null,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        profileImageUrl: null,
      },
      {
        id: this.currentTweetId++,
        tweetId: "2",
        username: "johndoe",
        displayName: "John Doe",
        content: "Working on a new project that converts social media content into beautiful, readable formats. It's amazing how much our thoughts get lost in the noise of endless feeds. Sometimes we need to slow down and actually read what we've written. 🤔📖",
        images: [],
        likes: 67,
        retweets: 15,
        replies: 24,
        isThread: false,
        threadContent: null,
        createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
        profileImageUrl: null,
      },
      {
        id: this.currentTweetId++,
        tweetId: "3",
        username: "johndoe",
        displayName: "John Doe",
        content: "Beautiful sunset from my office window today. Sometimes the best inspiration comes from just looking up from your screen. 🌅",
        images: [
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800"
        ],
        likes: 89,
        retweets: 5,
        replies: 8,
        isThread: false,
        threadContent: null,
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        profileImageUrl: null,
      },
      {
        id: this.currentTweetId++,
        tweetId: "4",
        username: "johndoe",
        displayName: "John Doe",
        content: "🧵 Thread: 5 lessons I learned building my first web application",
        images: [],
        likes: 156,
        retweets: 23,
        replies: 47,
        isThread: true,
        threadContent: [
          "Start with the user experience, not the technology stack. I spent weeks debating React vs Vue when I should have been talking to potential users.",
          "Build an MVP first. My initial idea was way too complex. The first version should validate the core concept, nothing more.",
          "Deploy early and often. Don't wait for perfection. Get something live and iterate based on real feedback."
        ],
        createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000), // 2 days ago
        profileImageUrl: null,
      }
    ];

    this.tweets.set("johndoe", mockTweets);
  }

  async getTimeline(username: string): Promise<Timeline | undefined> {
    return this.timelines.get(username.toLowerCase());
  }

  async createTimeline(timeline: InsertTimeline): Promise<Timeline> {
    const id = this.currentTimelineId++;
    const newTimeline: Timeline = {
      ...timeline,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.timelines.set(timeline.username.toLowerCase(), newTimeline);
    return newTimeline;
  }

  async updateTimeline(username: string, updates: Partial<Timeline>): Promise<Timeline | undefined> {
    const existing = this.timelines.get(username.toLowerCase());
    if (!existing) return undefined;
    
    const updated: Timeline = {
      ...existing,
      ...updates,
      updatedAt: new Date(),
    };
    this.timelines.set(username.toLowerCase(), updated);
    return updated;
  }

  async getTweetsByUsername(username: string): Promise<Tweet[]> {
    return this.tweets.get(username.toLowerCase()) || [];
  }

  async createTweet(tweet: InsertTweet): Promise<Tweet> {
    const id = this.currentTweetId++;
    const newTweet: Tweet = {
      ...tweet,
      id,
    };
    
    const userTweets = this.tweets.get(tweet.username.toLowerCase()) || [];
    userTweets.push(newTweet);
    this.tweets.set(tweet.username.toLowerCase(), userTweets);
    
    return newTweet;
  }

  async searchTweets(username: string, searchTerm: string): Promise<Tweet[]> {
    const userTweets = this.tweets.get(username.toLowerCase()) || [];
    return userTweets.filter(tweet => 
      tweet.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  async filterTweets(username: string, filter: string): Promise<Tweet[]> {
    const userTweets = this.tweets.get(username.toLowerCase()) || [];
    
    switch (filter) {
      case "with-images":
        return userTweets.filter(tweet => tweet.images && tweet.images.length > 0);
      case "text-only":
        return userTweets.filter(tweet => !tweet.images || tweet.images.length === 0);
      case "popular":
        return userTweets.filter(tweet => tweet.likes > 50);
      default:
        return userTweets;
    }
  }
}

export const storage = new MemStorage();
