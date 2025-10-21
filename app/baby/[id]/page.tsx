"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

// Mock data - will be replaced with actual data from database
const babyData: { [key: string]: any } = {
  "1": {
    name: "Emma Rose",
    age: "8 months",
    gender: "Girl",
    votes: 234,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b",
    borderColor: "#FFB6C1",
    description: "Always smiling and loves to play with toys. Emma has the brightest personality and brings joy to everyone around her. She loves music and dancing!",
    uploadedBy: "Sarah Johnson",
    uploadDate: "2 weeks ago",
    gallery: [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b",
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4",
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9"
    ]
  },
  "2": {
    name: "Noah James",
    age: "6 months",
    gender: "Boy",
    votes: 198,
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9",
    borderColor: "#A8D8EA",
    description: "Curious little explorer with beautiful eyes. Noah loves discovering new things every day and has the sweetest smile!",
    uploadedBy: "Michael Chen",
    uploadDate: "1 week ago",
    gallery: [
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9",
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4"
    ]
  },
  "3": {
    name: "Sophia Grace",
    age: "10 months",
    gender: "Girl",
    votes: 187,
    image: "https://images.unsplash.com/photo-1500042600524-37ecb686c775",
    borderColor: "#FFE66D",
    description: "Sweet and gentle, loves cuddles. Sophia is the most affectionate baby and loves story time before bed!",
    uploadedBy: "Emily Davis",
    uploadDate: "3 days ago",
    gallery: [
      "https://images.unsplash.com/photo-1500042600524-37ecb686c775"
    ]
  }
};

export default function BabyProfile() {
  const params = useParams();
  const babyId = params.id as string;
  const baby = babyData[babyId];
  const [hasVoted, setHasVoted] = useState(false);
  const [voteCount, setVoteCount] = useState(baby?.votes || 0);

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

  const handleVote = () => {
    if (!hasVoted) {
      setVoteCount(voteCount + 1);
      setHasVoted(true);
      // TODO: Send vote to backend
    }
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
                BabyVote
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
                border: `4px dashed ${baby.borderColor}`,
              }}
            >
              <div className="relative h-64 sm:h-96 lg:h-[500px]">
                <Image
                  src={baby.image}
                  alt={baby.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Photo Gallery */}
            {baby.gallery && baby.gallery.length > 1 && (
              <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6">
                <h3 className="font-[family-name:var(--font-quicksand)] text-xl font-bold text-[#2D2D2D] mb-4">
                  More Photos
                </h3>
                <div className="grid grid-cols-3 gap-3 sm:gap-4">
                  {baby.gallery.slice(1).map((photo: string, index: number) => (
                    <div 
                      key={index}
                      className="relative aspect-square rounded-xl overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                      style={{
                        border: `2px dashed ${baby.borderColor}`,
                      }}
                    >
                      <Image
                        src={photo}
                        alt={`${baby.name} photo ${index + 2}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* About Section */}
            <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6">
              <h3 className="font-[family-name:var(--font-quicksand)] text-xl font-bold text-[#2D2D2D] mb-4">
                About {baby.name}
              </h3>
              <p className="text-[#666666] leading-relaxed">
                {baby.description}
              </p>
            </div>

            {/* Comments Section (Placeholder) */}
            <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6">
              <h3 className="font-[family-name:var(--font-quicksand)] text-xl font-bold text-[#2D2D2D] mb-4">
                Comments
              </h3>
              <div className="text-center py-8 text-[#999999]">
                <p>No comments yet. Be the first to comment!</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Baby Info Card */}
            <div 
              className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 sticky top-24"
              style={{
                border: `3px dashed ${baby.borderColor}`,
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
                  <span className="text-sm">{baby.age}</span>
                </div>
                <div className="flex items-center text-[#666666]">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="text-sm">{baby.gender}</span>
                </div>
                <div className="flex items-center text-[#666666]">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="text-sm">Uploaded by {baby.uploadedBy}</span>
                </div>
                <div className="flex items-center text-[#666666]">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm">{baby.uploadDate}</span>
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

            {/* Similar Babies */}
            <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6">
              <h3 className="font-[family-name:var(--font-quicksand)] text-lg font-bold text-[#2D2D2D] mb-4">
                Similar Babies
              </h3>
              <div className="space-y-3">
                {Object.entries(babyData)
                  .filter(([id]) => id !== babyId)
                  .slice(0, 3)
                  .map(([id, similarBaby]) => (
                    <Link
                      key={id}
                      href={`/baby/${id}`}
                      className="flex items-center space-x-3 p-2 rounded-xl hover:bg-[#FFF8F0] transition-colors"
                    >
                      <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#FFB6C1]">
                        <Image
                          src={similarBaby.image}
                          alt={similarBaby.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-[#2D2D2D] truncate">
                          {similarBaby.name}
                        </p>
                        <p className="text-xs text-[#999999]">{similarBaby.votes} votes</p>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
