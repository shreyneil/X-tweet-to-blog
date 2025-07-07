import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import FilterSection from "@/components/filter-section";
import TimelineSection from "@/components/timeline-section";
import Footer from "@/components/footer";
import { useState } from "react";

export default function Home() {
  const [currentUsername, setCurrentUsername] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("all");
  const [sortType, setSortType] = useState<string>("newest");

  return (
    <div className="min-h-screen bg-twitter-bg dark:bg-gray-900">
      <Header />
      <HeroSection 
        onUsernameSubmit={setCurrentUsername}
        currentUsername={currentUsername}
      />
      {currentUsername && (
        <>
          <FilterSection
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            filterType={filterType}
            onFilterChange={setFilterType}
            sortType={sortType}
            onSortChange={setSortType}
          />
          <TimelineSection
            username={currentUsername}
            searchTerm={searchTerm}
            filterType={filterType}
            sortType={sortType}
          />
        </>
      )}
      <Footer />
    </div>
  );
}
