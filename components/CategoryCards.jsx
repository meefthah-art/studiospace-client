import Link from "next/link";
import { CATEGORIES } from "@/lib/constants";
import SectionHeading from "./SectionHeading";

export default function CategoryCards() {
  return (
    <section className="section-y bg-base-200">
      <div className="container-x">
        <SectionHeading title="Browse by studio type" subtitle="Pick the kind of space you need and we will show you what is open." />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {CATEGORIES.map((c) => (
            <Link key={c.value} href={`/studios?category=${encodeURIComponent(c.value)}`}
              className="group flex h-full flex-col rounded-box border border-base-300 bg-base-100 p-6 transition hover:-translate-y-1 hover:border-primary hover:shadow-lg">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-content">
                <c.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-lg font-bold">{c.label}</h3>
              <p className="mt-1 text-sm leading-relaxed text-base-content/65">{c.blurb}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
