import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { FiTarget, FiUsers, FiDollarSign } from "react-icons/fi";

export const metadata = { title: "About Us" };

const VALUES = [
  { icon: FiTarget, title: "Access first", text: "Great creative space should not require a studio lease. We make it bookable by the hour." },
  { icon: FiUsers, title: "Made for makers", text: "Photographers, filmmakers, podcasters and musicians shaped every feature on the platform." },
  { icon: FiDollarSign, title: "Honest pricing", text: "Hourly rate and security deposit are shown up front. No surprise fees at checkout." },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-base-200 py-14">
        <div className="container-x">
          <h1 className="section-title">About StudioSpace</h1>
          <p className="section-sub">StudioSpace is a peer-to-peer marketplace where studio owners share their rooms and creators book them in minutes.</p>
        </div>
      </section>
      <section className="section-y">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading title="Why we built it" />
            <div className="mt-5 space-y-4 leading-relaxed text-base-content/75">
              <p>Studios sit empty for most of the week, while creators search for a decent room for a single afternoon. We built StudioSpace to connect the two.</p>
              <p>Hosts keep control of their calendar and approve every booking. Creators see availability, pricing and amenities before they commit.</p>
            </div>
            <Link href="/studios" className="btn btn-primary mt-8">Explore Studios</Link>
          </div>
          <img src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80" alt="A recording studio with a mixing desk" className="h-80 w-full rounded-box object-cover" />
        </div>
      </section>
      <section className="section-y bg-base-200">
        <div className="container-x">
          <SectionHeading title="What we stand for" />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {VALUES.map((v) => (
              <div key={v.title} className="h-full rounded-box border border-base-300 bg-base-100 p-6">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary"><v.icon className="h-6 w-6" /></span>
                <h3 className="mt-5 text-lg font-bold">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-base-content/70">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
