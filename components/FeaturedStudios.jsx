"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiCamera } from "react-icons/fi";
import { api } from "@/lib/api";
import StudioCard from "./StudioCard";
import StudioCardSkeleton from "./StudioCardSkeleton";
import SectionHeading from "./SectionHeading";
import EmptyState from "./EmptyState";

export default function FeaturedStudios() {
  const [studios, setStudios] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    api("/studios/featured").then(setStudios).catch((e) => { setError(e.message); setStudios([]); });
  }, []);

  return (
    <section className="section-y">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading title="Featured studios" subtitle="The top-rated spaces creators are booking right now." />
          <Link href="/studios" className="btn btn-outline btn-primary">See all studios</Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {studios === null && Array.from({ length: 6 }).map((_, i) => <StudioCardSkeleton key={i} />)}
          {studios?.map((s) => <StudioCard key={s._id} studio={s} />)}
        </div>
        {studios?.length === 0 && (
          <div className="mt-10">
            <EmptyState icon={FiCamera} title={error ? "We could not load studios" : "No studios listed yet"}
              text={error || "Be the first host on StudioSpace and list your space in a few minutes."} actionLabel="Add a studio" actionHref="/add-studio" />
          </div>
        )}
      </div>
    </section>
  );
}
