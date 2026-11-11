import { FiShield, FiUserCheck, FiTool, FiHeadphones } from "react-icons/fi";
import SectionHeading from "./SectionHeading";

const ITEMS = [
  { icon: FiShield, title: "Liability protection", text: "Every confirmed booking is covered by our host liability terms, so accidents do not become disputes." },
  { icon: FiUserCheck, title: "Verified profiles", text: "Hosts and guests sign in with a verified account, and every listing is tied to a real owner." },
  { icon: FiTool, title: "Equipment safety", text: "Hosts list the gear on offer and a refundable security deposit protects it between sessions." },
  { icon: FiHeadphones, title: "24/7 host support", text: "Questions at midnight before a shoot? Our support team answers around the clock." },
];

export default function HostGuarantee() {
  return (
    <section className="section-y bg-secondary text-secondary-content">
      <div className="container-x">
        <div className="max-w-2xl">
          <h2 className="section-title text-white">Host guarantee and creator support</h2>
          <p className="mt-3 leading-relaxed text-white/70">Book and host with confidence. These protections apply to every listing.</p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((it) => (
            <div key={it.title} className="flex h-full flex-col rounded-box border border-white/10 bg-white/5 p-6">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent text-accent-content"><it.icon className="h-6 w-6" /></span>
              <h3 className="mt-5 text-lg font-bold text-white">{it.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{it.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
