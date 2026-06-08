"use client";

import { useState } from "react";
import { Star, X } from "lucide-react";

interface RatingModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (score: number) => void;
}

export function RatingModal({
  open,
  onClose,
  onSubmit,
}: RatingModalProps) {
  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(0);

  const [comment, setComment] = useState("");
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
  <div className="bg-card w-full max-w-sm rounded-3xl p-6 shadow-2xl">
    
    {/* top */}
    <div className="mb-4 flex flex-col items-center text-center w-full">
      <h2 className="text-lg font-bold">ประเมินความพึงพอใจ</h2>

      <div className="my-4">
        {/*ใส่ไปก่อนรอเก็บข้อมุลจริง*/}
        <img
          src={"/evidence/Evidence_success.jpg"}
          className="rounded-xl w-40 h-40 object-cover"
          alt="คำอธิบายรูปภาพ"
        />
      </div>

      <p className="text-muted-foreground text-sm">
        กรุณาเลือกดาวตามความพอใจของท่าน
      </p>
    </div>

    {/* stars */}
    <div className="mb-4 flex items-center justify-center gap-2">
      {Array.from({ length: 5 }).map((_, i) => {
        const value = i + 1;
        const active = hovered >= value || selected >= value;
        return (
          <button
            key={value}
            type="button"
            onMouseEnter={() => setHovered(value)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => setSelected(value)}
            className="transition-transform hover:scale-110"
          >
            <Star
              className={`h-9 w-9 transition-colors ${
                active
                  ? "fill-status-pending text-status-pending"
                  : "text-muted-foreground"
              }`}
            />
          </button>
        );
      })}
    </div>

    {/* ข้อเสนอแนะ */}
    <div className="mb-4">
      <p className="mb-2 text-sm font-medium">ข้อเสนอแนะ</p>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value.slice(0, 200))}
        maxLength={200}
        placeholder="เขียนความคิดเห็นเพิ่มเติม..."
        className="border border-gray-300 bg-background min-h-20 w-full rounded-xl p-3 text-sm outline-none focus:ring-2"
      />
      <div className="text-muted-foreground text-right text-xs">
        {comment.length}/200
      </div>
    </div>

    {/* actions */}
    <div className="flex gap-2">
      <button
        type="button"
        onClick={onClose}
        className="border-border hover:bg-muted flex-1 rounded-xl border px-4 py-2 text-sm font-medium transition-colors"
      >
        ยกเลิก
      </button>

      <button
        type="button"
        disabled={!selected}
        onClick={() => {
          onSubmit(selected);
          onClose();
        }}
        className="bg-brand text-brand-foreground disabled:bg-muted disabled:text-muted-foreground flex-1 rounded-xl px-4 py-2 text-sm font-semibold transition-opacity hover:opacity-90 disabled:cursor-not-allowed"
      >
        ส่งคะแนน
      </button>
    </div>

  </div>
</div>
  );
}