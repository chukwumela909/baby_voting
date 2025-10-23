"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import RankingBadge from "../components/RankingBadge";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/hooks/useAuth";

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
  profiles?: {
    full_name: string;
  };
}

export default function Leaderboard() {
  const [babies, setBabies] = useState<Baby[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState<'all' | 'week' | 'month'>('all');
  const { user } = useAuth();

  useEffect(() => {
    fetchLeaderboard();
  }, [timeFilter]);

  const fetchLeaderboard = async () => {
    setLoading(true);
    const supabase = createClient();

    try {
      // Fetch babies with their uploader's profile information
      const { data: babiesData, error: babiesError } = await supabase
        .from('babies')
        .select('*')
        .order('vote_count', { ascending: false });

      if (babiesError) {
        console.error('Babies error:', babiesError);
        throw babiesError;
      }

      // Fetch profiles for all unique user_ids
      if (babiesData && babiesData.length > 0) {
        const userIds = [...new Set(babiesData.map(b => b.user_id))];
        const { data: profilesData, error: profilesError } = await supabase
          .from('profiles')
          .select('id, full_name')
          .in('id', userIds);

        if (profilesError) {
          console.error('Profiles error:', profilesError);
        }

        // Merge profiles with babies
        const babiesWithProfiles = babiesData.map(baby => ({
          ...baby,
          profiles: profilesData?.find(p => p.id === baby.user_id) 
            ? { full_name: profilesData.find(p => p.id === baby.user_id)!.full_name }
            : undefined
        }));

        setBabies(babiesWithProfiles);
      } else {
        setBabies([]);
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      setBabies([]);
    } finally {
      setLoading(false);
    }
  };

  const borderColors = ["#FFB6C1", "#A8D8EA", "#FFE66D", "#D4C5E8", "#FFC0CB", "#B8E6D5"];
  const getBorderColor = (index: number) => borderColors[index % borderColors.length];

  const getRankBadge = (rank: number) => {
    if (rank === 1) return { emoji: "🥇", color: "#FFD700", label: "1st Place" };
    if (rank === 2) return { emoji: "🥈", color: "#C0C0C0", label: "2nd Place" };
    if (rank === 3) return { emoji: "🥉", color: "#CD7F32", label: "3rd Place" };
    return { emoji: null, color: "#FF9B50", label: `${rank}th Place` };
  };

  return (
    <div className="min-h-screen bg-[#FFF5EB]">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <Link href="/dashboard" className="flex items-center">
              <h1 className="font-[family-name:var(--font-quicksand)] text-xl sm:text-2xl font-bold text-[#FF9B50]">
                PFBOTY
              </h1>
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/dashboard" className="text-[#2D2D2D] hover:text-[#FF9B50] transition-colors font-medium">
                Dashboard
              </Link>
              <Link href="/gallery" className="text-[#2D2D2D] hover:text-[#FF9B50] transition-colors font-medium">
                Gallery
              </Link>
              <Link href="/leaderboard" className="text-[#FF9B50] font-semibold">
                Leaderboard
              </Link>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="relative">
                <button className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#FFB6C1] overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
                      alt="User profile"
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="hidden sm:inline text-[#2D2D2D] font-medium">
                    {user?.user_metadata?.full_name || "User"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FF9B50] py-12 sm:py-16 relative overflow-hidden">
        <Image src="/decorations/star.svg" alt="" width={64} height={64} className="absolute top-6 left-10 opacity-30 animate-pulse" />
        <Image src="/decorations/star.svg" alt="" width={48} height={48} className="absolute top-10 right-20 opacity-30 animate-pulse" />
        <Image src="/decorations/star.svg" alt="" width={56} height={56} className="absolute bottom-6 left-1/4 opacity-30 animate-pulse" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="flex items-center justify-center mb-4">
            <span className="text-6xl sm:text-7xl lg:text-8xl">🏆</span>
          </div>
          <h1 className="font-[family-name:var(--font-quicksand)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Top Ranked Babies
          </h1>
          <p className="text-white/90 text-base sm:text-lg mb-6 max-w-2xl mx-auto">
            See who's winning hearts across our community!
          </p>

          {/* Time Frame Selector */}
          <div className="flex items-center justify-center gap-2 sm:gap-4">
            <button
              onClick={() => setTimeFilter("week")}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 ${
                timeFilter === "week"
                  ? "bg-white text-[#FF9B50] shadow-lg"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              This Week
            </button>
            <button
              onClick={() => setTimeFilter("month")}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 ${
                timeFilter === "month"
                  ? "bg-white text-[#FF9B50] shadow-lg"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              This Month
            </button>
            <button
              onClick={() => setTimeFilter("all")}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 ${
                timeFilter === "all"
                  ? "bg-white text-[#FF9B50] shadow-lg"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              All Time
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF9B50] mx-auto mb-4"></div>
              <p className="text-[#666666]">Loading leaderboard...</p>
            </div>
          </div>
        ) : babies.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">👶</div>
            <h3 className="font-[family-name:var(--font-quicksand)] text-xl font-semibold text-[#2D2D2D] mb-2">
              No babies yet
            </h3>
            <p className="text-[#999999] mb-6">Be the first to upload a baby photo!</p>
            <Link 
              href="/dashboard"
              className="inline-block bg-[#FF9B50] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#FF8A3D] transition-all duration-300"
            >
              Go to Dashboard
            </Link>
          </div>
        ) : (
          <>
            {/* Top 3 Podium */}
            {babies.length >= 3 && (
              <div className="mb-12">
                <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto">
                  {/* 2nd Place */}
                  <div className="flex flex-col items-center pt-8">
                    <div className="relative mb-4">
                      <div 
                        className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden border-4 border-[#C0C0C0]"
                      >
                        <Image
                          src={babies[1].photo_url}
                          alt={babies[1].name}
                          width={112}
                          height={112}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -top-2 -right-2 text-3xl sm:text-4xl">🥈</div>
                    </div>
                    <h3 className="font-[family-name:var(--font-quicksand)] text-sm sm:text-base font-bold text-[#2D2D2D] text-center mb-1">
                      {babies[1].name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#999999] mb-2">{babies[1].age} months</p>
                    <div className="bg-[#C0C0C0]/20 px-3 sm:px-4 py-2 rounded-full">
                      <p className="text-lg sm:text-xl font-bold text-[#C0C0C0]">{babies[1].vote_count}</p>
                    </div>
                  </div>

                  {/* 1st Place */}
                  <div className="flex flex-col items-center">
                    <div className="relative mb-4">
                      <div 
                        className="w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full overflow-hidden border-4 border-[#FFD700]"
                      >
                        <Image
                          src={babies[0].photo_url}
                          alt={babies[0].name}
                          width={144}
                          height={144}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -top-4 -right-2 text-4xl sm:text-5xl">🥇</div>
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                        <span className="text-3xl sm:text-4xl">👑</span>
                      </div>
                    </div>
                    <h3 className="font-[family-name:var(--font-quicksand)] text-base sm:text-lg font-bold text-[#2D2D2D] text-center mb-1">
                      {babies[0].name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#999999] mb-2">{babies[0].age} months</p>
                    <div className="bg-[#FFD700]/20 px-4 sm:px-6 py-2 rounded-full">
                      <p className="text-xl sm:text-2xl font-bold text-[#FFD700]">{babies[0].vote_count}</p>
                    </div>
                  </div>

                  {/* 3rd Place */}
                  <div className="flex flex-col items-center pt-8">
                    <div className="relative mb-4">
                      <div 
                        className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden border-4 border-[#CD7F32]"
                      >
                        <Image
                          src={babies[2].photo_url}
                          alt={babies[2].name}
                          width={112}
                          height={112}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -top-2 -right-2 text-3xl sm:text-4xl">🥉</div>
                    </div>
                    <h3 className="font-[family-name:var(--font-quicksand)] text-sm sm:text-base font-bold text-[#2D2D2D] text-center mb-1">
                      {babies[2].name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#999999] mb-2">{babies[2].age} months</p>
                    <div className="bg-[#CD7F32]/20 px-3 sm:px-4 py-2 rounded-full">
                      <p className="text-lg sm:text-xl font-bold text-[#CD7F32]">{babies[2].vote_count}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Full Rankings List */}
            <div className="bg-white rounded-3xl shadow-lg p-4 sm:p-6 lg:p-8">
              <h2 className="font-[family-name:var(--font-quicksand)] text-2xl sm:text-3xl font-bold text-[#2D2D2D] mb-6">
                Complete Rankings
              </h2>

              <div className="space-y-3">
                {babies.map((baby, index) => {
                  const rank = index + 1;
                  const badge = getRankBadge(rank);
                  const borderColor = getBorderColor(index);

                  return (
                    <Link
                      key={baby.id}
                      href={`/baby/${baby.id}`}
                      className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl hover:bg-[#FFF8F0] transition-all duration-300 border-2 border-transparent hover:border-[#FFE5D9]"
                      style={{
                        borderLeft: rank <= 3 ? `4px solid ${badge.color}` : undefined
                      }}
                    >
                      {/* Rank */}
                      <div className="flex-shrink-0 w-12 sm:w-16 text-center">
                        {badge.emoji ? (
                          <span className="text-3xl sm:text-4xl">{badge.emoji}</span>
                        ) : (
                          <span className="text-xl sm:text-2xl font-bold text-[#FF9B50]">#{rank}</span>
                        )}
                      </div>

                      {/* Baby Image */}
                      <div 
                        className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden"
                        style={{ border: `3px solid ${borderColor}` }}
                      >
                        <Image
                          src={baby.photo_url}
                          alt={baby.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Baby Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-[family-name:var(--font-quicksand)] text-base sm:text-lg font-bold text-[#2D2D2D] truncate">
                          {baby.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#999999]">
                          {baby.age} {baby.age === 1 ? 'month' : 'months'} • {baby.gender}
                          {baby.profiles?.full_name && ` • by ${baby.profiles.full_name}`}
                        </p>
                      </div>

                      {/* Votes */}
                      <div className="flex-shrink-0 text-right">
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF9B50] fill-current" viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                          </svg>
                          <div>
                            <p className="text-lg sm:text-xl font-bold text-[#FF9B50]">{baby.vote_count}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
              <div className="bg-gradient-to-br from-[#FFD700]/20 to-[#FFA500]/20 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-2">🎯</div>
                <p className="text-2xl sm:text-3xl font-bold text-[#FF9B50] mb-1">
                  {babies.length > 0 ? babies[0].vote_count : 0}
                </p>
                <p className="text-sm text-[#666666]">Highest Votes</p>
              </div>
              <div className="bg-gradient-to-br from-[#FFB6C1]/20 to-[#FFC0CB]/20 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-2">�</div>
                <p className="text-2xl sm:text-3xl font-bold text-[#FF9B50] mb-1">{babies.length}</p>
                <p className="text-sm text-[#666666]">Total Babies</p>
              </div>
              <div className="bg-gradient-to-br from-[#A8D8EA]/20 to-[#B8E6D5]/20 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-2">⭐</div>
                <p className="text-2xl sm:text-3xl font-bold text-[#FF9B50] mb-1">
                  {babies.reduce((sum, baby) => sum + baby.vote_count, 0)}
                </p>
                <p className="text-sm text-[#666666]">Total Votes Cast</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
