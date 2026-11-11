"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import PrivateRoute from "@/components/PrivateRoute";
import StudioForm from "@/components/StudioForm";
import PageSpinner from "@/components/PageSpinner";
import { useApp } from "@/components/Providers";
import { api } from "@/lib/api";

function EditStudio() {
  const { id } = useParams();
  const { user } = useApp();
  const router = useRouter();
  const [studio, setStudio] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api(`/studios/${id}`)
      .then((s) => {
        if (s.ownerEmail !== user.email) { toast.error("You can only edit your own studios."); return router.replace("/my-listings"); }
        setStudio(s);
      })
      .catch((e) => { toast.error(e.message); router.replace("/my-listings"); });
  }, [id]);

  const submit = async (body) => {
    setBusy(true);
    try {
      await api(`/studios/${id}`, { method: "PUT", body });
      toast.success("Studio updated.");
      router.push("/my-listings");
    } catch (e) { toast.error(e.message); } finally { setBusy(false); }
  };

  if (!studio) return <PageSpinner label="Loading listing" />;
  return (
    <div className="container-x max-w-4xl py-10">
      <h1 className="section-title">Update studio</h1>
      <p className="section-sub mb-8">Change any detail below. Host information cannot be edited.</p>
      <StudioForm initial={studio} user={user} onSubmit={submit} submitLabel="Save changes" busy={busy} />
    </div>
  );
}

export default function Page() { return <PrivateRoute><EditStudio /></PrivateRoute>; }
