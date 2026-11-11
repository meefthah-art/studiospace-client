"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { FiHome, FiCalendar, FiInbox, FiPlusCircle } from "react-icons/fi";
import PrivateRoute from "@/components/PrivateRoute";
import StatusBadge from "@/components/StatusBadge";
import EmptyState from "@/components/EmptyState";
import { useApp } from "@/components/Providers";
import { api } from "@/lib/api";

function Dashboard() {
  const { user, tokenReady } = useApp();
  const [studios, setStudios] = useState(null);
  const [mine, setMine] = useState(null);
  const [requests, setRequests] = useState(null);
  const [busyId, setBusyId] = useState("");

  useEffect(() => {
    if (!tokenReady) return;
    Promise.all([api("/studios/mine"), api("/bookings/my"), api("/bookings/host")])
      .then(([s, m, r]) => { setStudios(s); setMine(m); setRequests(r); })
      .catch((e) => { toast.error(e.message); setStudios([]); setMine([]); setRequests([]); });
  }, [tokenReady]);

  const setStatus = async (b, status) => {
    setBusyId(b._id);
    try {
      await api(`/bookings/${b._id}/status`, { method: "PATCH", body: { status } });
      setRequests((l) => l.map((x) => (x._id === b._id ? { ...x, status } : x)));
      toast.success(status === "Confirmed" ? "Booking confirmed." : status === "Completed" ? "Booking marked completed." : "Booking declined.");
    } catch (e) { toast.error(e.message); } finally { setBusyId(""); }
  };

  const loading = requests === null;
  const pending = requests?.filter((r) => r.status === "Pending").length ?? 0;
  const stats = [
    { icon: FiHome, label: "Studios listed", value: studios?.length, href: "/my-listings" },
    { icon: FiCalendar, label: "Bookings made", value: mine?.length, href: "/my-bookings" },
    { icon: FiInbox, label: "Requests waiting", value: loading ? undefined : pending, href: "#requests" },
  ];

  return (
    <div className="container-x py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div><h1 className="section-title">Welcome back, {user.name.split(" ")[0]}</h1><p className="section-sub">Your hosting and booking activity at a glance.</p></div>
        <Link href="/add-studio" className="btn btn-primary gap-2"><FiPlusCircle className="h-4 w-4" />Add New Studio</Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="flex items-center gap-4 rounded-box border border-base-300 bg-base-100 p-5 transition hover:border-primary">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary"><s.icon className="h-6 w-6" /></span>
            <div>{s.value === undefined ? <div className="skeleton h-7 w-10" /> : <p className="text-3xl font-bold">{s.value}</p>}<p className="text-sm text-base-content/65">{s.label}</p></div>
          </Link>
        ))}
      </div>

      <h2 id="requests" className="mt-12 text-2xl font-bold">Booking requests for your studios</h2>
      <div className="mt-5">
        {loading ? <div className="skeleton h-40 w-full" />
          : requests.length === 0 ? <EmptyState icon={FiInbox} title="No requests yet" text="When someone books one of your studios, you can confirm it here." actionLabel="View my listings" actionHref="/my-listings" />
          : (
            <div className="overflow-x-auto rounded-box border border-base-300">
              <table className="table">
                <thead><tr><th>Studio</th><th>Guest</th><th>When</th><th>Total</th><th>Status</th><th className="text-right">Action</th></tr></thead>
                <tbody>
                  {requests.map((b) => (
                    <tr key={b._id}>
                      <td className="font-semibold">{b.studioTitle}</td>
                      <td><p>{b.userName || "Guest"}</p><p className="text-xs text-base-content/60">{b.userEmail}</p></td>
                      <td className="whitespace-nowrap text-sm">{b.date}<br />{b.startTime} to {b.endTime}</td>
                      <td className="font-semibold">${b.totalPrice}</td>
                      <td><StatusBadge status={b.status} /></td>
                      <td>
                        <div className="flex justify-end gap-2">
                          {b.status === "Pending" && (<>
                            <button className="btn btn-sm btn-success" disabled={busyId === b._id} onClick={() => setStatus(b, "Confirmed")}>Confirm</button>
                            <button className="btn btn-sm btn-error btn-outline" disabled={busyId === b._id} onClick={() => setStatus(b, "Cancelled")}>Decline</button>
                          </>)}
                          {b.status === "Confirmed" && <button className="btn btn-sm btn-info" disabled={busyId === b._id} onClick={() => setStatus(b, "Completed")}>Mark completed</button>}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
      </div>
    </div>
  );
}

export default function Page() { return <PrivateRoute><Dashboard /></PrivateRoute>; }
