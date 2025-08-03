"use client";
import { ApplyFormModal } from "@/app/components/ApplyFormModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CollegeData } from "@/types/college";
import Image from "next/image";
import React from "react";

interface CollegeCardProps {
  college: CollegeData;
}

const CollegeCard: React.FC<CollegeCardProps> = ({ college }) => {
  return (
    <Card className="group relative flex flex-col h-full bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden rounded-xl hover:-translate-y-1 hover:border-blue-300">
      <CardHeader className="relative flex flex-col items-center text-center p-4 sm:p-6 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 border-b border-gray-100">
        <div className="absolute top-3 right-3">
          <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-full shadow-sm border border-yellow-200">
            <span className="text-yellow-600 font-bold text-xs">
              {college.university.cv_rating}
            </span>
            <span className="text-yellow-500 text-xs">⭐</span>
          </div>
        </div>

        {college.university.logo && (
          <div className="relative mb-3">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-white p-2 shadow-md border border-gray-200 group-hover:shadow-lg transition-all duration-300">
              <Image
                src={college.university.logo}
                alt={`${college.university.name} Logo`}
                width={80}
                height={80}
                className="rounded-lg object-contain w-full h-full"
              />
            </div>
          </div>
        )}

        <CardTitle className="text-sm sm:text-lg font-bold text-gray-800 mb-2 leading-tight text-center max-w-full">
          {college.university.name}
        </CardTitle>

        <CardDescription className="text-xs sm:text-sm text-gray-600">
          {college.university.review_count} reviews
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-grow px-4 sm:px-6 pb-3 sm:pb-4 space-y-3">
        <div className="bg-green-50 p-3 rounded-lg border border-green-200">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-xs text-green-700 font-medium mb-1">
                Program Fee
              </p>
              <p className="text-lg sm:text-xl font-bold text-green-800">
                ₹{(college.fee / 100000).toFixed(1)}L
              </p>
              {college.full_fee_usd && (
                <p className="text-xs text-green-600">
                  ${(college.full_fee_usd / 1000).toFixed(0)}K USD
                </p>
              )}
            </div>
            <div className="text-green-600 text-lg">💰</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="bg-blue-50 p-2 rounded-lg border border-blue-200 text-center">
            <p className="text-xs text-blue-600 font-medium mb-1">Duration</p>
            <Badge className="bg-blue-600 text-white text-xs">
              {college?.dummyDuration || "2 Years"}
            </Badge>
          </div>
          <div className="bg-purple-50 p-2 rounded-lg border border-purple-200 text-center">
            <p className="text-xs text-purple-600 font-medium mb-1">Mode</p>
            <Badge className="bg-purple-600 text-white text-xs">
              {college?.university?.mode || "f23f"}
            </Badge>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold text-gray-800 text-sm flex items-center gap-2">
            <span className="text-blue-600 text-sm">🏆</span>
            Accreditations
          </h4>
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {college.university.approval_details.slice(0, 3).map((approval) => (
              <Badge
                key={approval.id}
                variant="outline"
                className="border-blue-300 text-blue-700 hover:bg-blue-50 text-xs px-2 py-1"
              >
                {approval.title}
              </Badge>
            ))}
            {college.university.approval_details.length > 3 && (
              <Badge
                variant="outline"
                className="text-xs px-2 py-1 text-gray-600"
              >
                +{college.university.approval_details.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-1 justify-center">
          <Badge className="bg-green-100 text-green-800 text-xs px-2 py-1 border border-green-200">
            💳 EMI Available
          </Badge>
          <Badge className="bg-purple-100 text-purple-800 text-xs px-2 py-1 border border-purple-200">
            💬 Free Counseling
          </Badge>
          <Badge className="bg-orange-100 text-orange-800 text-xs px-2 py-1 border border-orange-200">
            👨‍🏫 Expert Faculty
          </Badge>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 p-3 sm:p-4 bg-gray-50 border-t border-gray-100">
        <ApplyFormModal university={college.university} />
        <Button
          variant="outline"
          size="sm"
          className="flex-1 cursor-pointer border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white transition-all duration-300 font-medium text-xs sm:text-sm"
          onClick={() => {
            if (college.prospectus_link) {
              window.open(college.prospectus_link, "_blank");
            } else {
              alert("Brochure not available.");
            }
          }}
        >
          📄 Brochure
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CollegeCard;
