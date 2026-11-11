import { FiSearch, FiClock, FiCheckCircle, FiVideo } from "react-icons/fi";
import SectionHeading from "./SectionHeading";

const STEPS = [
  { icon: FiSearch, title: "Discover Spaces", text: "Filter by studio type, price and location to find a room that fits your project." },
  { icon: FiClock, title: "Select Shoot Hours", text: "Choose a date and start and end time. The total updates as you pick." },
  { icon: FiCheckCircle, title: "Book Instantly", text: "Send your request. The host confirms it, and you can track it under My Bookings." },
  { icon: FiVideo, title: "Create & Produce", text: "Show up, set up and shoot, record or teach. Leave a review when you wrap." },
];

export default function HowBookingWorks() {
  return (
    <section className="section-y">
      <div className="container-x">
        <SectionHeading title="How booking works" subtitle="From search to studio door in four steps." />
        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.title} className="relative flex h-full flex-col rounded-box border border-base-300 bg-base-100 p-6">
              <div className="flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-secondary text-secondary-content"><s.icon className="h-6 w-6" /></span>
                <span className="font-heading text-4xl font-bold text-base-300">{i + 1}</span>
              </div>
              <h3 className="mt-5 text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-base-content/70">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
