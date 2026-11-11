"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { FiEdit2, FiTrash2, FiPlusCircle, FiHome } from "react-icons/fi";
import PrivateRoute from "@/components/PrivateRoute";
import ConfirmModal from "@/components/ConfirmModal";
import EmptyState from "@/components/EmptyState";
import SafeImg from "@/components/SafeImg";
import { useApp } from "@/components/Providers";
import { api } from "@/lib/api";

function MyListings() {
  const { tokenReady } = useApp();
  const [items, setItems] = useState(null);
  const [target, setTarget] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!tokenReady) return;
    api("/studios/mine").then(setItems).catch((e) => { toast.error(e.message); setItems([]); });
  }, [tokenReady]);

  const remove = async () => {
    setBusy(true);
    try {
      await api(`/studios/${target._id}`, { method: "DELETE" });
      setItems((l) => l.filter((s) => s._id !== target._id));
      toast.success("Studio deleted.");
      setTarget(null);
    } catch (e) { toast.error(e.message); } finally { setBusy(false); }
  };

  return (
    <div className="container-x py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div><h1 className="section-title">My studio listings</h1><p className="section-sub">Manage the spaces you host.</p></div>
        <Link href="/add-studio" className="btn btn-primary gap-2"><FiPlusCircle className="h-4 w-4" />Add New Studio</Link>
      </div>

      <div className="mt-8">
        {items === null ? (
          <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="skeleton h-20 w-full" />)}</div>
        ) : items.length === 0 ? (
          <EmptyState icon={FiHome} title="You have not listed a studio yet" text="List your first space and start receiving booking requests." actionLabel="Add a studio" actionHref="/add-studio" />
        ) : (
          <div className="overflow-x-auto rounded-box border border-base-300">
            <table className="table">
              <thead><tr><th>Studio</th><th>Category</th><th>Rate</th><th>Rating</th><th className="text-right">Actions</th></tr></thead>
              <tbody>
                {items.map((s) => (
                  <tr key={s._id} className="hover">
                    <td>
                      <div className="flex items-center gap-3">
                        <SafeImg src={s.image} alt="" className="h-14 w-20 rounded-lg object-cover" />
                        <div className="min-w-0"><Link href={`/studios/${s._id}`} className="line-clamp-1 font-semibold hover:text-primary">{s.title}</Link><p className="line-clamp-1 text-xs text-base-content/60">{s.location}</p></div>
                      </div>
                    </td>
                    <td><span className="badge badge-secondary">{s.category}</span></td>
                    <td className="whitespace-nowrap font-semibold">${s.hourlyRate} / hr</td>
                    <td>{s.rating ? s.rating.toFixed(1) : "New"}</td>
                    <td>
                      <div className="flex justify-end gap-2">
                        <Link href={`/studios/edit/${s._id}`} className="btn btn-sm btn-outline gap-1"><FiEdit2 className="h-3.5 w-3.5" />Update</Link>
                        <button onClick={() => setTarget(s)} className="btn btn-sm btn-error btn-outline gap-1"><FiTrash2 className="h-3.5 w-3.5" />Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ConfirmModal open={!!target} onClose={() => setTarget(null)} onConfirm={remove} loading={busy} danger confirmText="Delete studio"
        title="Delete this studio?" message={`"${target?.title}" will be removed permanently, along with its place in anyone's wishlist. This cannot be undone.`} />
    </div>
  );
}

export default function Page() { return <PrivateRoute><MyListings /></PrivateRoute>; }
