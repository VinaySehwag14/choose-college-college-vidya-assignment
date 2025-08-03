"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { University } from "@/types/college";
import { BookOpen, CheckCircle2, Lightbulb, PartyPopper } from "lucide-react";

interface ApplyFormModalProps {
  university: University;
}

export function ApplyFormModal({ university }: ApplyFormModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("know-your-university");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsOpen(false);
    setShowSuccessPopup(true);

    setName("");
    setEmail("");
    setPhone("");
    setActiveTab("know-your-university");
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="flex-1 mr-2 cursor-pointer bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold">
            Apply Now
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[700px] h-[90vh] flex flex-col bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50 overflow-hidden">
          <DialogHeader className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              {university.logo && (
                <Image
                  src={university.logo}
                  alt={`${university.name} Logo`}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              )}
              <div>
                <DialogTitle className="text-lg sm:text-xl">
                  {university.name}
                </DialogTitle>
                <DialogDescription className="text-sm">
                  Discover your MBA program.
                </DialogDescription>
              </div>
            </div>
            <div className="flex items-center justify-end text-sm text-gray-600 dark:text-gray-400 gap-4 mt-2">
              {university.prospectus_link && (
                <a
                  href={university.prospectus_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <BookOpen className="h-4 w-4" /> Brochure
                </a>
              )}
              {university.syllabus_link && (
                <a
                  href={university.syllabus_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <BookOpen className="h-4 w-4" /> Syllabus
                </a>
              )}
            </div>
          </DialogHeader>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="flex flex-col flex-grow overflow-hidden"
          >
            <TabsList className="grid flex w-full grid-cols-5 p-0 h-auto rounded-none border-b border-gray-200 dark:border-gray-700 bg-transparent overflow-y-auto">
              <TabsTrigger
                value="know-your-university"
                className="py-3 px-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-blue-300 text-xs sm:text-sm font-semibold"
              >
                Know Your University
              </TabsTrigger>

              <TabsTrigger
                value="e-learning-experience"
                className="py-3 px-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-blue-300 text-xs sm:text-sm font-semibold"
              >
                E-learning Experience
              </TabsTrigger>
              <TabsTrigger
                value="alumni-talk-reviews"
                className="py-3 px-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-blue-300 text-xs sm:text-sm font-semibold"
              >
                Alumni Talk & Reviews
              </TabsTrigger>
              <TabsTrigger
                value="apply-now"
                className="py-3 px-2 cursor-pointer data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-blue-300 text-xs sm:text-sm font-semibold"
              >
                Apply Now
              </TabsTrigger>
            </TabsList>

            <div
              className="flex-grow overflow-y-auto p-4 sm:p-6 "
              style={{ height: "1vh" }}
            >
              <TabsContent value="know-your-university">
                <h3 className="text-md sm:text-lg font-bold mb-3 text-gray-800 dark:text-gray-50">
                  About University
                </h3>
                <p
                  className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4"
                  dangerouslySetInnerHTML={{
                    __html:
                      university.about_short_description ||
                      "Information about the university's mission, history, and educational philosophy goes here.",
                  }}
                />

                <h3 className="text-md sm:text-lg font-bold mb-3 text-gray-800 dark:text-gray-50">
                  Facts
                </h3>
                <div className="space-y-3">
                  {university.approval_details &&
                  university.approval_details.length > 0 ? (
                    university.approval_details.map((approval) => (
                      <div
                        key={approval.id}
                        className="bg-blue-50 dark:bg-gray-700 p-3 rounded-lg flex items-start gap-2 border border-blue-200 dark:border-gray-600"
                      >
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {approval.title}{" "}
                          {approval.accreditation_description &&
                            `- ${approval.accreditation_description}`}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="bg-blue-50 dark:bg-gray-700 p-3 rounded-lg flex items-start gap-2 border border-blue-200 dark:border-gray-600">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        The university offers various programs approved by
                        recognized bodies.
                      </p>
                    </div>
                  )}
                  <div className="bg-blue-50 dark:bg-gray-700 p-3 rounded-lg flex items-start gap-2 border border-blue-200 dark:border-gray-600">
                    <Lightbulb className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      The curriculum for each course is relevant to its
                      corresponding industry and has been designed by expert
                      academicians from across the globe.
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="e-learning-experience">
                <h3 className="text-md sm:text-lg font-bold mb-3 text-gray-800 dark:text-gray-50">
                  E-learning Experience
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Explore the advanced e-learning platform, interactive virtual
                  classrooms, and extensive digital resources provided by{" "}
                  {university.name}. The university is committed to providing a
                  seamless and engaging online learning environment.
                </p>
                <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Live interactive sessions with faculty.</li>
                  <li>
                    Access to a vast digital library and research journals.
                  </li>
                  <li>
                    Dedicated student support and doubt-clearing sessions.
                  </li>
                  <li>Flexible learning schedules and self-paced modules.</li>
                  <li>Industry-relevant case studies and projects.</li>
                </ul>
                {university.universty_banner &&
                  university.universty_banner.length > 0 &&
                  university.universty_banner[0]?.video_link && (
                    <div className="mt-6 aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                      <iframe
                        src={university.universty_banner[0].video_link}
                        title="University Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      ></iframe>
                    </div>
                  )}
              </TabsContent>

              <TabsContent
                value="alumni-talk-reviews"
                className="flex flex-col h-full"
              >
                {" "}
                <h3 className="text-md sm:text-lg font-bold mb-3 text-gray-800 dark:text-gray-50">
                  Alumni Success Stories & Reviews
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Hear directly from the alumni of {university.name} about their
                  career growth and experience with the program. Read authentic
                  reviews to make an informed decision.
                </p>
                <div className="space-y-4 flex-grow overflow-y-auto pr-2">
                  {" "}
                  {Array.isArray(university.reviews) &&
                  university.reviews.length > 0 ? (
                    university.reviews.map((review) => (
                      <div
                        key={review.id}
                        className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg border border-gray-200 dark:border-gray-600"
                      >
                        <p className="font-semibold text-gray-800 dark:text-gray-50">
                          {review.reviewer_name}{" "}
                          {review.course && review.specializations
                            ? `, ${review.course} (${review.specializations})`
                            : review.course
                            ? `, ${review.course}`
                            : review.specializations
                            ? ` (${review.specializations})`
                            : ""}
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                          &quot;{review.content}&quot;
                        </p>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-2">
                          {"⭐".repeat(review.rating)}{" "}
                          {review.rating > 0 ? `(${review.rating}/5)` : ""}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      No alumni reviews available yet.
                    </p>
                  )}
                </div>
                {university.review_count || university.fake_review_count ? (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                    ({university.review_count || 0} verified reviews and{" "}
                    {university.fake_review_count || 0} unverified reviews)
                  </p>
                ) : null}
              </TabsContent>

              <TabsContent value="apply-now">
                <form onSubmit={handleSubmit} className="h-full flex flex-col">
                  <div className="grid gap-4 py-4 flex-grow overflow-y-auto custom-scrollbar pr-2">
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                      Fill out the form below and our counselors will get in
                      touch with you shortly to discuss the MBA program at **
                      {university.name}**.
                    </p>
                    <div className="grid gap-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        required
                        className="col-span-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-50 border-gray-300 dark:border-gray-600"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john.doe@example.com"
                        required
                        className="col-span-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-50 border-gray-300 dark:border-gray-600"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1234567890"
                        required
                        className="col-span-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-50 border-gray-300 dark:border-gray-600"
                      />
                    </div>
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg border border-yellow-200 dark:border-yellow-800 text-sm text-yellow-800 dark:text-yellow-300 flex items-start gap-2">
                      <span className="text-lg">💡</span>
                      <span>
                        By submitting, you agree to receive updates and
                        counseling from CollegeVidya.
                      </span>
                    </div>
                  </div>
                  <DialogFooter className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white"
                    >
                      {isSubmitting ? "Submitting..." : "Apply to University"}
                    </Button>
                  </DialogFooter>
                </form>
              </TabsContent>
            </div>
          </Tabs>
        </DialogContent>
      </Dialog>

      <Dialog open={showSuccessPopup} onOpenChange={setShowSuccessPopup}>
        <DialogContent className="sm:max-w-[425px] p-6 text-center bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-green-300 dark:border-green-700">
          <div className="flex flex-col items-center justify-center">
            <PartyPopper className="w-16 h-16 text-green-500 mb-4 animate-bounce" />{" "}
            <DialogTitle className="text-2xl font-bold text-green-700 dark:text-green-400 mb-2">
              Application Submitted!
            </DialogTitle>
            <DialogDescription className="text-gray-700 dark:text-gray-300 text-base mb-6">
              Thank you for applying to **{university.name}**! Our counselors
              will reach out to you shortly.
            </DialogDescription>
            <Button
              onClick={() => setShowSuccessPopup(false)}
              className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-md transition-colors duration-200"
            >
              Great!
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
