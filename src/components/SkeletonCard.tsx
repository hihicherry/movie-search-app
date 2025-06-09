const SkeletonCard: React.FC = () => {
  return (
    <div className="w-full aspect-[2/3] bg-[#cdccf2] theme-blue:bg-[#ccddf2] rounded-lg p-2.5 flex flex-col gap-2.5 animate-pulse">
      <div className="w-full h-[70%] bg-[#d5d2d2]"></div>
      <div className="w-4/5 h-2.5 bg-[#cecccc]"></div>
      <div className="w-3/5 h-2.5 bg-[#cecccc]"></div>
    </div>
  );
};

export default SkeletonCard;
