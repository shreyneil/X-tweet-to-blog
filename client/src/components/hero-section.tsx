import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, CheckCircle } from "lucide-react";
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
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to generate timeline. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      generateTimelineMutation.mutate(username.trim());
    }
  };

  return (
    <section className="bg-gradient-to-b from-white to-twitter-bg py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-twitter-dark mb-6">
          Transform Your Tweets into a{" "}
          <span className="text-twitter-blue">Beautiful Timeline</span>
        </h2>
        <p className="text-xl text-twitter-gray mb-8 max-w-2xl mx-auto">
          Create a stunning blog-style timeline from your X (Twitter) posts. Include images, maintain
          chronology, and share your thoughts beautifully.
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-8">
          <div className="relative mb-4">
            <Input
              type="text"
              placeholder="Enter your X/Twitter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 pr-4 py-3 text-twitter-dark bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-twitter-blue focus:border-transparent shadow-sm"
            />
            <User className="absolute left-3 top-3.5 w-5 h-5 text-twitter-gray" />
          </div>
          <Button
            type="submit"
            disabled={generateTimelineMutation.isPending || !username.trim()}
            className="w-full bg-twitter-blue text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-600 transition-colors shadow-sm"
          >
            {generateTimelineMutation.isPending ? "Generating..." : "Generate Timeline"}
          </Button>
        </form>

        <div className="flex items-center justify-center space-x-6 text-sm text-twitter-gray">
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
