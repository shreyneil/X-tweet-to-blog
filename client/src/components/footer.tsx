import { Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 mt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-twitter-blue rounded-full flex items-center justify-center">
                <Twitter className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-twitter-dark dark:text-white">TweetBlog</h3>
            </div>
            <p className="text-twitter-gray dark:text-gray-300">
              Transform your tweets into beautiful, readable timelines. Perfect for bloggers,
              creators, and anyone who wants to preserve their thoughts.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-twitter-dark dark:text-white mb-4">Features</h4>
            <ul className="space-y-2 text-twitter-gray dark:text-gray-300">
              <li>Timeline Generation</li>
              <li>Image Integration</li>
              <li>Export to HTML</li>
              <li>Search & Filter</li>
              <li>Mobile Responsive</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-twitter-dark dark:text-white mb-4">Support</h4>
            <ul className="space-y-2 text-twitter-gray dark:text-gray-300">
              <li>
                <a href="#" className="hover:text-twitter-blue dark:hover:text-twitter-blue transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-twitter-blue dark:hover:text-twitter-blue transition-colors">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-twitter-blue dark:hover:text-twitter-blue transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-twitter-blue dark:hover:text-twitter-blue transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-twitter-blue dark:hover:text-twitter-blue transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-100 dark:border-gray-700 mt-8 pt-8 text-center text-twitter-gray dark:text-gray-400">
          <p>&copy; 2024 TweetBlog. Made with ❤️ for the Twitter community.</p>
        </div>
      </div>
    </footer>
  );
}
