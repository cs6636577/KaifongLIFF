"use client";

import { useEffect, useMemo, useState } from "react";
import { Sarabun } from 'next/font/google';

import { Header } from "@/components/complaint/Header";
import {
  StatusTabs,
  type TabKey,
} from "@/components/complaint/StatusTabs";

import { SearchBar } from "@/components/complaint/SearchBar";
import { RequestCard } from "@/components/complaint/RequestCard";
import Navbar from "@/components/navbar";
import type { ServiceRequest } from "@/lib/requests.types";
import { RatingModal } from "@/components/complaint/RatingModal";

 //font sarabun
const sarabun = Sarabun({
  subsets: ['thai'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],});

interface RequestsResponse {
  requests: ServiceRequest[];

  user: {
    name: string;
  };

 counts: {
    all: number;
    in_progress: number;
    resolved: number;
    pending: number;
    paused: number
  };
}

async function fetchRequests() {
  const res = await fetch("/api/requests");

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  return res.json() as Promise<RequestsResponse>;
}

export default function HomeClient() {
  const [data, setData] =
    useState<RequestsResponse | null>(null);

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const [tab, setTab] =
    useState<TabKey>("all");

  const [search, setSearch] =
    useState("");

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);

        const result =
          await fetchRequests();

        setData(result);
      } catch (err) {
        setError(
          "ไม่สามารถโหลดข้อมูลได้ กรุณาลองใหม่"
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  const filtered =
    useMemo<ServiceRequest[]>(() => {
      if (!data) return [];

      return data.requests.filter((r) => {
        if (
          tab === "in_progress" &&
          r.status !== "in_progress" 
        ) {
          return false;
        }

        if (
          tab === "resolved" &&
          r.status !== "resolved"
        ) {
          return false;
        }

        if (
          tab === "pending" &&
          r.status !== "pending"
        ) {
          return false;
        }

        if (
          tab === "paused" &&
          r.status !== "paused"
        ) {
          return false;
        }
        
        if (
          search &&
          !r.title
            .toLowerCase()
            .includes(search.toLowerCase())
        ) {
          return false;
        }

        return true;
      });
    }, [data, tab, search]);

  const thisWeek = filtered.filter(
    (r) => r.group === "this_week"
  );

  const earlier = filtered.filter(
    (r) => r.group === "earlier"
  );

 
  return (
    <div className={`${sarabun.className} min-h-screen pb-12`}>
    <Navbar/>
    <div className="relative">
      <Header
        userName={data?.user.name ?? "ผู้ใช้งาน"}
      />

      <main className="relative z-10 mx-auto -mt-16 max-w-3xl space-y-6 px-5 sm:px-8 ">
        <div className="relative z-20">
        <StatusTabs
          active={tab}
          onChange={setTab}
          counts={{
          all: 0,
          in_progress: 0,
          resolved: 0,
          paused: 0,
          pending: 0,
          ...data?.counts,
          }}
        />
        </div>
        
        <div className="-mt-4">
        <SearchBar
          value={search}
          onChange={setSearch}
        />
        </div>

        {isLoading && (
          <p className="text-muted-foreground text-sm">
            กำลังโหลด...
          </p>
        )}

        {error && (
          <p className="text-destructive text-sm">
            {error}
          </p>
        )}

        {thisWeek.length > 0 && (
          <RequestSection
            title="สัปดาห์นี้"
            requests={thisWeek}
          />
        )}

        {earlier.length > 0 && (
          <RequestSection
            title="ก่อนหน้านี้"
            requests={earlier}
          />
        )}

        {!isLoading &&
          filtered.length === 0 && (
            <p className="text-muted-foreground py-12 text-center text-sm">
              ไม่พบรายการร้องเรียน
            </p>
          )}
      </main>
      </div>
    </div>
  );
}

function RequestSection({
  title,
  requests,
}: {
  title: string;
  requests: ServiceRequest[];
}) {
   //rating
  const [selectedId, setSelectedId] =
  useState<string | null>(null);

  const [openRating, setOpenRating] =
  useState(false);

  const handleOpenRating = (id: string) => {
  setSelectedId(id);
  setOpenRating(true);
  };

  return (
    <>
    <section className="space-y-3">
      <h2 className="text-muted-foreground text-sm font-medium">
        {title}
      </h2>
      {/*ส่งidดึงข้อมุลไปหน้า details เพื่อดูรายละเอียด*/}
      <div className="grid gap-4 sm:grid-cols-2">
        {requests.map((r) => ( 
           <a href={`/track-complaint/details?id=${r.id}`} key={r.id}>
          <RequestCard
            key={r.id}
            request={r}
            onRate={handleOpenRating}
          />
          </a>
        ))}
      </div>


      <RatingModal
        open={openRating}
        onClose={() => setOpenRating(false)}
        onSubmit={(score) => {
        console.log(selectedId, score);
        setOpenRating(false);
    }}
  />
   {/*ต้องส่ง api ลงคะแนนไปให้ backend ด้วย*/}
    </section>
    </>
    
  );
}