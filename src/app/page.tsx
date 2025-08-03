"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ChevronDown, ChevronUp, Filter as FilterIcon } from "lucide-react";

const BASE_API_URL = "https://admin.collegevidya.com/getuserbyuniversity/";
const DEFAULT_CID = "1";
const DEFAULT_UID = "467d8841-b3c3-42cc-a439-ee4d912bf1c6";
const INITIAL_LOWER = 0;
const INITIAL_UPPER = 6;
const ITEMS_PER_LOAD = 6;
const MAX_UPPER_LIMIT = 52;

const DURATION_OPTIONS = ["1 Year", "2 Years", "3 Years"];

async function getPaginatedCollegeData(
  lower: number,
  upper: number
): Promise<CollegeData[]> {
  const requestBody = new URLSearchParams();
  requestBody.append("cid", DEFAULT_CID);
  requestBody.append("uid", DEFAULT_UID);
  requestBody.append("lower", String(lower));
  requestBody.append("upper", String(upper));

  try {
    const res = await fetch(BASE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: requestBody.toString(),
      cache: "no-store",
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(
        `Failed to fetch data: ${res.status} ${res.statusText} - ${errorText}`
      );
    }

    const data: ApiResponse = await res.json();

    const collegesWithDummyDuration = data.data.map((college) => {
      const randomIndex = Math.floor(Math.random() * DURATION_OPTIONS.length);
      return {
        ...college,
        dummyDuration: DURATION_OPTIONS[randomIndex],
      };
    });

    return collegesWithDummyDuration;
  } catch (error) {
    console.error("Error fetching paginated college data:", error);
    throw error;
  }
}

import { ApiResponse, CollegeData } from "@/types/college";
import CollegeCard from "./components/CollegeCard";
import CollegeCardSkeleton from "./components/CollegeCardSkeleton";
import Footer from "./components/Footer";
import ResultsCount from "./components/ResultsCount";

