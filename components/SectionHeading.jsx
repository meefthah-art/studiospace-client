export default function SectionHeading({ title, subtitle, center = false }) {
  return (
    <div className={center ? "mx-auto text-center" : ""}>
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className={`section-sub ${center ? "mx-auto" : ""}`}>{subtitle}</p>}
    </div>
  );
}
