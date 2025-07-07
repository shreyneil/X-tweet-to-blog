import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Repeat2, Heart, Share } from "lucide-react";
import type { Tweet } from "@shared/schema";

interface TweetCardProps {
  tweet: Tweet;
}

export default function TweetCard({ tweet }: TweetCardProps) {
  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - new Date(date).getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return "1 day ago";
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card className="bg-white dark:bg-gray-800 rounded-xl shadow-premium border border-gray-100 dark:border-gray-700 overflow-hidden hover-lift animate-fade-in-up group relative">
      {/* Timeline Connection Indicator */}
      <div className="absolute -left-4 top-6 w-2 h-2 bg-twitter-blue rounded-full opacity-50 group-hover:opacity-100 transition-opacity"></div>
      
      <div className="p-6 relative overflow-hidden">
        {/* Decorative background gradient */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-twitter-blue/5 to-purple-500/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-700"></div>
        
        <div className="flex items-start space-x-3 relative z-10">
          <div className="w-12 h-12 bg-gradient-to-br from-twitter-blue to-blue-600 rounded-full flex items-center justify-center text-white font-semibold shadow-premium ring-2 ring-white/20 group-hover:ring-twitter-blue/30 transition-all duration-300">
            {getInitials(tweet.displayName)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-3">
              <h4 className="font-semibold text-twitter-dark dark:text-white">{tweet.displayName}</h4>
              <span className="text-twitter-gray dark:text-gray-400">@{tweet.username}</span>
              <span className="text-twitter-light-gray dark:text-gray-500">•</span>
              <time className="text-twitter-light-gray dark:text-gray-500 text-sm">
                {formatDate(tweet.createdAt)}
              </time>
              {tweet.isThread && (
                <Badge variant="secondary" className="bg-twitter-blue text-white text-xs">
                  Thread
                </Badge>
              )}
            </div>
            
            <div className="prose prose-twitter max-w-none">
              <p className="text-twitter-dark dark:text-gray-200 mb-4 whitespace-pre-wrap">{tweet.content}</p>
            </div>

            {/* Thread Content */}
            {tweet.isThread && tweet.threadContent && (
              <div className="bg-twitter-bg dark:bg-gray-700 rounded-lg p-4 space-y-3 text-sm mb-4">
                {tweet.threadContent.map((content, index) => (
                  <p key={index} className="text-twitter-dark dark:text-gray-200">
                    {index + 1}/ {content}
                  </p>
                ))}
              </div>
            )}

            {/* Image Grid */}
            {tweet.images && tweet.images.length > 0 && (
              <div className={`mb-4 rounded-lg overflow-hidden ${
                tweet.images.length === 1 
                  ? "" 
                  : "grid grid-cols-2 gap-2"
              }`}>
                {tweet.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Tweet image ${index + 1}`}
                    className={`w-full object-cover ${
                      tweet.images!.length === 1 
                        ? "h-64 md:h-80" 
                        : "h-32"
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Engagement Metrics */}
            <div className="flex items-center space-x-8 text-twitter-gray dark:text-gray-400 text-sm mt-2">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2 hover:text-twitter-blue dark:hover:text-twitter-blue hover:bg-twitter-blue/10 rounded-full px-3 py-2 transition-all duration-300 group"
              >
                <MessageCircle className="w-4 h-4 group-hover:scale-125 transition-transform duration-300" />
                <span className="font-medium">{tweet.replies || 0}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2 hover:text-green-500 dark:hover:text-green-400 hover:bg-green-500/10 rounded-full px-3 py-2 transition-all duration-300 group"
              >
                <Repeat2 className="w-4 h-4 group-hover:scale-125 group-hover:rotate-180 transition-all duration-300" />
                <span className="font-medium">{tweet.retweets || 0}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-500/10 rounded-full px-3 py-2 transition-all duration-300 group"
              >
                <Heart className="w-4 h-4 group-hover:scale-125 group-hover:fill-current transition-all duration-300" />
                <span className="font-medium">{tweet.likes || 0}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2 hover:text-twitter-blue transition-colors p-0 h-auto"
              >
                <Share className="w-4 h-4" />
                <span>Share</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