export default function Home() {
  const [colleges, setColleges] = useState<CollegeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentLower, setCurrentLower] = useState(INITIAL_LOWER);
  const [currentUpper, setCurrentUpper] = useState(INITIAL_UPPER);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const MAX_FEE = 1500000;
  const [feeRange, setFeeRange] = useState<[number, number]>([0, MAX_FEE]);
  const [duration, setDuration] = useState<string>("all");
  const [universityType, setUniversityType] = useState<string>("all");

  const [sortOption, setSortOption] = useState<string>("none");

  const [isMounted, setIsMounted] = useState(false);
  const [isFilterCollapsed, setIsFilterCollapsed] = useState(true);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const fetchData = async (
    lower: number,
    upper: number,
    append: boolean = false
  ) => {
    try {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      const newData = await getPaginatedCollegeData(lower, upper);

      if (append) {
        setColleges((prevColleges) => [...prevColleges, ...newData]);
      } else {
        setColleges(newData);
      }

      if (
        newData.length < ITEMS_PER_LOAD ||
        (upper >= MAX_UPPER_LIMIT && newData.length === 0)
      ) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred while fetching data.");
      }
      setHasMore(false);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchData(INITIAL_LOWER, INITIAL_UPPER, false);
  }, []);

  const handleLoadMore = () => {
    const nextLower = currentUpper;
    const nextUpper = Math.min(
      currentUpper + ITEMS_PER_LOAD,
      MAX_UPPER_LIMIT + ITEMS_PER_LOAD
    );

    setCurrentLower(nextLower);
    setCurrentUpper(nextUpper);
    fetchData(nextLower, nextUpper, true);
  };

  const filteredColleges = useMemo(() => {
    return colleges.filter((college) => {
      const collegeFee = college.fee;
      if (collegeFee < feeRange[0] || collegeFee > feeRange[1]) {
        return false;
      }

      if (duration !== "all") {
        if (college.dummyDuration !== duration) {
          return false;
        }
      }

      if (universityType !== "all") {
        const hasMatchingAccreditation =
          college.university.approval_details.some((approval) =>
            approval.title.includes(universityType)
          );
        if (!hasMatchingAccreditation) {
          return false;
        }
      }

      return true;
    });
  }, [colleges, feeRange, duration, universityType]);

  const sortedColleges = useMemo(() => {
    const sortableColleges = [...filteredColleges];

    switch (sortOption) {
      case "fee-asc":
        return sortableColleges.sort((a, b) => a.fee - b.fee);
      case "fee-desc":
        return sortableColleges.sort((a, b) => b.fee - a.fee);
      case "none":
      default:
        return sortableColleges;
    }
  }, [filteredColleges, sortOption]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <header className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>

        <div className="relative container mx-auto px-4 py-16 sm:py-20 lg:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Discover Your Perfect
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                MBA Program
              </span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Explore top-ranked universities, compare fees, and find accredited
              online MBA programs that fit your career goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                <span className="text-yellow-300">⭐</span>
                <span className="text-sm font-medium">
                  4.8/5 Average Rating
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                <span className="text-green-300">🎓</span>
                <span className="text-sm font-medium">50+ Universities</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {isMounted && (
        <section className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center mb-4 sm:hidden">
              <h2 className="text-xl font-bold text-gray-800">
                Filters & Sort
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFilterCollapsed(!isFilterCollapsed)}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700"
              >
                <FilterIcon className="h-4 w-4" />
                {isFilterCollapsed ? "Show Filters" : "Hide Filters"}
                {isFilterCollapsed ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronUp className="h-4 w-4" />
                )}
              </Button>
            </div>

            <div
              className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 transition-all duration-300 ease-in-out ${
                isFilterCollapsed
                  ? "max-h-0 overflow-hidden opacity-0 sm:max-h-full sm:overflow-visible sm:opacity-100"
                  : "max-h-screen opacity-100"
              }`}
            >
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">
                  Fee Range
                </label>
                <div className="text-sm text-blue-600 font-medium mb-2">
                  ₹{feeRange[0].toLocaleString("en-IN")} - ₹
                  {feeRange[1].toLocaleString("en-IN")}
                </div>
                <Slider
                  min={0}
                  max={MAX_FEE}
                  step={10000}
                  value={feeRange}
                  onValueChange={(value: number[]) =>
                    setFeeRange(value as [number, number])
                  }
                  className="w-full [&>span:first-child]:bg-gray-300 [&>span:first-child]:h-2 [&>span:first-child>span]:bg-blue-500 [&>span:first-child>span]:h-2" // Corrected classes for shadcn/ui slider
                />
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">
                  Program Duration
                </label>
                <Select onValueChange={setDuration} value={duration}>
                  <SelectTrigger className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Durations</SelectItem>
                    {DURATION_OPTIONS.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">
                  Accreditation
                </label>
                <Select
                  onValueChange={setUniversityType}
                  value={universityType}
                >
                  <SelectTrigger className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue placeholder="Select accreditation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="UGC">UGC Approved</SelectItem>
                    <SelectItem value="AICTE">AICTE Approved</SelectItem>
                    <SelectItem value="NAAC">NAAC Accredited</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">
                  Sort By
                </label>
                <Select onValueChange={setSortOption} value={sortOption}>
                  <SelectTrigger className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue placeholder="Sort programs" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Default</SelectItem>
                    <SelectItem value="fee-asc">Fee: Low to High</SelectItem>
                    <SelectItem value="fee-desc">Fee: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>
      )}

      <main className="container mx-auto px-4 py-8 lg:py-12">
        {error ? (
          <div className="max-w-md mx-auto text-center py-16">
            <div className="bg-red-50 border border-red-200 rounded-xl p-8">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚠️</span>
              </div>
              <h3 className="text-xl font-semibold text-red-800 mb-2">
                Oops! Something went wrong
              </h3>
              <p className="text-red-600 mb-4">{error}</p>
              <p className="text-sm text-red-500">
                Please try again later or check your network connection.
              </p>
            </div>
          </div>
        ) : (
          <>
            {loading && colleges.length === 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                {Array.from({ length: ITEMS_PER_LOAD }).map((_, index) => (
                  <CollegeCardSkeleton key={index} />
                ))}
              </div>
            ) : (
              <>
                {sortedColleges.length > 0 && (
                  <ResultsCount count={sortedColleges.length} />
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                  {sortedColleges.length > 0
                    ? sortedColleges.map((college) => (
                        <CollegeCard
                          key={college.university.id}
                          college={college}
                        />
                      ))
                    : !loading &&
                      colleges.length > 0 && ( // Only show "No Programs Found" if colleges were initially loaded but then filtered to zero
                        <div className="col-span-full text-center py-16">
                          <div className="max-w-md mx-auto">
                            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                              <span className="text-4xl">🔍</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">
                              No Programs Found
                            </h3>
                            <p className="text-gray-600 mb-6">
                              We couldn&#39;t find any programs matching your
                              current filters. Try adjusting your search
                              criteria.
                            </p>
                            <Button
                              onClick={() => {
                                setFeeRange([0, MAX_FEE]);
                                setDuration("all");
                                setUniversityType("all");
                                setSortOption("none");
                              }}
                              className="bg-blue-600 hover:bg-blue-700 text-white"
                            >
                              Clear All Filters
                            </Button>
                          </div>
                        </div>
                      )}
                </div>
              </>
            )}

            {hasMore && sortedColleges.length > 0 && (
              <div className="flex justify-center mt-12">
                <Button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  {loadingMore ? (
                    <>
                      Loading More...
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    </>
                  ) : (
                    <>
                      Load More Programs
                      <span className="ml-2">👇</span>
                    </>
                  )}
                </Button>
              </div>
            )}

            {!hasMore &&
              colleges.length > 0 &&
              !loading &&
              sortedColleges.length > 0 && (
                <div className="text-center py-12">
                  <div className="inline-flex items-center gap-2 bg-gray-100 px-6 py-3 rounded-full">
                    <span className="text-gray-600">🎉</span>
                    <span className="text-gray-700 font-medium">
                      You&#39;ve seen all available programs!
                    </span>
                  </div>
                </div>
              )}

            {!loading && colleges.length === 0 && !error && (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-4xl">🏫</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    No Universities Available
                  </h3>
                  <p className="text-gray-600">
                    We&#39;re working on adding more programs. Please check back
                    later.
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
