import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

interface FilterSectionProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  filterType: string;
  onFilterChange: (filter: string) => void;
  sortType: string;
  onSortChange: (sort: string) => void;
}

export default function FilterSection({
  searchTerm,
  onSearchChange,
  filterType,
  onFilterChange,
  sortType,
  onSortChange,
}: FilterSectionProps) {
  return (
    <section className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Input
              type="text"
              placeholder="Search tweets..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-twitter-dark dark:text-white bg-twitter-bg dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-twitter-blue focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-twitter-gray dark:text-gray-400" />
          </div>

          {/* Filter Controls */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm text-twitter-gray dark:text-gray-300">Filter:</label>
              <Select value={filterType} onValueChange={onFilterChange}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All tweets</SelectItem>
                  <SelectItem value="with-images">With images</SelectItem>
                  <SelectItem value="text-only">Text only</SelectItem>
                  <SelectItem value="popular">Popular</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-sm text-twitter-gray dark:text-gray-300">Sort:</label>
              <Select value={sortType} onValueChange={onSortChange}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest first</SelectItem>
                  <SelectItem value="oldest">Oldest first</SelectItem>
                  <SelectItem value="most-liked">Most liked</SelectItem>
                  <SelectItem value="most-retweeted">Most retweeted</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
