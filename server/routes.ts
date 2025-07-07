import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTimelineSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get timeline for a user
  app.get("/api/timeline/:username", async (req, res) => {
    try {
      const { username } = req.params;
      const timeline = await storage.getTimeline(username);
      
      if (!timeline) {
        return res.status(404).json({ message: "Timeline not found" });
      }
      
      res.json(timeline);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch timeline" });
    }
  });

  // Get tweets for a user
  app.get("/api/tweets/:username", async (req, res) => {
    try {
      const { username } = req.params;
      const { search, filter, sort } = req.query;
      
      let tweets = await storage.getTweetsByUsername(username);
      
      // Apply search filter
      if (search && typeof search === "string") {
        tweets = await storage.searchTweets(username, search);
      }
      
      // Apply content filter
      if (filter && typeof filter === "string" && filter !== "all") {
        tweets = await storage.filterTweets(username, filter);
      }
      
      // Apply sorting
      if (sort && typeof sort === "string") {
        switch (sort) {
          case "oldest":
            tweets.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
            break;
          case "most-liked":
            tweets.sort((a, b) => b.likes - a.likes);
            break;
          case "most-retweeted":
            tweets.sort((a, b) => b.retweets - a.retweets);
            break;
          default: // newest
            tweets.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }
      }
      
      res.json(tweets);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tweets" });
    }
  });

  // Generate timeline for a user (mock endpoint)
  app.post("/api/generate-timeline", async (req, res) => {
    try {
      const { username } = z.object({ username: z.string() }).parse(req.body);
      
      // Check if timeline already exists
      let timeline = await storage.getTimeline(username);
      
      if (!timeline) {
        // Create new timeline with mock data
        timeline = await storage.createTimeline({
          username,
          displayName: username.charAt(0).toUpperCase() + username.slice(1),
          profileImageUrl: null,
          tweetCount: 0,
        });
      }
      
      res.json({ 
        success: true, 
        timeline,
        message: "Timeline generated successfully" 
      });
    } catch (error) {
      res.status(400).json({ message: "Invalid username provided" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
