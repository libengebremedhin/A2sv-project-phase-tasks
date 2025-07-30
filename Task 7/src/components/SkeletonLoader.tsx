export const SkeletonCard = () => (
  <div className="border border-gray-200 rounded-lg p-4 mb-4 animate-pulse">
    <div className="flex items-center space-x-4 mb-4">
      <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-3 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>
    <div className="space-y-3">
      <div className="h-5 bg-gray-300 rounded w-full"></div>
      <div className="h-4 bg-gray-300 rounded w-5/6"></div>
      <div className="h-4 bg-gray-300 rounded w-4/6"></div>
      <div className="h-4 bg-gray-300 rounded w-3/6"></div>
    </div>
    <div className="flex flex-wrap gap-2 mt-4">
      <div className="h-6 bg-gray-300 rounded-full w-20"></div>
      <div className="h-6 bg-gray-300 rounded-full w-20"></div>
    </div>
  </div>
);

export const SkeletonDetail = () => (
  <div className="animate-pulse space-y-6">
    <div className="flex items-start space-x-6">
      <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
      <div className="flex-1 space-y-4">
        <div className="h-8 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>

    <div className="space-y-4">
      <div className="h-6 bg-gray-300 rounded w-full"></div>
      <div className="h-4 bg-gray-300 rounded w-full"></div>
      <div className="h-4 bg-gray-300 rounded w-5/6"></div>
      <div className="h-4 bg-gray-300 rounded w-4/6"></div>
      <div className="h-4 bg-gray-300 rounded w-3/6"></div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="space-y-3">
          <div className="h-5 bg-gray-300 rounded w-1/3"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        </div>
      ))}
    </div>
  </div>
);
