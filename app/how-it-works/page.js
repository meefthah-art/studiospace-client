import Link from "next/link";
import HowBookingWorks from "@/components/HowBookingWorks";
import SectionHeading from "@/components/SectionHeading";

export const metadata = { title: "How It Works" };

const HOST_STEPS = [
  ["Create your listing", "Add photos, your hourly rate, a security deposit, capacity and the amenities you offer."],
  ["Review requests", "New bookings arrive as Pending. Confirm the ones that fit your calendar from your dashboard."],
  ["Host the session", "Welcome your guest, and mark the booking Completed when the session ends."],
];
const FAQ = [
  ["Can two people book the same time?", "No. Once a booking is Confirmed, any request that overlaps that time is rejected with a clear message."],
  ["Can I cancel a booking?", "Yes. You can cancel any booking that is still Pending from the My Bookings page."],
  ["What is the security deposit?", "A refundable amount set by the host to protect equipment. It is shown before you book."],
];

export default function HowItWorksPage() {
  return (
    <>
      <section className="bg-base-200 py-14">
        <div className="container-x">
          <h1 className="section-title">How StudioSpace works</h1>
          <p className="section-sub">Whether you are booking a room or sharing yours, the flow is short and transparent.</p>
        </div>
      </section>
      <HowBookingWorks />
      <section className="section-y bg-base-200">
        <div className="container-x">
          <SectionHeading title="Hosting in three steps" subtitle="Turn idle studio hours into income." />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {HOST_STEPS.map(([t, d], i) => (
              <div key={t} className="h-full rounded-box border border-base-300 bg-base-100 p-6">
                <span className="font-heading text-3xl font-bold text-primary">{i + 1}</span>
                <h3 className="mt-3 text-lg font-bold">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-base-content/70">{d}</p>
              </div>
            ))}
          </div>
          <div className="mt-8"><Link href="/add-studio" className="btn btn-primary">Host Your Space</Link></div>
        </div>
      </section>
      <section className="section-y">
        <div className="container-x max-w-3xl">
          <SectionHeading title="Common questions" />
          <div className="mt-8 space-y-3">
            {FAQ.map(([q, a]) => (
              <div key={q} className="collapse collapse-arrow border border-base-300 bg-base-100">
                <input type="checkbox" aria-label={q} />
                <div className="collapse-title font-semibold">{q}</div>
                <div className="collapse-content text-sm leading-relaxed text-base-content/70"><p>{a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
