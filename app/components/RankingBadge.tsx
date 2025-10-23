interface RankingBadgeProps {
  rank: number;
  size?: "sm" | "md" | "lg";
}

export default function RankingBadge({ rank, size = "md" }: RankingBadgeProps) {
  const getRankDetails = () => {
    if (rank === 1) return { emoji: "🥇", color: "#FFD700", bgColor: "bg-[#FFD700]/20" };
    if (rank === 2) return { emoji: "🥈", color: "#C0C0C0", bgColor: "bg-[#C0C0C0]/20" };
    if (rank === 3) return { emoji: "🥉", color: "#CD7F32", bgColor: "bg-[#CD7F32]/20" };
    return { emoji: null, color: "#FF9B50", bgColor: "bg-[#FF9B50]/10" };
  };

  const details = getRankDetails();

  const sizeClasses = {
    sm: { emoji: "text-2xl", number: "text-lg", padding: "px-2 py-1" },
    md: { emoji: "text-3xl", number: "text-xl", padding: "px-3 py-2" },
    lg: { emoji: "text-4xl", number: "text-2xl", padding: "px-4 py-3" }
  };

  return (
    <div className={`inline-flex items-center justify-center rounded-full ${details.bgColor} ${sizeClasses[size].padding}`}>
      {details.emoji ? (
        <span className={sizeClasses[size].emoji}>{details.emoji}</span>
      ) : (
        <span className={`${sizeClasses[size].number} font-bold`} style={{ color: details.color }}>
          #{rank}
        </span>
      )}
    </div>
  );
}
