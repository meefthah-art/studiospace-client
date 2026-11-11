"use client";
import { useState } from "react";
import { toast } from "sonner";
import { FiUpload } from "react-icons/fi";
import { FORM_CATEGORIES, AMENITIES } from "@/lib/constants";
import { uploadToImgbb } from "@/lib/api";
import SafeImg from "./SafeImg";

export default function StudioForm({ initial, user, onSubmit, submitLabel, busy }) {
  const [f, setF] = useState({
    title: initial?.title || "", category: initial?.category || "", hourlyRate: initial?.hourlyRate ?? "",
    securityDeposit: initial?.securityDeposit ?? "", maxCapacity: initial?.maxCapacity ?? "", location: initial?.location || "",
    image: initial?.image || "", overview: initial?.overview || "",
    extra: (initial?.gallery || []).slice(1).join("\n"),
  });
  const [amenities, setAmenities] = useState(initial?.amenities || []);
  const [custom, setCustom] = useState("");
  const [uploading, setUploading] = useState(false);
  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));
  const toggle = (a) => setAmenities((l) => (l.includes(a) ? l.filter((x) => x !== a) : [...l, a]));
  const options = Array.from(new Set([...AMENITIES, ...amenities]));

  const addCustom = () => {
    const v = custom.trim();
    if (!v) return;
    if (!amenities.includes(v)) setAmenities((l) => [...l, v]);
    setCustom("");
  };

  const onFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try { const url = await uploadToImgbb(file); setF((p) => ({ ...p, image: url })); toast.success("Image uploaded."); }
    catch (err) { toast.error(err.message); } finally { setUploading(false); e.target.value = ""; }
  };

  const submit = (e) => {
    e.preventDefault();
    if (!f.category) return toast.error("Choose a studio category.");
    if (!f.image) return toast.error("Add an image URL or upload a photo.");
    if (Number(f.hourlyRate) <= 0) return toast.error("Hourly rate must be greater than 0.");
    if (Number(f.maxCapacity) < 1) return toast.error("Max capacity must be at least 1.");
    const extras = f.extra.split("\n").map((s) => s.trim()).filter(Boolean);
    onSubmit({
      title: f.title.trim(), category: f.category, hourlyRate: Number(f.hourlyRate), securityDeposit: Number(f.securityDeposit) || 0,
      maxCapacity: Number(f.maxCapacity), location: f.location.trim(), image: f.image.trim(), gallery: [f.image.trim(), ...extras],
      amenities, overview: f.overview.trim(), ownerName: user.name,
    });
  };

  const L = ({ id, children }) => <label htmlFor={id} className="mb-1 block text-sm font-medium">{children}</label>;

  return (
    <form onSubmit={submit} className="space-y-6 rounded-box border border-base-300 bg-base-100 p-6 sm:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="md:col-span-2"><L id="title">Studio title</L><input id="title" className="input-field" value={f.title} onChange={set("title")} required placeholder="e.g. Northlight Cyc Wall Studio" /></div>
        <div>
          <L id="category">Category</L>
          <select id="category" className="select select-bordered w-full bg-base-100" value={f.category} onChange={set("category")} required>
            <option value="" disabled>Select a category</option>
            {FORM_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div><L id="location">Location / address</L><input id="location" className="input-field" value={f.location} onChange={set("location")} required placeholder="Area, city" /></div>
        <div><L id="rate">Hourly rate ($)</L><input id="rate" type="number" min="1" step="0.5" className="input-field" value={f.hourlyRate} onChange={set("hourlyRate")} required /></div>
        <div><L id="deposit">Security deposit ($)</L><input id="deposit" type="number" min="0" className="input-field" value={f.securityDeposit} onChange={set("securityDeposit")} required /></div>
        <div><L id="cap">Max capacity (people)</L><input id="cap" type="number" min="1" className="input-field" value={f.maxCapacity} onChange={set("maxCapacity")} required /></div>
        <div>
          <L id="image">Main image URL</L>
          <div className="flex gap-2">
            <input id="image" type="url" className="input-field" value={f.image} onChange={set("image")} placeholder="https://..." />
            <label className="btn btn-outline shrink-0" title="Upload to imgbb">
              {uploading ? <span className="loading loading-spinner loading-sm" /> : <FiUpload className="h-4 w-4" />}
              <input type="file" accept="image/*" className="hidden" onChange={onFile} disabled={uploading} />
            </label>
          </div>
        </div>
        {f.image && <div className="md:col-span-2"><SafeImg src={f.image} alt="Preview" className="h-44 w-full rounded-lg object-cover sm:w-72" /></div>}
        <div className="md:col-span-2"><L id="extra">More gallery image URLs (one per line, optional)</L><textarea id="extra" rows={2} className="textarea textarea-bordered w-full bg-base-100" value={f.extra} onChange={set("extra")} /></div>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium">Amenities</p>
        <div className="flex flex-wrap gap-2">
          {options.map((a) => (
            <label key={a} className={`btn btn-sm ${amenities.includes(a) ? "btn-primary" : "btn-outline"}`}>
              <input type="checkbox" className="hidden" checked={amenities.includes(a)} onChange={() => toggle(a)} />{a}
            </label>
          ))}
        </div>
        <div className="mt-3 flex max-w-sm gap-2">
          <input className="input input-bordered input-sm w-full bg-base-100" value={custom} onChange={(e) => setCustom(e.target.value)} placeholder="Add your own amenity"
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addCustom(); } }} />
          <button type="button" className="btn btn-sm btn-outline" onClick={addCustom}>Add</button>
        </div>
      </div>

      <div><L id="overview">Detailed overview</L><textarea id="overview" rows={5} className="textarea textarea-bordered w-full bg-base-100" value={f.overview} onChange={set("overview")} required placeholder="Describe the space, size, light, sound and what makes it special." /></div>

      <div className="grid gap-5 md:grid-cols-2">
        <div><L id="hn">Host name</L><input id="hn" className="input-field cursor-not-allowed opacity-70" value={user.name} readOnly /></div>
        <div><L id="he">Host email</L><input id="he" className="input-field cursor-not-allowed opacity-70" value={user.email} readOnly /></div>
      </div>

      <button className="btn btn-primary btn-lg" disabled={busy || uploading}>{busy && <span className="loading loading-spinner loading-sm" />}{submitLabel}</button>
    </form>
  );
}
