"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

const membershipTypes = [
  { id: "individual-monthly", label: "Individual Monthly", price: "Rs. 5,000/mo" },
  { id: "individual-annual", label: "Individual Annual", price: "Rs. 50,000/yr" },
  { id: "family-monthly", label: "Family Monthly", price: "Rs. 8,000/mo" },
  { id: "family-annual", label: "Family Annual", price: "Rs. 80,000/yr" },
  { id: "student", label: "Student", price: "Rs. 3,000/mo" },
];

const facilityOptions = [
  { id: "gym", label: "Gym" },
  { id: "swimming-pool", label: "Swimming Pool" },
  { id: "tennis-court", label: "Tennis Court" },
  { id: "badminton-court", label: "Badminton Court" },
  { id: "fitness-studio", label: "Fitness Studio" },
  { id: "full-access", label: "Full Access" },
];

export default function MemberApplication() {
  const router = useRouter();
  const [selectedMembership, setSelectedMembership] = useState("");
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const toggleFacility = (id: string) => {
    if (id === "full-access") {
      const allIds = facilityOptions.map((f) => f.id);
      setSelectedFacilities((prev) =>
        prev.includes("full-access") ? [] : allIds
      );
      return;
    }
    setSelectedFacilities((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id && f !== "full-access") : [...prev, id]
    );
  };

  const handleSubmit = () => {
    toast.success("Application submitted successfully!", {
      description: "You will be notified once your application is reviewed.",
    });
    router.push("/member/status");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-28">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-12 pb-4">
        <Link
          href="/member/home"
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-[#0B1F3A]" />
        </Link>
        <h1 className="text-lg font-bold text-[#0B1F3A]">
          Membership Application
        </h1>
      </div>

      <div className="px-4 space-y-6">
        {/* Personal Information */}
        <section>
          <h2 className="text-sm font-semibold text-[#0B1F3A] mb-3">
            Personal Information
          </h2>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 space-y-3">
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">
                  Full Name
                </label>
                <Input value="Ali Khan" readOnly className="bg-gray-50" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">
                  Phone
                </label>
                <Input
                  value="+92 300 1234567"
                  readOnly
                  className="bg-gray-50"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">
                  Email
                </label>
                <Input
                  value="ali.khan@email.com"
                  readOnly
                  className="bg-gray-50"
                />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Membership Type */}
        <section>
          <h2 className="text-sm font-semibold text-[#0B1F3A] mb-3">
            Membership Type
          </h2>
          <div className="grid grid-cols-1 gap-2">
            {membershipTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedMembership(type.id)}
                className={`w-full text-left rounded-xl border-2 p-3.5 transition-all ${
                  selectedMembership === type.id
                    ? "border-[#F5B942] bg-[#F5B942]/10"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedMembership === type.id
                          ? "border-[#F5B942]"
                          : "border-gray-300"
                      }`}
                    >
                      {selectedMembership === type.id && (
                        <div className="w-2.5 h-2.5 rounded-full bg-[#F5B942]" />
                      )}
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        selectedMembership === type.id
                          ? "text-[#0B1F3A]"
                          : "text-gray-700"
                      }`}
                    >
                      {type.label}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-[#0E5F4F]">
                    {type.price}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Facility Access */}
        <section>
          <h2 className="text-sm font-semibold text-[#0B1F3A] mb-3">
            Facility Access
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {facilityOptions.map((facility) => {
              const isChecked = selectedFacilities.includes(facility.id);
              return (
                <button
                  key={facility.id}
                  onClick={() => toggleFacility(facility.id)}
                  className={`flex items-center gap-2.5 rounded-xl border-2 p-3 transition-all ${
                    isChecked
                      ? "border-[#0E5F4F] bg-[#0E5F4F]/5"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div
                    className={`w-4.5 h-4.5 rounded flex items-center justify-center border-2 shrink-0 ${
                      isChecked
                        ? "bg-[#0E5F4F] border-[#0E5F4F]"
                        : "border-gray-300"
                    }`}
                  >
                    {isChecked && (
                      <svg
                        width="10"
                        height="8"
                        viewBox="0 0 10 8"
                        fill="none"
                      >
                        <path
                          d="M1 4L3.5 6.5L9 1"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                  <span
                    className={`text-xs font-medium ${
                      isChecked ? "text-[#0B1F3A]" : "text-gray-600"
                    }`}
                  >
                    {facility.label}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Emergency Contact */}
        <section>
          <h2 className="text-sm font-semibold text-[#0B1F3A] mb-3">
            Emergency Contact
          </h2>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 space-y-3">
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">
                  Contact Name
                </label>
                <Input
                  placeholder="Emergency contact name"
                  value={emergencyName}
                  onChange={(e) => setEmergencyName(e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">
                  Contact Phone
                </label>
                <Input
                  placeholder="+92 300 0000000"
                  value={emergencyPhone}
                  onChange={(e) => setEmergencyPhone(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Terms */}
        <button
          onClick={() => setAgreeTerms(!agreeTerms)}
          className="flex items-center gap-3 px-1"
        >
          <div
            className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 ${
              agreeTerms
                ? "bg-[#0E5F4F] border-[#0E5F4F]"
                : "border-gray-300"
            }`}
          >
            {agreeTerms && (
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path
                  d="M1 4L3.5 6.5L9 1"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
          <span className="text-sm text-gray-700">
            I agree to the terms and conditions
          </span>
        </button>

        {/* Action Buttons */}
        <div className="space-y-3 pb-4">
          <Button
            className="w-full h-12 bg-[#0B1F3A] hover:bg-[#0B1F3A]/90 text-white text-sm font-semibold rounded-xl"
            onClick={handleSubmit}
          >
            Submit Application
          </Button>
          <Button
            variant="outline"
            className="w-full h-12 border-[#0B1F3A] text-[#0B1F3A] text-sm font-semibold rounded-xl"
          >
            Save as Draft
          </Button>
        </div>
      </div>
    </div>
  );
}
