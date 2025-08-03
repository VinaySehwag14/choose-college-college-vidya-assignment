import React from "react";

const CollegeCardSkeleton: React.FC = () => {
  return (
    <div className="group relative flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden animate-pulse">
      <div className="relative flex flex-col items-center text-center p-4 sm:p-6 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 border-b border-gray-100">
        <div className="absolute top-3 right-3">
          <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full w-16 h-6"></div>
        </div>
        <div className="relative mb-3">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gray-200 p-2 shadow-md border border-gray-200"></div>
        </div>
        <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>{" "}
      </div>

      <div className="flex-grow px-4 sm:px-6 pb-3 sm:pb-4 space-y-3">
        <div className="bg-gray-100 p-3 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="h-3 bg-gray-200 rounded w-1/3 mb-1"></div>{" "}
              <div className="h-5 bg-gray-300 rounded w-1/2"></div>{" "}
              <div className="h-3 bg-gray-200 rounded w-1/4 mt-1"></div>{" "}
            </div>
            <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="bg-gray-100 p-2 rounded-lg border border-gray-200 text-center">
            <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto mb-1"></div>{" "}
            <div className="h-6 bg-gray-200 rounded-full w-3/4 mx-auto"></div>{" "}
          </div>
          <div className="bg-gray-100 p-2 rounded-lg border border-gray-200 text-center">
            <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto mb-1"></div>{" "}
            <div className="h-6 bg-gray-200 rounded-full w-3/4 mx-auto"></div>{" "}
          </div>
        </div>

        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>{" "}
          <div className="flex flex-wrap gap-1 sm:gap-2">
            <div className="h-6 bg-gray-100 rounded-full w-20"></div>
            <div className="h-6 bg-gray-100 rounded-full w-16"></div>
            <div className="h-6 bg-gray-100 rounded-full w-24"></div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 justify-center pt-2">
          <div className="h-6 bg-gray-100 rounded-full w-24"></div>
          <div className="h-6 bg-gray-100 rounded-full w-28"></div>
          <div className="h-6 bg-gray-100 rounded-full w-20"></div>
        </div>
      </div>
      <div className="flex gap-2 p-3 sm:p-4 bg-gray-50 border-t border-gray-100">
        <div className="flex-1 h-10 bg-gray-200 rounded-md"></div>{" "}
        <div className="flex-1 h-10 bg-gray-200 rounded-md"></div>{" "}
      </div>
    </div>
  );
};

export default CollegeCardSkeleton;
