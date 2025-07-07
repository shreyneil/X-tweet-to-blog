import { db } from "./db";
import { tweets, timelines } from "@shared/schema";
import { eq } from "drizzle-orm";

export async function seedDatabase() {
  try {
    // Check if data already exists
    const existingTimeline = await db.select().from(timelines).where(eq(timelines.username, "johndoe"));
    if (existingTimeline.length > 0) {
      console.log("Sample data already exists, skipping seed");
      return;
    }

    // Create sample timeline
    const [timeline] = await db
      .insert(timelines)
      .values({
        username: "johndoe",
        displayName: "John Doe",
        profileImageUrl: null,
        tweetCount: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    // Create sample tweets
    const sampleTweets = [
      {
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

    await db.insert(tweets).values(sampleTweets);
    
    console.log("Sample data seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}