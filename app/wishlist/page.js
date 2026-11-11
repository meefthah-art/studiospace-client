"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FiHeart } from "react-icons/fi";
import PrivateRoute from "@/components/PrivateRoute";
import StudioCard from "@/components/StudioCard";
import StudioCardSkeleton from "@/components/StudioCardSkeleton";
import EmptyState from "@/components/EmptyState";
import { useApp } from "@/components/Providers";
import { api } from "@/lib/api";

function Wishlist() {
  const { tokenReady, wishlist } = useApp();
  const [items, setItems] = useState(null);

  useEffect(() => {
    if (!tokenReady) return;
    api("/wishlist").then(setItems).catch((e) => { toast.error(e.message); setItems([]); });
  }, [tokenReady]);

  const visible = items?.filter((s) => wishlist.includes(String(s._id)));
  return (
    <div className="container-x py-10">
      <h1 className="section-title">Saved studios</h1>
      <p className="section-sub">Spaces you have hearted, all in one place.</p>
      <div className="mt-8">
        {items === null ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 3 }).map((_, i) => <StudioCardSkeleton key={i} />)}</div>
        ) : visible.length === 0 ? (
          <EmptyState icon={FiHeart} title="Nothing saved yet" text="Tap the heart on any studio card to keep it here for later." actionLabel="Explore Studios" actionHref="/studios" />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{visible.map((s) => <StudioCard key={s._id} studio={s} />)}</div>
        )}
      </div>
    </div>
  );
}

export default function Page() { return <PrivateRoute><Wishlist /></PrivateRoute>; }
