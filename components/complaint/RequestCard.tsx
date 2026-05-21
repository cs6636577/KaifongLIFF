import { ElementType } from "react";
import {
  CheckCircle2,
  CircleStop,
  MapPin,
  Star,
  
} from "lucide-react";
import { FaBuildingCircleArrowRight } from "react-icons/fa6";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { MdElectricBolt } from "react-icons/md";

import { IoIosCheckmark } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";

import type { ServiceRequest } from "@/lib/requests.types";

import {
  STATUS_ACCENT,
  STATUS_ICON_TILE,
  STATUS_LABEL,
  STATUS_PILL,
} from "../../lib/status";

import { ProgressSteps } from "./ProgressSteps";

import { useRouter } from "next/navigation";

const ICONS: Record<string, ElementType> = {
  build: FaBuildingCircleArrowRight,
  bolt: MdElectricBolt,
  shield: IoShieldCheckmarkSharp ,
  stop: CircleStop,
} as const;


interface RequestCardProps {
  request: ServiceRequest;
  onRate?: (id: string) => void;
}

export function RequestCard({
  request,
  onRate,
}: RequestCardProps) {
  const Icon = ICONS[request.icon];
  const accent = STATUS_ACCENT[request.status];
  const router = useRouter();

  return (
    <article  onClick={() => router.push(`/track-complaint/details?id=${request.id}`)}
    className="bg-card relative overflow-hidden rounded-2xl border border-border shadow-sm transition-shadow hover:shadow-md">
      {/* left accent bar */}
      <div
        className={`absolute top-0 left-0 h-full w-1.5 ${accent}`}
      />

     
       <div className="space-y-4 p-4 pl-5 sm:p-5 sm:pl-6">
        {/* top row: icon tile + status pill */}
        <div className="flex items-start justify-between gap-3">
          {/*
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-xl ${
              STATUS_ICON_TILE[request.status]
            }`}
          >
             {/*<Icon className="h-6 w-6" />
             
          </div>
          */}
          

         <StatusPill status={request.status} />
        </div>
        

        {/* title */}
        <h3 className="text-base font-bold leading-snug sm:text-lg">
          {request.title}
        </h3>

        {/* progress */}
        <ProgressSteps
          steps={request.steps}
          progress={request.progress}
          fillClassName={accent}
          completedClassName="bg-status-done"
        />

        {/* detail strip */}
        <DetailStrip
          request={request}
          onRate={onRate}
        />

        {/* footer: location + date */}
        <div className="text-muted-foreground flex items-center justify-between gap-3 pt-1 text-xs sm:text-sm">
          <div className="flex min-w-0 items-center gap-1.5">
            <MapPin className="h-4 w-4 shrink-0" />

            <span className="truncate">
              {request.location}
            </span>
          </div>

          <span className="shrink-0">
            {request.date}
          </span>
        </div>
      </div>
    </article>
  );
}

function StatusPill({
  status,
}: {
  status: ServiceRequest["status"];
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
        STATUS_PILL[status]
      }`}
    >
      {STATUS_LABEL[status] === "เสร็จสิ้น" ? (
      <IoIosCheckmark className="text-sm" />
      ) : STATUS_LABEL[status] === "พักงาน" ? (
        <FaArrowRight className="text-[10px]" />
      ) : (
        <span className="h-1.5 w-1.5 rounded-full bg-current" />
      )}

      {STATUS_LABEL[status]}
    </span>
  );
}

export function DetailStrip({
  request,
  onRate,
}: {
  request: ServiceRequest;
  onRate?: (id: string) => void;
}) {
  const tone = STATUS_ICON_TILE[request.status];

  return (
    <div
      className={`flex flex-wrap items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-sm ${
        request.status === "paused"
          ? "bg-muted/60"
          : tone
      }`}
    >
      <div className="flex min-w-0 items-start gap-2">
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />

        <div className="min-w-0">
          <span className="font-medium leading-snug">
            {request.detail}
          </span>

          {request.status !== "in_progress" && request.detailMeta && (
            <span className="text-gray-400 mt-0.5 text-xs">
              {request.detailMeta}
            </span>
          )}

          {request.status === "in_progress" && (
            <p className="text-gray-400 mt-0.5 text-xs">
             {request.detailMeta}
            </p>
          )}
        </div>
      </div>

     {request.status === "resolved" &&
  request.rating == null && (
    <button
      type="button"
       onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onRate?.(request.id);
      }}
      className="bg-brand text-brand-foreground inline-flex items-center rounded-lg px-3 py-1.5 text-xs font-semibold shadow-sm hover:brightness-95"
    >
      ให้คะแนน
    </button>
)}
{/*star*/}
{typeof request.rating === "number" && (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < (request.rating ?? 0)
            ? "fill-status-pending text-status-pending"
            : "text-muted-foreground"
        }`}
      />
    ))}
  </div>
)}
    </div>
  );
}