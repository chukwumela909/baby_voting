"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Mock data - will be replaced with actual data from database
const allBabies = [
  {
    id: 1,
    name: "Emma Rose",
    age: "8 months",
    votes: 234,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b",
    borderColor: "#FFB6C1",
    description: "Always smiling and loves to play with toys"
  },
  {
    id: 2,
    name: "Noah James",
    age: "6 months",
    votes: 198,
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9",
    borderColor: "#A8D8EA",
    description: "Curious little explorer with beautiful eyes"
  },
  {
    id: 3,
    name: "Sophia Grace",
    age: "10 months",
    votes: 187,
    image: "https://images.unsplash.com/photo-1500042600524-37ecb686c775",
    borderColor: "#FFE66D",
    description: "Sweet and gentle, loves cuddles"
  },
  {
    id: 4,
    name: "Liam Oliver",
    age: "7 months",
    votes: 165,
    image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368",
    borderColor: "#D4C5E8",
    description: "Energetic and always giggling"
  },
  {
    id: 5,
    name: "Olivia Mae",
    age: "9 months",
    votes: 156,
    image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9",
    borderColor: "#FFC0CB",
    description: "Bright personality and loves music"
  },
  {
    id: 6,
    name: "Ethan Michael",
    age: "5 months",
    votes: 142,
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4",
    borderColor: "#B8E6D5",
    description: "Peaceful sleeper and food lover"
  },
  {
    id: 7,
    name: "Ava Marie",
    age: "11 months",
    votes: 128,
    image: "https://images.unsplash.com/photo-1519689373023-dd07c7988603",
    borderColor: "#FFB6C1",
    description: "Loves to dance and laugh"
  },
  {
    id: 8,
    name: "Mason Lee",
    age: "4 months",
    votes: 115,
    image: "https://images.unsplash.com/photo-1520467259351-30dceb1b8ab1",
    borderColor: "#A8D8EA",
    description: "Quiet observer with big dreams"
  },
  {
    id: 9,
    name: "Isabella Rose",
    age: "8 months",
    votes: 103,
    image: "https://images.unsplash.com/photo-1542180149-d26a4ff8758a",
    borderColor: "#FFE66D",
    description: "Full of energy and curiosity"
  }
];

export default function Gallery() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sortBy, setSortBy] = useState("most-voted");

  // Filter babies based on search and filters
  const filteredBabies = allBabies
    .filter((baby) => {
      // Search filter
      const matchesSearch = baby.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Age filter
      const ageInMonths = parseInt(baby.age);
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
        return b.votes - a.votes;
      } else if (sortBy === "newest") {
        return b.id - a.id;
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
                BabyVote
              </h1>
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-[#2D2D2D] hover:text-[#FF9B50] transition-colors font-medium">
                Home
              </Link>
              <Link href="/gallery" className="text-[#FF9B50] font-semibold">
                Gallery
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
        {filteredBabies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBabies.map((baby) => (
              <div
                key={baby.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                style={{
                  border: `3px dashed ${baby.borderColor}`,
                }}
              >
                <div className="relative h-56 sm:h-64 overflow-hidden">
                  <Image
                    src={baby.image}
                    alt={`Photo of ${baby.name}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-[family-name:var(--font-quicksand)] text-lg font-semibold text-[#2D2D2D] mb-1">
                    {baby.name}
                  </h4>
                  <p className="text-sm text-[#999999] mb-2">{baby.age}</p>
                  <p className="text-xs sm:text-sm text-[#666666] mb-3 line-clamp-2">
                    {baby.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button className="flex items-center space-x-1 text-[#FF9B50] hover:text-[#FF8A3D] transition-colors">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                        <span className="text-sm font-semibold">{baby.votes}</span>
                      </button>
                    </div>
                    <Link
                      href={`/baby/${baby.id}`}
                      className="text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all duration-300 text-white"
                      style={{
                        backgroundColor: baby.borderColor,
                      }}
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Empty State
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

        {/* Load More Button */}
        {filteredBabies.length > 0 && (
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
                BabyVote
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
            <p>2025 BabyVote. All rights reserved. Made with love for babies everywhere.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
