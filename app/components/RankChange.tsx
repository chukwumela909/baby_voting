interface RankChangeProps {
  currentRank: number;
  previousRank: number;
  showLabel?: boolean;
}

export default function RankChange({ currentRank, previousRank, showLabel = false }: RankChangeProps) {
  const change = previousRank - currentRank;

  if (change === 0) {
    return (
      <div className="flex items-center gap-1 text-[#999999]">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 10h14M3 10l4-4m-4 4l4 4" />
        </svg>
        {showLabel && <span className="text-sm font-medium">No change</span>}
      </div>
    );
  }

  if (change > 0) {
    return (
      <div className="flex items-center gap-1 text-[#4CAF50]">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
        <span className="text-sm font-semibold">{change}</span>
        {showLabel && <span className="text-sm font-medium">Up</span>}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 text-[#F44336]">
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
      <span className="text-sm font-semibold">{Math.abs(change)}</span>
      {showLabel && <span className="text-sm font-medium">Down</span>}
    </div>
  );
}
