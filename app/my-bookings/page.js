"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { FiCalendar, FiClock, FiMapPin, FiDownload } from "react-icons/fi";
import PrivateRoute from "@/components/PrivateRoute";
import ConfirmModal from "@/components/ConfirmModal";
import EmptyState from "@/components/EmptyState";
import StatusBadge from "@/components/StatusBadge";
import SafeImg from "@/components/SafeImg";
import { useApp } from "@/components/Providers";
import { api } from "@/lib/api";
import { downloadInvoice } from "@/lib/invoice";

function MyBookings() {
  const { tokenReady } = useApp();
  const [items, setItems] = useState(null);
  const [target, setTarget] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!tokenReady) return;
    api("/bookings/my").then(setItems).catch((e) => { toast.error(e.message); setItems([]); });
  }, [tokenReady]);

  const cancel = async () => {
    setBusy(true);
    try {
      await api(`/bookings/${target._id}/cancel`, { method: "PATCH" });
      setItems((l) => l.map((b) => (b._id === target._id ? { ...b, status: "Cancelled" } : b)));
      toast.success("Booking cancelled.");
      setTarget(null);
    } catch (e) { toast.error(e.message); } finally { setBusy(false); }
  };

  const invoice = async (b) => {
    try { await downloadInvoice(b); toast.success("Receipt downloaded."); } catch { toast.error("Could not create the receipt. Try again."); }
  };

  return (
    <div className="container-x py-10">
      <h1 className="section-title">My bookings</h1>
      <p className="section-sub">Track every reservation you have made.</p>
      <div className="mt-8">
        {items === null ? (
          <div className="space-y-4">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="skeleton h-36 w-full" />)}</div>
        ) : items.length === 0 ? (
          <EmptyState icon={FiCalendar} title="No bookings yet" text="When you book a studio, it will show up here with its status." actionLabel="Explore Studios" actionHref="/studios" />
        ) : (
          <div className="grid gap-4">
            {items.map((b) => (
              <article key={b._id} className="flex flex-col gap-4 rounded-box border border-base-300 bg-base-100 p-4 sm:flex-row">
                <SafeImg src={b.studioImage} alt="" className="h-40 w-full rounded-lg object-cover sm:h-32 sm:w-48 sm:shrink-0" />
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <Link href={`/studios/${b.studioId}`} className="text-lg font-bold hover:text-primary">{b.studioTitle}</Link>
                    <StatusBadge status={b.status} />
                  </div>
                  <p className="flex items-center gap-2 text-sm text-base-content/70"><FiMapPin className="h-4 w-4" />{b.location}</p>
                  <p className="flex items-center gap-2 text-sm text-base-content/70"><FiCalendar className="h-4 w-4" />{b.date}<FiClock className="ml-2 h-4 w-4" />{b.startTime} to {b.endTime}</p>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-2">
                    <p className="font-bold text-primary">${b.totalPrice} <span className="text-xs font-normal text-base-content/60">+ ${b.securityDeposit} deposit</span></p>
                    <div className="flex gap-2">
                      {(b.status === "Confirmed" || b.status === "Completed") && <button onClick={() => invoice(b)} className="btn btn-sm btn-outline gap-1"><FiDownload className="h-3.5 w-3.5" />Invoice PDF</button>}
                      {b.status === "Pending" && <button onClick={() => setTarget(b)} className="btn btn-sm btn-error btn-outline">Cancel Booking</button>}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
      <ConfirmModal open={!!target} onClose={() => setTarget(null)} onConfirm={cancel} loading={busy} danger confirmText="Cancel booking"
        title="Cancel this booking?" message={`Your request for ${target?.studioTitle} on ${target?.date} will be cancelled. You can book again later if the slot is free.`} />
    </div>
  );
}

export default function Page() { return <PrivateRoute><MyBookings /></PrivateRoute>; }
