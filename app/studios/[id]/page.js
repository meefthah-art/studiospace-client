"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FiMapPin, FiUsers, FiCheck, FiShield, FiSearch } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { api } from "@/lib/api";
import { useApp } from "@/components/Providers";
import SafeImg from "@/components/SafeImg";
import PageSpinner from "@/components/PageSpinner";
import EmptyState from "@/components/EmptyState";
import BookingModal from "@/components/BookingModal";

export default function StudioDetails() {
  const { id } = useParams();
  const router = useRouter();
  const { user, tokenReady } = useApp();
  const [studio, setStudio] = useState(null);
  const [missing, setMissing] = useState(false);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [posting, setPosting] = useState(false);

  const load = () => api(`/studios/${id}`).then(setStudio).catch(() => setMissing(true));
  useEffect(() => { load(); }, [id]);

  if (missing) return <div className="container-x py-20"><EmptyState icon={FiSearch} title="Studio not found" text="This listing may have been removed by its host." actionLabel="Browse studios" actionHref="/studios" /></div>;
  if (!studio) return <PageSpinner label="Loading studio" />;

  const isOwner = user && user.email === studio.ownerEmail;
  const onBook = () => {
    if (!user) { toast.info("Log in to book this studio."); return router.push(`/login?redirect=${encodeURIComponent(`/studios/${id}`)}`); }
    if (isOwner) return toast.error("You cannot book your own studio.");
    setOpen(true);
  };

  const postReview = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return toast.error("Write a short comment before posting.");
    setPosting(true);
    try {
      await api(`/studios/${id}/reviews`, { method: "POST", body: { rating, comment } });
      toast.success("Thanks, your review is live.");
      setComment(""); setRating(5); load();
    } catch (err) { toast.error(err.message); } finally { setPosting(false); }
  };

  const gallery = studio.gallery?.length ? studio.gallery : [studio.image];

  return (
    <div className="container-x py-10">
      <div className="mb-6 text-sm text-base-content/60"><Link href="/studios" className="hover:text-primary">Studios</Link> / <span>{studio.title}</span></div>
      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="min-w-0">
          <Swiper modules={[Navigation, Pagination]} navigation pagination={{ clickable: true }} className="h-72 overflow-hidden rounded-box sm:h-[430px]">
            {gallery.map((g, i) => <SwiperSlide key={i}><SafeImg src={g} alt={`${studio.title} photo ${i + 1}`} className="h-full w-full object-cover" /></SwiperSlide>)}
          </Swiper>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="badge badge-secondary">{studio.category}</span>
            <span className="badge badge-accent gap-1"><FaStar className="h-3 w-3" />{studio.rating ? `${studio.rating.toFixed(1)} (${studio.reviewCount})` : "New"}</span>
          </div>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">{studio.title}</h1>
          <p className="mt-2 flex items-center gap-2 text-base-content/70"><FiMapPin className="h-4 w-4" />{studio.location}</p>

          <h2 className="mt-8 text-xl font-bold">Overview</h2>
          <p className="mt-2 whitespace-pre-line leading-relaxed text-base-content/75">{studio.overview}</p>

          <h2 className="mt-8 text-xl font-bold">Amenities</h2>
          {studio.amenities?.length ? (
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {studio.amenities.map((a) => <li key={a} className="flex items-center gap-2 text-sm"><FiCheck className="h-4 w-4 text-success" />{a}</li>)}
            </ul>
          ) : <p className="mt-2 text-sm text-base-content/60">The host has not listed amenities yet.</p>}

          <h2 className="mt-8 text-xl font-bold">Hosted by</h2>
          <div className="mt-3 flex items-center gap-4 rounded-box border border-base-300 p-4">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-primary text-lg font-bold text-primary-content">{(studio.ownerName || studio.ownerEmail)[0].toUpperCase()}</span>
            <div className="min-w-0">
              <p className="font-semibold">{studio.ownerName || "Studio host"}</p>
              <p className="truncate text-sm text-base-content/65">{studio.ownerEmail}</p>
            </div>
            <span className="badge badge-success ml-auto gap-1"><FiShield className="h-3 w-3" />Verified</span>
          </div>

          <h2 className="mt-10 text-xl font-bold">Reviews ({studio.reviews?.length || 0})</h2>
          <div className="mt-4 space-y-4">
            {studio.reviews?.length ? studio.reviews.map((r, i) => (
              <div key={i} className="rounded-box border border-base-300 p-4">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{r.name || "Guest"}</p>
                  <span className="flex items-center gap-1 text-sm text-accent"><FaStar />{r.rating}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-base-content/75">{r.comment}</p>
              </div>
            )) : <p className="text-sm text-base-content/60">No reviews yet. Book this studio and be the first to review it.</p>}
          </div>
          {user && !isOwner && tokenReady && !studio.reviews?.some((r) => r.email === user.email) && (
            <form onSubmit={postReview} className="mt-6 rounded-box border border-base-300 bg-base-200/50 p-4">
              <p className="mb-2 font-semibold">Leave a review</p>
              <div className="rating mb-3">
                {[1, 2, 3, 4, 5].map((n) => <input key={n} type="radio" name="rating" className="mask mask-star-2 bg-accent" aria-label={`${n} star`} checked={rating === n} onChange={() => setRating(n)} />)}
              </div>
              <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={3} className="textarea textarea-bordered w-full bg-base-100" placeholder="How was the space, the gear and the host?" />
              <button className="btn btn-primary mt-3" disabled={posting}>{posting && <span className="loading loading-spinner loading-sm" />}Post review</button>
            </form>
          )}
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-box border border-base-300 bg-base-100 p-6 shadow-sm">
            <p className="text-3xl font-bold text-primary">${studio.hourlyRate}<span className="text-base font-medium text-base-content/60"> / hr</span></p>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between"><dt className="text-base-content/65">Security deposit</dt><dd className="font-semibold">${studio.securityDeposit || 0}</dd></div>
              <div className="flex justify-between"><dt className="flex items-center gap-1 text-base-content/65"><FiUsers className="h-4 w-4" />Max capacity</dt><dd className="font-semibold">{studio.maxCapacity} people</dd></div>
            </dl>
            <button onClick={onBook} className="btn btn-primary btn-block mt-6">Book Workspace Now</button>
            {isOwner && <p className="mt-3 text-center text-xs text-base-content/60">This is your listing. <Link href={`/studios/edit/${id}`} className="link link-primary">Edit it</Link></p>}
          </div>
        </aside>
      </div>
      <BookingModal open={open} onClose={() => setOpen(false)} studio={studio} />
    </div>
  );
}
