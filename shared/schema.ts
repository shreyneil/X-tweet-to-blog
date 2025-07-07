import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const tweets = pgTable("tweets", {
  id: serial("id").primaryKey(),
  tweetId: text("tweet_id").notNull().unique(),
  username: text("username").notNull(),
  displayName: text("display_name").notNull(),
  content: text("content").notNull(),
  images: jsonb("images").$type<string[]>().default([]),
  likes: integer("likes").default(0),
  retweets: integer("retweets").default(0),
  replies: integer("replies").default(0),
  isThread: boolean("is_thread").default(false),
  threadContent: jsonb("thread_content").$type<string[]>(),
  createdAt: timestamp("created_at").notNull(),
  profileImageUrl: text("profile_image_url"),
});

export const timelines = pgTable("timelines", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  displayName: text("display_name").notNull(),
  profileImageUrl: text("profile_image_url"),
  tweetCount: integer("tweet_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertTweetSchema = createInsertSchema(tweets).omit({
  id: true,
});

export const insertTimelineSchema = createInsertSchema(timelines).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type Tweet = typeof tweets.$inferSelect;
export type InsertTweet = z.infer<typeof insertTweetSchema>;
export type Timeline = typeof timelines.$inferSelect;
export type InsertTimeline = z.infer<typeof insertTimelineSchema>;
