import { Twitter } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Header() {
  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-premium border-b border-gray-100/50 dark:border-gray-800/50 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center shadow-premium group-hover:scale-110 transition-transform duration-300">
              <Twitter className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold gradient-text group-hover:scale-105 transition-transform duration-300">TweetBlog</h1>
          </div>
          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-twitter-gray dark:text-gray-300 hover:text-twitter-blue dark:hover:text-twitter-blue transition-colors">
                Home
              </a>
              <a href="#" className="text-twitter-gray dark:text-gray-300 hover:text-twitter-blue dark:hover:text-twitter-blue transition-colors">
                About
              </a>
              <a href="#" className="text-twitter-gray dark:text-gray-300 hover:text-twitter-blue dark:hover:text-twitter-blue transition-colors">
                Export
              </a>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
