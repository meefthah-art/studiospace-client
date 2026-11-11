import Link from "next/link";

export default function EmptyState({ icon: Icon, title, text, actionLabel, actionHref, onAction }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center rounded-box border border-dashed border-base-300 bg-base-200/50 px-6 py-14 text-center">
      {Icon && <span className="mb-4 grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary"><Icon className="h-7 w-7" /></span>}
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-base-content/70">{text}</p>
      {actionLabel && (actionHref
        ? <Link href={actionHref} className="btn btn-primary mt-6">{actionLabel}</Link>
        : <button onClick={onAction} className="btn btn-primary mt-6">{actionLabel}</button>)}
    </div>
  );
}
