import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import TweetCard from "./tweet-card";
import type { Tweet, Timeline } from "@shared/schema";

interface TimelineSectionProps {
  username: string;
  searchTerm: string;
  filterType: string;
  sortType: string;
}

export default function TimelineSection({
  username,
  searchTerm,
  filterType,
  sortType,
}: TimelineSectionProps) {
  const { data: timeline, isLoading: timelineLoading } = useQuery<Timeline>({
    queryKey: [`/api/timeline/${username}`],
    enabled: !!username,
  });

  const { data: tweets = [], isLoading: tweetsLoading } = useQuery<Tweet[]>({
    queryKey: [`/api/tweets/${username}?search=${searchTerm}&filter=${filterType}&sort=${sortType}`],
    enabled: !!username,
  });

  const isLoading = timelineLoading || tweetsLoading;

  if (isLoading) {
    return (
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 animate-spin text-twitter-blue" />
          <span className="ml-2 text-twitter-gray dark:text-gray-400">Loading timeline...</span>
        </div>
      </main>
    );
  }

  if (!timeline) {
    return (
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-16">
          <p className="text-twitter-gray dark:text-gray-400">Timeline not found for @{username}</p>
        </div>
      </main>
    );
  }

  const handleExport = () => {
    // Create a simple HTML export
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Timeline for @${username}</title>
          <meta charset="UTF-8">
          <style>
            body { font-family: Inter, sans-serif; margin: 0; padding: 20px; background: #f7f9fa; }
            .container { max-width: 800px; margin: 0 auto; }
            .header { background: white; padding: 20px; border-radius: 12px; margin-bottom: 20px; }
            .tweet { background: white; padding: 20px; border-radius: 12px; margin-bottom: 16px; border: 1px solid #e1e8ed; }
            .tweet-meta { color: #657786; font-size: 14px; margin-bottom: 12px; }
            .tweet-content { color: #0f1419; line-height: 1.5; margin-bottom: 12px; }
            .tweet-images { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 8px; margin-bottom: 12px; }
            .tweet-images img { width: 100%; height: 200px; object-fit: cover; border-radius: 8px; }
            .tweet-stats { color: #657786; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Timeline for @${username}</h1>
              <p>${tweets.length} tweets exported</p>
            </div>
            ${tweets.map(tweet => `
              <div class="tweet">
                <div class="tweet-meta">
                  ${tweet.displayName} @${tweet.username} • ${new Date(tweet.createdAt).toLocaleDateString()}
                </div>
                <div class="tweet-content">${tweet.content}</div>
                ${tweet.images && tweet.images.length > 0 ? `
                  <div class="tweet-images">
                    ${tweet.images.map(img => `<img src="${img}" alt="Tweet image" />`).join('')}
                  </div>
                ` : ''}
                <div class="tweet-stats">
                  ${tweet.likes} likes • ${tweet.retweets} retweets • ${tweet.replies} replies
                </div>
              </div>
            `).join('')}
          </div>
        </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `timeline-${username}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Timeline Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-bold text-twitter-dark dark:text-white">Timeline for @{username}</h3>
          <p className="text-twitter-gray dark:text-gray-400 mt-1">
            Showing {tweets.length} tweets
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>
        <Button
          onClick={handleExport}
          className="bg-twitter-blue text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center space-x-2"
        >
          <Download className="w-4 h-4" />
          <span>Export Blog</span>
        </Button>
      </div>

      {/* Timeline Container */}
      {tweets.length === 0 ? (
        <div className="text-center py-16 animate-fade-in-up">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-twitter-blue/20 to-purple-500/20 rounded-full flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-twitter-blue/30 border-t-twitter-blue rounded-full animate-spin"></div>
          </div>
          <p className="text-twitter-gray dark:text-gray-400 text-lg font-medium">
            {searchTerm || filterType !== 'all'
              ? 'No tweets found matching your filters.'
              : 'No tweets found for this user.'}
          </p>
        </div>
      ) : (
        <div className="space-y-6 custom-scrollbar">
          {tweets.map((tweet, index) => (
            <div 
              key={tweet.id} 
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <TweetCard tweet={tweet} />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
