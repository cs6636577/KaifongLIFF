import { ElementType } from "react";
import {
  CheckCircle2,
  CircleStop,
  MapPin,
  
} from "lucide-react";

import { IoIosCheckmark } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";

import {
  STATUS_ACCENT,
  STATUS_ICON_TILE,
  STATUS_LABEL,
  STATUS_PILL,
} from "./status";


import type { ServiceRequest } from "@/lib/requests.types";

type StatusCardProps = {
  request: ServiceRequest;
};
function StatusCard({request}:StatusCardProps){

    return (
       <div className=" rounded-xl  bg-white p-3 shadow-sm">

           <div className="flex gap-2 m-3 ">
              <div className="w-1.5 h-6 rounded-md bg-[#725C00] mt-3"></div>
              <div className="">
                <p className="text-lg font-bold text-[#1A1A2E]">สถานะ</p>
                <p className="text-sm text-[#4D4632]">Status</p>
              </div>
           </div>

           <div className="m-3 mt-6">
               <StatusPill status={request.status} />
           </div>

           <div className="m-3 mt-6">
               <DetailStrip  request={request}/>
           </div>


       </div>

    )
}
export default StatusCard;

function StatusPill({
  status,
}: {
  status: ServiceRequest["status"];
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-4.5 py-2 text-xs font-medium ${
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

 function DetailStrip({
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
          <p className="font-medium leading-snug">
            {request.detail}
          </p>

          {request.detailMeta && (
            <p className="text-muted-foreground mt-0.5 text-xs">
              {request.detailMeta}
            </p>
          )}
        </div>
      </div>

    

    </div>
  )
}
