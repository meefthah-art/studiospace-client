"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import PrivateRoute from "@/components/PrivateRoute";
import StudioForm from "@/components/StudioForm";
import { useApp } from "@/components/Providers";
import { api } from "@/lib/api";

function AddStudio() {
  const { user } = useApp();
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const submit = async (body) => {
    setBusy(true);
    try {
      await api("/studios", { method: "POST", body });
      toast.success("Your studio is listed.");
      router.push("/my-listings");
    } catch (e) { toast.error(e.message); } finally { setBusy(false); }
  };
  return (
    <div className="container-x max-w-4xl py-10">
      <h1 className="section-title">Add a new studio</h1>
      <p className="section-sub mb-8">Tell creators about your space. You can edit any detail later.</p>
      <StudioForm user={user} onSubmit={submit} submitLabel="Publish studio" busy={busy} />
    </div>
  );
}

export default function Page() { return <PrivateRoute><AddStudio /></PrivateRoute>; }
