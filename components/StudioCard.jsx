"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FiMapPin, FiHeart } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import SafeImg from "./SafeImg";
import { useApp } from "./Providers";

export default function StudioCard({ studio }) {
  const { user, wishlist, toggleWishlist } = useApp();
  const router = useRouter();
  const id = String(studio._id);
  const liked = wishlist.includes(id);

  const onHeart = async () => {
    if (!user) {
      toast.info("Log in to save studios to your wishlist.");
      return router.push(`/login?redirect=${encodeURIComponent("/studios")}`);
    }
    try {
      const nowLiked = await toggleWishlist(id);
      toast.success(nowLiked ? "Saved to your wishlist." : "Removed from your wishlist.");
    } catch (e) { toast.error(e.message); }
  };

  return (
    <article className="card h-full overflow-hidden border border-base-300 bg-base-100 shadow-sm transition-shadow hover:shadow-lg">
      <figure className="relative h-52 w-full shrink-0">
        <SafeImg src={studio.image} alt={studio.title} className="h-full w-full object-cover" />
        <span className="badge badge-secondary absolute left-3 top-3 border-0 font-medium">{studio.category}</span>
        <button onClick={onHeart} aria-label={liked ? "Remove from wishlist" : "Save to wishlist"} aria-pressed={liked}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-base-100/90 shadow transition hover:scale-105">
          <FiHeart className={`h-4 w-4 ${liked ? "fill-error text-error" : "text-base-content"}`} />
        </button>
      </figure>
      <div className="card-body flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="line-clamp-1 text-lg font-bold" title={studio.title}>{studio.title}</h3>
          <span className="badge badge-accent shrink-0 gap-1 font-semibold">
            <FaStar className="h-3 w-3" /> {studio.rating ? studio.rating.toFixed(1) : "New"}
          </span>
        </div>
        <p className="flex items-center gap-1.5 text-sm text-base-content/65"><FiMapPin className="h-4 w-4 shrink-0" /><span className="line-clamp-1">{studio.location}</span></p>
        <p className="text-xl font-bold text-primary">${studio.hourlyRate} <span className="text-sm font-medium text-base-content/60">/ hr</span></p>
        <div className="mt-auto pt-3">
          <Link href={`/studios/${id}`} className="btn btn-primary btn-block">View Details</Link>
        </div>
      </div>
    </article>
  );
}
