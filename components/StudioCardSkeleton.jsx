export default function StudioCardSkeleton() {
  return (
    <div className="card h-full border border-base-300 bg-base-100">
      <div className="skeleton h-52 w-full rounded-b-none" />
      <div className="card-body gap-3 p-5">
        <div className="skeleton h-5 w-3/4" />
        <div className="skeleton h-4 w-1/2" />
        <div className="skeleton h-4 w-1/3" />
        <div className="skeleton mt-3 h-10 w-full" />
      </div>
    </div>
  );
}
