import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, CheckCircle, ChevronRight } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface HeroSectionProps {
  onUsernameSubmit: (username: string) => void;
  currentUsername: string;
}

export default function HeroSection({ onUsernameSubmit, currentUsername }: HeroSectionProps) {
  const [username, setUsername] = useState("");
  const { toast } = useToast();

  const generateTimelineMutation = useMutation({
    mutationFn: async (username: string) => {
      const response = await apiRequest("POST", "/api/generate-timeline", { username });
      return response.json();
    },
    onSuccess: (data) => {
      onUsernameSubmit(username);
      toast({
        title: "Timeline Generated",
        description: `Successfully generated timeline for @${username}`,
      });
    },
    onError: async (error: any) => {
      try {
        const errorData = await error.json();
        if (errorData.code === 'RATE_LIMIT_EXCEEDED') {
          toast({
            title: "Rate Limit Exceeded",
            description: "Twitter API rate limit reached. Try the demo username 'demo' or wait a few minutes.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error",
            description: errorData.message || "Failed to generate timeline. Please try again.",
            variant: "destructive",
          });
        }
      } catch {
        toast({
          title: "Error",
          description: "Failed to generate timeline. Please try again.",
          variant: "destructive",
        });
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      generateTimelineMutation.mutate(username.trim());
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center py-16 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-twitter-blue/10 rounded-full animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-400/10 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-400/10 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 animate-fade-in-up">
        <h2 className="text-4xl md:text-6xl font-bold text-twitter-dark dark:text-white mb-6 leading-tight">
          Transform Your Tweets into a{" "}
          <span className="gradient-text">Beautiful Timeline</span>
        </h2>
        <p className="text-xl text-twitter-gray dark:text-gray-300 mb-4 max-w-2xl mx-auto">
          Create a stunning blog-style timeline from your X (Twitter) posts. Include images, maintain
          chronology, and share your thoughts beautifully.
        </p>
        <div className="glass rounded-xl p-6 mb-8 max-w-2xl mx-auto shadow-premium animate-pulse-glow">
          <p className="text-twitter-blue dark:text-blue-400 font-medium flex items-center justify-center space-x-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span>Now fetching real Twitter data! Try: demo, elonmusk, twitter, github</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-8">
          <div className="gradient-border mb-6 hover-lift">
            <div className="relative">
              <Input
                type="text"
                placeholder="Enter Twitter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-12 pr-4 py-4 text-lg text-twitter-dark dark:text-white bg-white dark:bg-gray-800 border-0 rounded-lg focus:ring-4 focus:ring-twitter-blue/20 transition-all duration-300"
              />
              <User className="absolute left-4 top-4 w-6 h-6 text-twitter-blue" />
              {username.trim() && (
                <div className="absolute right-4 top-4">
                  <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <Button
            type="submit"
            disabled={generateTimelineMutation.isPending || !username.trim()}
            className="w-full gradient-bg text-white py-4 px-8 rounded-xl font-semibold text-lg shadow-premium-lg hover:shadow-premium transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {generateTimelineMutation.isPending ? (
              <div className="flex items-center justify-center space-x-3">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Generating Timeline...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <span>Generate Timeline</span>
                <ChevronRight className="w-5 h-5" />
              </div>
            )}
          </Button>
        </form>

        <div className="flex items-center justify-center space-x-6 text-sm text-twitter-gray dark:text-gray-400">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Free to use</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>No API keys needed</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Export ready</span>
          </div>
        </div>
      </div>
    </section>
  );
}
