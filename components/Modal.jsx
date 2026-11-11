"use client";
import { useEffect } from "react";
import { FiX } from "react-icons/fi";

export default function Modal({ open, onClose, title, children, wide = false }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={title}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative max-h-[90vh] w-full overflow-y-auto rounded-box border border-base-300 bg-base-100 p-6 shadow-2xl ${wide ? "max-w-lg" : "max-w-md"}`}>
        <div className="mb-4 flex items-start justify-between gap-4">
          <h3 className="text-xl font-bold">{title}</h3>
          <button onClick={onClose} className="btn btn-ghost btn-circle btn-sm" aria-label="Close"><FiX className="h-5 w-5" /></button>
        </div>
        {children}
      </div>
    </div>
  );
}
