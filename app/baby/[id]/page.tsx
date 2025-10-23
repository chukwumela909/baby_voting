"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
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
}

export default function BabyProfile() {
  const params = useParams();
  const babyId = params.id as string;
  const { user } = useAuth();
  const [baby, setBaby] = useState<Baby | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasVoted, setHasVoted] = useState(false);
  const [voteCount, setVoteCount] = useState(0);

  useEffect(() => {
    if (babyId) {
      fetchBabyData();
    }
  }, [babyId]);

  useEffect(() => {
    if (user && babyId) {
      checkIfUserHasVoted();
    }
  }, [user, babyId]);

  const fetchBabyData = async () => {
    setLoading(true);
    const supabase = createClient();

    try {
      const { data, error } = await supabase
        .from('babies')
        .select('*')
        .eq('id', babyId)
        .single();

      if (error) throw error;

      setBaby(data);
      setVoteCount(data.vote_count);
    } catch (error) {
      console.error('Error fetching baby:', error);
      setBaby(null);
    } finally {
      setLoading(false);
    }
  };

  const checkIfUserHasVoted = async () => {
    if (!user) return;
    
    const supabase = createClient();
    
    try {
      const { data, error } = await supabase
        .from('votes')
        .select('id')
        .eq('user_id', user.id)
        .eq('baby_id', babyId)
        .single();

      if (data) {
        setHasVoted(true);
      }
    } catch (error) {
      // No vote found, user hasn't voted yet
      setHasVoted(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF5EB] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF9B50] mx-auto mb-4"></div>
          <p className="text-[#666666]">Loading...</p>
        </div>
      </div>
    );
  }

  if (!baby) {
    return (
      <div className="min-h-screen bg-[#FFF5EB] flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-[family-name:var(--font-quicksand)] text-2xl font-bold text-[#2D2D2D] mb-4">
            Baby Not Found
          </h2>
          <Link href="/dashboard" className="text-[#FF9B50] hover:text-[#FF8A3D] font-semibold">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const handleVote = async () => {
    if (!user) {
      alert('Please log in to vote');
      return;
    }

    if (hasVoted) {
      return;
    }

    if (!baby) return;

    const supabase = createClient();
    
    try {
      // Insert vote record first
      const { error: voteError } = await supabase
        .from('votes')
        .insert({
          user_id: user.id,
          baby_id: baby.id
        });

      if (voteError) {
        // Check if it's a duplicate vote error
        if (voteError.code === '23505') {
          alert('You have already voted for this baby!');
          setHasVoted(true);
          return;
        }
        throw voteError;
      }

      // Use RPC to increment vote count atomically
      const { error: rpcError } = await supabase.rpc('increment_vote_count', {
        baby_id: baby.id
      });

      if (rpcError) {
        console.error('RPC Error:', rpcError);
        // Fallback: fetch updated vote count
        const { data: updatedBaby } = await supabase
          .from('babies')
          .select('vote_count')
          .eq('id', baby.id)
          .single();
        
        if (updatedBaby) {
          setVoteCount(updatedBaby.vote_count);
        }
      } else {
        // Successfully incremented, update local state
        setVoteCount(voteCount + 1);
      }

      setHasVoted(true);
    } catch (error) {
      console.error('Error voting:', error);
      alert('Failed to vote. Please try again.');
    }
  };

  const borderColors = ["#FFB6C1", "#A8D8EA", "#FFE66D", "#D4C5E8", "#FFC0CB", "#B8E6D5"];
  const borderColor = borderColors[baby ? parseInt(baby.id.slice(0, 8), 16) % borderColors.length : 0];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  return (
    <div className="min-h-screen bg-[#FFF5EB]">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <Link href="/dashboard" className="flex items-center space-x-2 text-[#666666] hover:text-[#FF9B50] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="font-semibold">Back</span>
            </Link>
            
            <Link href="/dashboard">
              <h1 className="font-[family-name:var(--font-quicksand)] text-xl sm:text-2xl font-bold text-[#FF9B50]">
                PFBOTY
              </h1>
            </Link>

            <div className="w-20"></div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Photo */}
            <div 
              className="bg-white rounded-3xl overflow-hidden shadow-lg"
              style={{
                border: `4px dashed ${borderColor}`,
              }}
            >
              <div className="relative h-64 sm:h-96 lg:h-[500px]">
                <Image
                  src={baby.photo_url}
                  alt={baby.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* About Section */}
            <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6">
              <h3 className="font-[family-name:var(--font-quicksand)] text-xl font-bold text-[#2D2D2D] mb-4">
                About {baby.name}
              </h3>
              <p className="text-[#666666] leading-relaxed">
                {baby.description || "No description provided."}
              </p>
            </div>

            {/* Comments Section (Placeholder) */}
            {/* <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6">
              <h3 className="font-[family-name:var(--font-quicksand)] text-xl font-bold text-[#2D2D2D] mb-4">
                Comments
              </h3>
              <div className="text-center py-8 text-[#999999]">
                <p>No comments yet. Be the first to comment!</p>
              </div>
            </div> */}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Baby Info Card */}
            <div 
              className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 sticky top-24"
              style={{
                border: `3px dashed ${borderColor}`,
              }}
            >
              <h2 className="font-[family-name:var(--font-quicksand)] text-2xl sm:text-3xl font-bold text-[#2D2D2D] mb-2">
                {baby.name}
              </h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-[#666666]">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm">{baby.age} {baby.age === 1 ? 'month' : 'months'}</span>
                </div>
                <div className="flex items-center text-[#666666]">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="text-sm">{baby.gender}</span>
                </div>
                <div className="flex items-center text-[#666666]">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm">{formatDate(baby.created_at)}</span>
                </div>
              </div>

              {/* Vote Button */}
              <button
                onClick={handleVote}
                disabled={hasVoted}
                className={`w-full flex items-center justify-center space-x-2 py-3 px-6 rounded-full font-semibold text-base transition-all duration-300 ${
                  hasVoted
                    ? 'bg-[#FFE5D9] text-[#FF9B50] cursor-not-allowed'
                    : 'bg-[#FF9B50] text-white hover:bg-[#FF8A3D] shadow-lg hover:shadow-xl'
                }`}
              >
                <svg className={`w-6 h-6 ${hasVoted ? 'fill-current' : ''}`} fill={hasVoted ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>{hasVoted ? 'Voted!' : 'Vote'}</span>
              </button>

              {/* Vote Count */}
              <div className="text-center mt-4">
                <p className="text-2xl font-bold text-[#FF9B50]">{voteCount}</p>
                <p className="text-sm text-[#999999]">Total Votes</p>
              </div>

              {/* Share Button */}
              <button className="w-full mt-4 flex items-center justify-center space-x-2 py-2 px-6 rounded-full font-semibold text-sm border-2 border-[#FFE5D9] text-[#666666] hover:bg-[#FFF8F0] transition-all duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
