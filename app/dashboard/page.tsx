"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import AddBabyModal from "../components/AddBabyModal";
import RankingBadge from "../components/RankingBadge";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface Baby {
  id: string;
  name: string;
  age: number;
  gender: string;
  description: string | null;
  photo_url: string;
  vote_count: number;
  created_at: string;
  user_id: string;
}

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [allBabies, setAllBabies] = useState<Baby[]>([]);
  const [myBabies, setMyBabies] = useState<Baby[]>([]);
  const [topBabies, setTopBabies] = useState<Baby[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalUploads: 0, totalVotes: 0, votesToday: 0 });
  const { user, signOut } = useAuth();
  const router = useRouter();

  // Fetch babies data
  useEffect(() => {
    if (user) {
      fetchBabies();
    }
  }, [user]);

  const fetchBabies = async () => {
    if (!user) return;
    
    setLoading(true);
    const supabase = createClient();

    try {
      // Fetch all babies (for main grid)
      const { data: allData, error: allError } = await supabase
        .from('babies')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (allError) throw allError;
      setAllBabies(allData || []);

      // Fetch user's babies
      const { data: myData, error: myError } = await supabase
        .from('babies')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (myError) throw myError;
      setMyBabies(myData || []);

      // Fetch top babies this week (for sidebar)
      const { data: topData, error: topError } = await supabase
        .from('babies')
        .select('*')
        .order('vote_count', { ascending: false })
        .limit(3);

      if (topError) throw topError;
      setTopBabies(topData || []);

      // Calculate stats
      const totalVotes = myData?.reduce((sum, baby) => sum + baby.vote_count, 0) || 0;
      setStats({
        totalUploads: myData?.length || 0,
        totalVotes: totalVotes,
        votesToday: 0 // TODO: Implement daily vote tracking
      });

    } catch (error) {
      console.error('Error fetching babies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
  };

  const handleBabyAdded = () => {
    // Refresh the data
    fetchBabies();
  };

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
            
            {/* Search Bar - Hidden on mobile, shown on tablet+ */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <input
                type="text"
                placeholder="Search babies..."
                className="w-full px-4 py-2 rounded-full border-2 border-[#FFE5D9] focus:border-[#FF9B50] focus:outline-none transition-colors"
              />
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Upload Button */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#FF9B50] text-white px-3 sm:px-6 py-2 sm:py-3 rounded-full font-semibold text-xs sm:text-base hover:bg-[#FF8A3D] transition-all duration-300 whitespace-nowrap"
              >
                + Upload
              </button>
              
              {/* User Profile Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#FFB6C1] to-[#FF9B50] flex items-center justify-center">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                  <span className="hidden sm:inline text-[#2D2D2D] font-medium">
                    {user?.user_metadata?.full_name || "User"}
                  </span>
                  <svg className="w-4 h-4 text-[#2D2D2D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-50 border border-gray-100">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-semibold text-[#2D2D2D]">
                        {user?.user_metadata?.full_name || "User"}
                      </p>
                      <p className="text-xs text-[#999999] truncate">{user?.email}</p>
                    </div>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-[#2D2D2D] hover:bg-[#FFF5EB] transition-colors"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-sm text-[#2D2D2D] hover:bg-[#FFF5EB] transition-colors"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      Settings
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden pb-4">
            <input
              type="text"
              placeholder="Search babies..."
              className="w-full px-4 py-2 rounded-full border-2 border-[#FFE5D9] focus:border-[#FF9B50] focus:outline-none transition-colors"
            />
          </div>

          {/* Secondary Navigation */}
          <div className="hidden md:flex items-center space-x-8 border-t border-gray-100 pt-4 pb-2">
            <Link href="/dashboard" className="text-[#FF9B50] font-semibold border-b-2 border-[#FF9B50] pb-1">
              Dashboard
            </Link>
            <Link href="/gallery" className="text-[#2D2D2D] hover:text-[#FF9B50] transition-colors font-medium">
              Gallery
            </Link>
            <Link href="/leaderboard" className="text-[#2D2D2D] hover:text-[#FF9B50] transition-colors font-medium">
              Leaderboard
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-9 space-y-6 sm:space-y-8">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-[#FFB6C1] to-[#FFC0CB] rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden">
              <Image src="/decorations/star.svg" alt="" width={48} height={48} className="absolute top-4 right-4 opacity-30" />
              <Image src="/decorations/heart.svg" alt="" width={40} height={40} className="absolute bottom-4 left-4 opacity-30" />
              <h2 className="font-[family-name:var(--font-quicksand)] text-2xl sm:text-3xl font-bold mb-2 relative z-10">
                Welcome back, {user?.user_metadata?.full_name?.split(' ')[0] || "there"}!
              </h2>
              <p className="text-white/90 text-sm sm:text-base mb-4 relative z-10">
                Your babies have received {stats.totalVotes} votes
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-block bg-white text-[#FFB6C1] px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base hover:bg-[#FFF8F0] transition-all duration-300 relative z-10"
              >
                Upload New Photo
              </button>
            </div>

            {/* Filter Tabs */}
            <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6">
              <div className="flex flex-wrap gap-2 sm:gap-4">
                <button className="px-4 sm:px-6 py-2 rounded-full bg-[#FF9B50] text-white font-semibold text-sm sm:text-base transition-all duration-300">
                  All Babies
                </button>
                <button className="px-4 sm:px-6 py-2 rounded-full bg-[#FFF8F0] text-[#666666] font-semibold text-sm sm:text-base hover:bg-[#FFE5D9] transition-all duration-300">
                  Most Voted
                </button>
                <button className="px-4 sm:px-6 py-2 rounded-full bg-[#FFF8F0] text-[#666666] font-semibold text-sm sm:text-base hover:bg-[#FFE5D9] transition-all duration-300">
                  Newest
                </button>
                <button className="px-4 sm:px-6 py-2 rounded-full bg-[#FFF8F0] text-[#666666] font-semibold text-sm sm:text-base hover:bg-[#FFE5D9] transition-all duration-300">
                  0-6 months
                </button>
                <button className="px-4 sm:px-6 py-2 rounded-full bg-[#FFF8F0] text-[#666666] font-semibold text-sm sm:text-base hover:bg-[#FFE5D9] transition-all duration-300">
                  6-12 months
                </button>
              </div>
            </div>

            {/* Baby Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {loading ? (
                // Loading skeleton
                [...Array(6)].map((_, index) => (
                  <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-md border-3 border-dashed border-gray-200 animate-pulse">
                    <div className="h-48 sm:h-64 bg-gray-200"></div>
                    <div className="p-4">
                      <div className="h-5 bg-gray-200 rounded mb-2 w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded mb-3 w-1/4"></div>
                      <div className="h-3 bg-gray-200 rounded mb-1 w-full"></div>
                      <div className="h-3 bg-gray-200 rounded mb-3 w-5/6"></div>
                      <div className="flex justify-between">
                        <div className="h-6 bg-gray-200 rounded w-16"></div>
                        <div className="h-8 bg-gray-200 rounded w-20"></div>
                      </div>
                    </div>
                  </div>
                ))
              ) : allBabies.length === 0 ? (
                // Empty state
                <div className="col-span-full bg-white rounded-2xl p-12 text-center border-3 border-dashed border-gray-200">
                  <div className="text-6xl mb-4">👶</div>
                  <h3 className="font-[family-name:var(--font-quicksand)] text-xl font-semibold text-[#2D2D2D] mb-2">
                    No babies yet
                  </h3>
                  <p className="text-[#999999] mb-6">Be the first to upload a baby photo!</p>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-[#FF9B50] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#FF8A3D] transition-all duration-300"
                  >
                    Upload Your First Baby
                  </button>
                </div>
              ) : (
                allBabies.map((baby, index) => {
                  const borderColors = ["#FFB6C1", "#A8D8EA", "#FFE66D", "#D4C5E8", "#FFC0CB", "#B8E6D5"];
                  const borderColor = borderColors[index % borderColors.length];
                  return (
                  <div
                    key={baby.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                    style={{
                      border: `3px dashed ${borderColor}`,
                    }}
                  >
                    <div className="relative h-48 sm:h-64 overflow-hidden">
                      <Image
                        src={baby.photo_url}
                        alt={`Photo of ${baby.name}`}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-[family-name:var(--font-quicksand)] text-lg font-semibold text-[#2D2D2D] mb-1">
                        {baby.name}
                      </h4>
                      <p className="text-sm text-[#999999] mb-2">
                        {baby.age} {baby.age === 1 ? 'month' : 'months'}
                      </p>
                      <p className="text-xs sm:text-sm text-[#666666] mb-3 line-clamp-2">
                        {baby.description || "No description"}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <button
                            className="flex items-center space-x-1 text-[#FF9B50] hover:text-[#FF8A3D] transition-colors"
                          >
                            <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24">
                              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                            <span className="text-sm font-semibold">{baby.vote_count}</span>
                          </button>
                        </div>
                        <Link
                          href={`/baby/${baby.id}`}
                          className="text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all duration-300"
                          style={{
                            backgroundColor: borderColor,
                            color: 'white'
                          }}
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })
              )}
            </div>

            {/* Load More Button */}
            <div className="text-center">
              <button className="bg-[#FF9B50] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-base hover:bg-[#FF8A3D] transition-all duration-300 shadow-lg hover:shadow-xl">
                Load More Babies
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-3 space-y-6">
            {/* My Babies */}
            <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-[family-name:var(--font-quicksand)] text-lg sm:text-xl font-bold text-[#2D2D2D]">
                  My Babies
                </h3>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="text-[#FF9B50] hover:text-[#FF8A3D] font-semibold text-sm transition-colors"
                >
                  + Add
                </button>
              </div>
              <div className="space-y-3">
                {loading ? (
                  // Loading skeleton
                  [...Array(2)].map((_, index) => (
                    <div key={index} className="flex items-center space-x-3 p-2 rounded-xl animate-pulse">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gray-200"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded mb-1 w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))
                ) : myBabies.length === 0 ? (
                  // Empty state
                  <div className="text-center py-6">
                    <p className="text-sm text-[#999999] mb-3">You haven't uploaded any babies yet</p>
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="text-[#FF9B50] hover:text-[#FF8A3D] font-semibold text-sm transition-colors"
                    >
                      Upload your first baby →
                    </button>
                  </div>
                ) : (
                  myBabies.slice(0, 3).map((baby) => (
                    <Link
                      key={baby.id}
                      href={`/baby/${baby.id}`}
                      className="flex items-center space-x-3 p-2 rounded-xl hover:bg-[#FFF8F0] transition-colors cursor-pointer"
                    >
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#FFB6C1]">
                        <Image
                          src={baby.photo_url}
                          alt={baby.name}
                          width={56}
                          height={56}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-[#2D2D2D] truncate">
                          {baby.name}
                        </p>
                        <p className="text-xs text-[#999999]">{baby.vote_count} votes</p>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>

            {/* Leaderboard */}
            <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-[family-name:var(--font-quicksand)] text-lg sm:text-xl font-bold text-[#2D2D2D]">
                  Top This Week
                </h3>
                <Link href="/leaderboard" className="text-[#FF9B50] hover:text-[#FF8A3D] font-semibold text-sm transition-colors">
                  View All
                </Link>
              </div>
              <div className="space-y-3">
                {loading ? (
                  // Loading skeleton
                  [...Array(3)].map((_, index) => (
                    <div key={index} className="flex items-center space-x-3 p-2 rounded-xl animate-pulse">
                      <div className="w-8 h-8 bg-gray-200 rounded"></div>
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-200"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded mb-1 w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))
                ) : topBabies.length === 0 ? (
                  // Empty state
                  <div className="text-center py-6">
                    <p className="text-sm text-[#999999]">No babies to show yet</p>
                  </div>
                ) : (
                  topBabies.map((baby, index) => (
                    <Link
                      key={baby.id}
                      href={`/baby/${baby.id}`}
                      className="flex items-center space-x-3 p-2 rounded-xl hover:bg-[#FFF8F0] transition-colors cursor-pointer"
                    >
                      <RankingBadge rank={index + 1} size="sm" />
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src={baby.photo_url}
                          alt={baby.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-[#2D2D2D] truncate">
                          {baby.name}
                        </p>
                        <p className="text-xs text-[#999999]">{baby.vote_count} votes</p>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-[#FFE5D9] to-[#FFF5EB] rounded-2xl shadow-sm p-4 sm:p-6 relative overflow-hidden">
              <Image src="/decorations/star.svg" alt="" width={32} height={32} className="absolute top-2 right-2 opacity-30" />
              <h3 className="font-[family-name:var(--font-quicksand)] text-lg sm:text-xl font-bold text-[#2D2D2D] mb-4 relative z-10">
                Your Stats
              </h3>
              <div className="space-y-3 relative z-10">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#666666]">Total Uploads</span>
                  <span className="font-bold text-[#FF9B50] text-lg">
                    {loading ? '...' : stats.totalUploads}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#666666]">Total Votes</span>
                  <span className="font-bold text-[#FF9B50] text-lg">
                    {loading ? '...' : stats.totalVotes}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#666666]">Votes Today</span>
                  <span className="font-bold text-[#FF9B50] text-lg">
                    {loading ? '...' : stats.votesToday}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Baby Modal */}
      <AddBabyModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleBabyAdded}
      />
    </div>
  );
}
