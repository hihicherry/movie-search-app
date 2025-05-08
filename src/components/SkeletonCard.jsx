const SkeletonCard = () => {
  return (
    <div className="w-full aspect-[2/3] bg-[#cdccf2] rounded-lg p-2.5 flex flex-col gap-2.5 animate-pulse">
      <div className="w-full h-[70%] bg-[#d5d2d2] rounded"></div>
      <div className="w-4/5 h-2.5 bg-[#cecccc] rounded"></div>
      <div className="w-3/5 h-2.5 bg-[#cecccc] rounded"></div>
    </div>
  );
};

export default SkeletonCard;
