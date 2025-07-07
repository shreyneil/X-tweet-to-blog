import { tweets, timelines, type Tweet, type InsertTweet, type Timeline, type InsertTimeline } from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, asc, ilike } from "drizzle-orm";

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

export class DatabaseStorage implements IStorage {
  async getTimeline(username: string): Promise<Timeline | undefined> {
    const [timeline] = await db.select().from(timelines).where(eq(timelines.username, username.toLowerCase()));
    return timeline || undefined;
  }

  async createTimeline(insertTimeline: InsertTimeline): Promise<Timeline> {
    const [timeline] = await db
      .insert(timelines)
      .values({
        ...insertTimeline,
        username: insertTimeline.username.toLowerCase(),
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();
    return timeline;
  }

  async updateTimeline(username: string, updates: Partial<Timeline>): Promise<Timeline | undefined> {
    const [timeline] = await db
      .update(timelines)
      .set({
        ...updates,
        updatedAt: new Date(),
      })
      .where(eq(timelines.username, username.toLowerCase()))
      .returning();
    return timeline || undefined;
  }

  async getTweetsByUsername(username: string): Promise<Tweet[]> {
    return await db
      .select()
      .from(tweets)
      .where(eq(tweets.username, username.toLowerCase()))
      .orderBy(desc(tweets.createdAt));
  }

  async createTweet(insertTweet: InsertTweet): Promise<Tweet> {
    const [tweet] = await db
      .insert(tweets)
      .values(insertTweet as any)
      .returning();
    return tweet;
  }

  async searchTweets(username: string, searchTerm: string): Promise<Tweet[]> {
    return await db
      .select()
      .from(tweets)
      .where(
        and(
          eq(tweets.username, username.toLowerCase()),
          ilike(tweets.content, `%${searchTerm}%`)
        )
      )
      .orderBy(desc(tweets.createdAt));
  }

  async filterTweets(username: string, filter: string): Promise<Tweet[]> {
    const allTweets = await db
      .select()
      .from(tweets)
      .where(eq(tweets.username, username.toLowerCase()))
      .orderBy(desc(tweets.createdAt));

    switch (filter) {
      case "with-images":
        return allTweets.filter(tweet => tweet.images && tweet.images.length > 0);
      case "text-only":
        return allTweets.filter(tweet => !tweet.images || tweet.images.length === 0);
      case "popular":
        return allTweets.filter(tweet => (tweet.likes || 0) > 50);
      default:
        return allTweets;
    }
  }
}

export const storage = new DatabaseStorage();
