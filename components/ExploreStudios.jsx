"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FiSearch, FiInbox } from "react-icons/fi";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { CATEGORIES } from "@/lib/constants";
import StudioCard from "./StudioCard";
import StudioCardSkeleton from "./StudioCardSkeleton";
import EmptyState from "./EmptyState";

export default function ExploreStudios() {
  const sp = useSearchParams();
  const [category, setCategory] = useState(sp.get("category") || "all");
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("newest");
  const [maxPrice, setMaxPrice] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { setCategory(sp.get("category") || "all"); setPage(1); }, [sp]);
  useEffect(() => { const t = setTimeout(() => { setQuery(search.trim()); setPage(1); }, 400); return () => clearTimeout(t); }, [search]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    const p = new URLSearchParams({ sort, page, limit: 9 });
    if (category !== "all") p.set("category", category);
    if (query) p.set("search", query);
    if (maxPrice) p.set("maxPrice", maxPrice);
    api(`/studios?${p}`)
      .then((d) => !cancelled && setData(d))
      .catch((e) => { if (!cancelled) { toast.error(e.message); setData({ items: [], total: 0, pages: 0 }); } })
      .finally(() => !cancelled && setLoading(false));
    return () => { cancelled = true; };
  }, [category, query, sort, maxPrice, page]);

  const clear = () => { setCategory("all"); setSearch(""); setQuery(""); setMaxPrice(""); setSort("newest"); setPage(1); };
  const pills = [{ value: "all", label: "All studios" }, ...CATEGORIES];

  return (
    <>
      <section className="bg-base-200 py-12">
        <div className="container-x">
          <h1 className="section-title">Explore studios</h1>
          <p className="section-sub">Search by name or area, then narrow by type and price.</p>
          <div className="mt-6 grid gap-3 md:grid-cols-[1fr_auto_auto]">
            <label className="input input-bordered flex items-center gap-2 bg-base-100">
              <FiSearch className="h-4 w-4 opacity-60" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} className="grow" placeholder="Search studio name or location" aria-label="Search studios" />
            </label>
            <input type="number" min="0" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="input input-bordered bg-base-100 md:w-44" placeholder="Max $ / hr" aria-label="Maximum hourly rate" />
            <select value={sort} onChange={(e) => { setSort(e.target.value); setPage(1); }} className="select select-bordered bg-base-100" aria-label="Sort studios">
              <option value="newest">Newest first</option>
              <option value="rating">Top rated</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {pills.map((c) => (
              <button key={c.value} onClick={() => { setCategory(c.value); setPage(1); }}
                className={`btn btn-sm ${category === c.value ? "btn-primary" : "btn-outline"}`} aria-pressed={category === c.value}>{c.label}</button>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-x">
          {!loading && data && <p className="mb-6 text-sm text-base-content/65">{data.total} {data.total === 1 ? "studio" : "studios"} found</p>}
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 6 }).map((_, i) => <StudioCardSkeleton key={i} />)}</div>
          ) : data?.items?.length ? (
            <>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{data.items.map((s) => <StudioCard key={s._id} studio={s} />)}</div>
              {data.pages > 1 && (
                <div className="mt-10 flex justify-center">
                  <div className="join">
                    <button className="btn join-item" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Previous</button>
                    <span className="btn join-item no-animation pointer-events-none">Page {page} of {data.pages}</span>
                    <button className="btn join-item" disabled={page >= data.pages} onClick={() => setPage((p) => p + 1)}>Next</button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <EmptyState icon={FiInbox} title="No studios match your search" text="Try a different keyword, raise the price limit or switch the studio type." actionLabel="Clear filters" onAction={clear} />
          )}
        </div>
      </section>
    </>
  );
}
