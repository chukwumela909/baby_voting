"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

interface Baby {
  id: string;
  name: string;
  age: number;
  gender: string;
  description: string;
  photo_url: string;
  vote_count: number;
  user_id: string;
}

const borderColors = ["#FFB6C1", "#A8D8EA", "#FFE66D", "#D4C5E8", "#FFC0CB", "#B8E6D5"];

const getBorderColor = (index: number) => borderColors[index % borderColors.length];

export default function Gallery() {
  const [babies, setBabies] = useState<Baby[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sortBy, setSortBy] = useState("most-voted");

  useEffect(() => {
    fetchBabies();
  }, []);

  const fetchBabies = async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("babies")
        .select("*")
        .order("vote_count", { ascending: false });

      if (error) throw error;
      setBabies(data || []);
    } catch (error) {
      console.error("Error fetching babies:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter babies based on search and filters
  const filteredBabies = babies
    .filter((baby) => {
      // Search filter
      const matchesSearch = baby.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Age filter
      const ageInMonths = baby.age;
      let matchesAgeFilter = true;
      
      if (selectedFilter === "0-6") {
        matchesAgeFilter = ageInMonths >= 0 && ageInMonths <= 6;
      } else if (selectedFilter === "6-12") {
        matchesAgeFilter = ageInMonths > 6 && ageInMonths <= 12;
      }
      
      return matchesSearch && matchesAgeFilter;
    })
    .sort((a, b) => {
      if (sortBy === "most-voted") {
        return b.vote_count - a.vote_count;
      } else if (sortBy === "newest") {
        return new Date(b.id).getTime() - new Date(a.id).getTime();
      }
      return 0;
    });

  return (
    <div className="min-h-screen bg-[#FFF5EB]">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <Link href="/" className="flex items-center">
              <h1 className="font-[family-name:var(--font-quicksand)] text-xl sm:text-2xl font-bold text-[#FF9B50]">
                PFBOTY
              </h1>
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-[#2D2D2D] hover:text-[#FF9B50] transition-colors font-medium">
                Home
              </Link>
              <Link href="/gallery" className="text-[#FF9B50] font-semibold">
                Gallery
              </Link>
              <Link href="/leaderboard" className="text-[#2D2D2D] hover:text-[#FF9B50] transition-colors font-medium">
                Leaderboard
              </Link>
              <Link href="/#how-it-works" className="text-[#2D2D2D] hover:text-[#FF9B50] transition-colors font-medium">
                How It Works
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Link
                href="/login"
                className="text-[#2D2D2D] hover:text-[#FF9B50] transition-colors font-semibold text-sm sm:text-base"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-[#FF9B50] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base hover:bg-[#FF8A3D] transition-all duration-300"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#FFB6C1] to-[#FFC0CB] py-12 sm:py-16 relative overflow-hidden">
        <Image src="/decorations/star.svg" alt="" width={48} height={48} className="absolute top-6 right-10 opacity-30" />
        <Image src="/decorations/heart.svg" alt="" width={40} height={40} className="absolute bottom-6 left-10 opacity-30" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="font-[family-name:var(--font-quicksand)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Baby Gallery
          </h1>
          <p className="text-white/90 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
            Browse through our adorable collection of babies and show your love by voting!
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 pr-12 rounded-full border-2 border-white/20 bg-white/95 backdrop-blur-sm text-[#2D2D2D] placeholder-[#999999] focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all"
              />
              <svg
                className="absolute right-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-[#999999]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Filters and Sort */}
        <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <button
                onClick={() => setSelectedFilter("all")}
                className={`px-4 sm:px-6 py-2 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 ${
                  selectedFilter === "all"
                    ? "bg-[#FF9B50] text-white"
                    : "bg-[#FFF8F0] text-[#666666] hover:bg-[#FFE5D9]"
                }`}
              >
                All Ages
              </button>
              <button
                onClick={() => setSelectedFilter("0-6")}
                className={`px-4 sm:px-6 py-2 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 ${
                  selectedFilter === "0-6"
                    ? "bg-[#FF9B50] text-white"
                    : "bg-[#FFF8F0] text-[#666666] hover:bg-[#FFE5D9]"
                }`}
              >
                0-6 months
              </button>
              <button
                onClick={() => setSelectedFilter("6-12")}
                className={`px-4 sm:px-6 py-2 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 ${
                  selectedFilter === "6-12"
                    ? "bg-[#FF9B50] text-white"
                    : "bg-[#FFF8F0] text-[#666666] hover:bg-[#FFE5D9]"
                }`}
              >
                6-12 months
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-[#666666] font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-full border-2 border-[#FFE5D9] text-[#2D2D2D] font-medium text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9B50] focus:border-transparent transition-all bg-white"
              >
                <option value="most-voted">Most Voted</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 pt-4 border-t border-[#FFE5D9]">
            <p className="text-sm text-[#666666]">
              Showing <span className="font-semibold text-[#FF9B50]">{filteredBabies.length}</span> {filteredBabies.length === 1 ? "baby" : "babies"}
            </p>
          </div>
        </div>

        {/* Baby Grid */}
        {loading ? (
          // Loading Skeleton
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden shadow-md animate-pulse"
              >
                <div className="relative h-56 sm:h-64 bg-gray-200" />
                <div className="p-4">
                  <div className="h-6 bg-gray-200 rounded mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-20 mb-3" />
                  <div className="h-3 bg-gray-200 rounded mb-1" />
                  <div className="h-3 bg-gray-200 rounded w-4/5 mb-3" />
                  <div className="flex justify-between">
                    <div className="h-6 bg-gray-200 rounded w-16" />
                    <div className="h-8 bg-gray-200 rounded w-24" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredBabies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBabies.map((baby, index) => (
              <div
                key={baby.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                style={{
                  border: `3px dashed ${getBorderColor(index)}`,
                }}
              >
                <div className="relative h-56 sm:h-64 overflow-hidden">
                  <Image
                    src={baby.photo_url}
                    alt={`Photo of ${baby.name}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-[family-name:var(--font-quicksand)] text-lg font-semibold text-[#2D2D2D] mb-1">
                    {baby.name}
                  </h4>
                  <p className="text-sm text-[#999999] mb-2">{baby.age} {baby.age === 1 ? "month" : "months"}</p>
                  <p className="text-xs sm:text-sm text-[#666666] mb-3 line-clamp-2">
                    {baby.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button className="flex items-center space-x-1 text-[#FF9B50] hover:text-[#FF8A3D] transition-colors">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                        <span className="text-sm font-semibold">{baby.vote_count}</span>
                      </button>
                    </div>
                    <Link
                      href={`/baby/${baby.id}`}
                      className="text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all duration-300 text-white"
                      style={{
                        backgroundColor: getBorderColor(index),
                      }}
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : babies.length === 0 && !loading ? (
          // No Babies in Database
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#FFE5D9] flex items-center justify-center">
              <svg className="w-12 h-12 text-[#FF9B50]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h3 className="font-[family-name:var(--font-quicksand)] text-2xl font-bold text-[#2D2D2D] mb-2">
              No babies yet
            </h3>
            <p className="text-[#666666] mb-6">
              Be the first to upload a baby profile!
            </p>
            <Link
              href="/signup"
              className="inline-block bg-[#FF9B50] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#FF8A3D] transition-all duration-300"
            >
              Get Started
            </Link>
          </div>
        ) : (
          // Empty State (filtered results)
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#FFE5D9] flex items-center justify-center">
              <svg className="w-12 h-12 text-[#FF9B50]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="font-[family-name:var(--font-quicksand)] text-2xl font-bold text-[#2D2D2D] mb-2">
              No babies found
            </h3>
            <p className="text-[#666666] mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedFilter("all");
              }}
              className="inline-block bg-[#FF9B50] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#FF8A3D] transition-all duration-300"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Load More Button - Hidden for now */}
        {filteredBabies.length > 0 && false && (
          <div className="text-center mt-12">
            <button className="bg-[#FF9B50] text-white px-8 py-4 rounded-full font-semibold text-sm sm:text-base hover:bg-[#FF8A3D] transition-all duration-300 shadow-lg hover:shadow-xl">
              Load More Babies
            </button>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#FF9B50] to-[#FF8A3D] py-16 sm:py-20 relative overflow-hidden">
        <Image src="/decorations/star.svg" alt="" width={64} height={64} className="absolute top-10 left-10 opacity-20" />
        <Image src="/decorations/heart.svg" alt="" width={56} height={56} className="absolute bottom-10 right-10 opacity-20" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h3 className="font-[family-name:var(--font-quicksand)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Want to Add Your Baby?
          </h3>
          <p className="text-lg sm:text-xl text-white/90 mb-8 leading-relaxed">
            Join thousands of proud parents showcasing their little ones. Create your free account today!
          </p>
          <Link
            href="/signup"
            className="inline-block bg-white text-[#FF9B50] px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold text-base sm:text-lg hover:bg-[#FFF8F0] transition-all duration-300 shadow-xl"
          >
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2D2D2D] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-[family-name:var(--font-quicksand)] text-xl font-bold text-[#FF9B50] mb-4">
                PFBOTY
              </h4>
              <p className="text-white/70 text-sm leading-relaxed">
                Celebrating the joy and cuteness of babies from around the world.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="text-white/70 hover:text-[#FF9B50] transition-colors">Home</Link></li>
                <li><Link href="/gallery" className="text-white/70 hover:text-[#FF9B50] transition-colors">Gallery</Link></li>
                <li><Link href="/#how-it-works" className="text-white/70 hover:text-[#FF9B50] transition-colors">How It Works</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Support</h5>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="text-white/70 hover:text-[#FF9B50] transition-colors">About Us</Link></li>
                <li><Link href="#" className="text-white/70 hover:text-[#FF9B50] transition-colors">Contact</Link></li>
                <li><Link href="#" className="text-white/70 hover:text-[#FF9B50] transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Connect</h5>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="text-white/70 hover:text-[#FF9B50] transition-colors">Facebook</Link></li>
                <li><Link href="#" className="text-white/70 hover:text-[#FF9B50] transition-colors">Instagram</Link></li>
                <li><Link href="#" className="text-white/70 hover:text-[#FF9B50] transition-colors">Twitter</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center text-sm text-white/60">
            <p>2025 PFBOTY. All rights reserved. Made with love for babies everywhere.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
