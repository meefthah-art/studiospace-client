"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Modal from "./Modal";
import { api } from "@/lib/api";

const todayStr = () => new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);

export default function BookingModal({ open, onClose, studio }) {
  const router = useRouter();
  const [date, setDate] = useState(todayStr());
  const [start, setStart] = useState("10:00");
  const [end, setEnd] = useState("12:00");
  const [notes, setNotes] = useState("");
  const [taken, setTaken] = useState([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open || !date) return;
    api(`/bookings/availability/${studio._id}?date=${date}`).then(setTaken).catch(() => setTaken([]));
  }, [open, date, studio._id]);

  const hours = useMemo(() => {
    const [sh, sm] = start.split(":").map(Number); const [eh, em] = end.split(":").map(Number);
    const h = (eh * 60 + em - (sh * 60 + sm)) / 60;
    return h > 0 ? h : 0;
  }, [start, end]);
  const total = hours * studio.hourlyRate;

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (hours <= 0) return setError("End time must be after the start time.");
    setBusy(true);
    try {
      await api("/bookings", { method: "POST", body: { studioId: String(studio._id), date, startTime: start, endTime: end, notes } });
      toast.success("Booking request sent. The host will confirm it soon.");
      onClose();
      router.push("/my-bookings");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally { setBusy(false); }
  };

  return (
    <Modal open={open} onClose={onClose} title={`Book ${studio.title}`} wide>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="b-date">Date</label>
          <input id="b-date" type="date" min={todayStr()} value={date} onChange={(e) => setDate(e.target.value)} className="input-field" required />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="b-start">Start time</label>
            <input id="b-start" type="time" value={start} onChange={(e) => setStart(e.target.value)} className="input-field" required />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="b-end">End time</label>
            <input id="b-end" type="time" value={end} onChange={(e) => setEnd(e.target.value)} className="input-field" required />
          </div>
        </div>
        {taken.length > 0 && (
          <div className="rounded-lg border border-warning/40 bg-warning/10 p-3 text-sm">
            <p className="font-medium">Already booked on this date</p>
            <p className="mt-1 text-base-content/70">{taken.map((t) => `${t.startTime} to ${t.endTime}`).join(", ")}</p>
          </div>
        )}
        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="b-notes">Notes for the host (optional)</label>
          <textarea id="b-notes" rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} className="textarea textarea-bordered w-full bg-base-100" placeholder="Crew size, equipment you are bringing, etc." />
        </div>
        <div className="rounded-lg bg-base-200 p-4 text-sm">
          <div className="flex justify-between"><span>${studio.hourlyRate} x {hours.toFixed(1)} hr</span><span className="font-semibold">${total.toFixed(2)}</span></div>
          <div className="mt-1 flex justify-between text-base-content/65"><span>Refundable security deposit</span><span>${studio.securityDeposit || 0}</span></div>
        </div>
        {error && <p role="alert" className="rounded-lg bg-error/10 p-3 text-sm text-error">{error}</p>}
        <button className="btn btn-primary btn-block" disabled={busy}>{busy && <span className="loading loading-spinner loading-sm" />}Send booking request</button>
      </form>
    </Modal>
  );
}
