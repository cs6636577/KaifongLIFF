"use client";
import React from "react";
import { FiCheck, FiMapPin } from "react-icons/fi";
import { GrDocumentText } from "react-icons/gr";
import { FaRegCheckCircle } from "react-icons/fa";
import { BiSolidUser } from "react-icons/bi";

function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ");
}

const STEPS = [
    { label: "STEP 1", icon: <BiSolidUser size={18} />},
    { label: "STEP 2", icon: <GrDocumentText size={18} /> },
    // { label: "แผนที่",      icon: <FiMapPin size={18} /> },
    { label: "STEP 3",     icon: <FaRegCheckCircle size={18} /> },
];

// 0 = ผู้ใช้ -> 1 = รายละเอียด -> 2 = แผนที่ -> 3 = ยืนยัน
interface StepProgressProps {
  currentStep: 0 | 1 | 2 ; // 0-indexed
}

export default function StepProgress({ currentStep }: StepProgressProps) {
  return (
    <div className="flex items-center justify-center mt-10 font-bold">
      {STEPS.map((step, i) => {
        const done = i < currentStep;
        const active = i === currentStep;

        return (
          <React.Fragment key={i}>
            <div className="flex flex-col items-center relative">
              <div className="relative">
                {active && (
                //   <span className="absolute inline-flex rounded-full w-20 h-20 bg-nt opacity-20 animate-ping" />
                    <div className="absolute top-0 left-0 h-full w-8 animate-[shimmer_1.8s_linear_infinite] bg-gradient-to-r from-transparent via-white/70 to-transparent" />
                )}

                <span
                  className={cn(
                    "rounded-full flex items-center justify-center shadow-md transition-all duration-300",
                    done && "bg-[#5D5C74] text-white w-10 h-10 border-3 border-white/5",
                    active && "bg-nt text-[#231B00] w-14 h-14 border-4 border-white",
                    !done && !active && "bg-[#E2E3E0] text-[#7F7660] w-10 h-10 border-2 border-[#D1C6AB]"
                  )}
                >
                  {done ? <FiCheck size={18} /> : step.icon}
                </span>
              </div>

              <p className={cn(
                "text-xs mt-3",
                done && "text-[#5D5C74]",
                active && "text-[#725C00]",
                !done && !active && "text-[#5D5C74]"
              )}>
                {step.label}
              </p>
            </div>

            {i < STEPS.length - 1 && (
              <div className="flex-1 h-0.5 mx-2 bg-[#D1C6AB] rounded-full overflow-hidden">
                <div
                  className={cn(
                    "h-full bg-[#4D4632] rounded-full transition-all duration-500",
                    done ? "w-full" : "w-0"
                  )}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
