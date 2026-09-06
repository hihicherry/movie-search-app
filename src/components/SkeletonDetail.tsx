const bone = 'bg-[#d5d2d2] theme-blue:bg-[#c5d4e8]';

interface SkeletonDetailProps {
  onBack: () => void;
}

function SkeletonDetail({ onBack }: SkeletonDetailProps) {
  return (
    <div className="p-6" aria-busy="true" aria-live="polite">
      <span className="sr-only">載入中</span>
      <div className="relative w-full h-[400px] bg-[#cdccf2] theme-blue:bg-[#ccddf2] animate-pulse">
        <div
          className={`absolute bottom-6 left-6 h-10 w-2/3 max-w-md ${bone}`}
        />
      </div>
      <div className="mt-3 mb-2">
        <div className={`h-10 w-36 ${bone} animate-pulse`} />
      </div>
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-theme-purple-card-gradient theme-blue:bg-theme-blue-card-gradient rounded-2xl p-6 shadow-[0_4px_10px_rgba(0,0,0,0.2)]"
        style={{ backdropFilter: 'blur(10px)' }}
      >
        <div className="animate-pulse space-y-3">
          <div className={`h-6 w-28 ${bone}`} />
          <div className={`h-4 w-full ${bone}`} />
          <div className={`h-4 w-5/6 ${bone}`} />
          <div className={`h-4 w-4/5 ${bone}`} />
          <div className={`h-4 w-3/4 ${bone}`} />
        </div>
        <div className="animate-pulse space-y-3">
          <div className={`h-6 w-28 ${bone}`} />
          <div className={`h-4 w-full ${bone}`} />
          <div className={`h-4 w-full ${bone}`} />
          <div className={`h-4 w-11/12 ${bone}`} />
          <div className={`h-4 w-2/3 ${bone}`} />
        </div>
        <div className="flex flex-wrap gap-4 mt-2 animate-pulse">
          <div className={`h-4 w-32 ${bone}`} />
          <div className={`h-4 w-20 ${bone}`} />
          <div className={`h-4 w-40 ${bone}`} />
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <div className={`mt-2 h-10 w-40 ${bone} animate-pulse`} />
        <button
          className="mt-2 font-pixel bg-gray-200 text-gray-700 px-3 py-2 rounded-sm border-2 border-t-white border-l-white border-r-gray-400 border-b-gray-400 hover:bg-gray-300"
          onClick={onBack}
        >
          <span>←</span> 返回
        </button>
      </div>
    </div>
  );
}

export default SkeletonDetail;
