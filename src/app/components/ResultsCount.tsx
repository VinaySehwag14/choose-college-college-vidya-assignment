import React from "react";

interface ResultsCountProps {
  count: number;
}

const ResultsCount: React.FC<ResultsCountProps> = ({ count }) => {
  return (
    <div className="mb-4 text-gray-800  font-medium">
      Showing {count} result{count !== 1 ? "s" : ""}
    </div>
  );
};

export default ResultsCount;
