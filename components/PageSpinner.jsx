import { FiAperture } from "react-icons/fi";

export default function PageSpinner({ label = "Loading StudioSpace" }) {
  return (
    <div className="grid min-h-[60vh] place-items-center" role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-4">
        <FiAperture className="h-12 w-12 animate-spin text-primary" style={{ animationDuration: "1.6s" }} />
        <p className="text-sm text-base-content/60">{label}...</p>
      </div>
    </div>
  );
}
