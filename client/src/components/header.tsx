import { Twitter } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-twitter-blue rounded-full flex items-center justify-center">
              <Twitter className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-twitter-dark">TweetBlog</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-twitter-gray hover:text-twitter-blue transition-colors">
              Home
            </a>
            <a href="#" className="text-twitter-gray hover:text-twitter-blue transition-colors">
              About
            </a>
            <a href="#" className="text-twitter-gray hover:text-twitter-blue transition-colors">
              Export
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
